import { useMemo, useCallback, useState } from 'react';
import { ActivityIndicator, RefreshControl, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import { SignalCard } from '@/components/features/signal/SignalCard';
import { CategoryTabs } from '@/components/features/signal/CategoryTabs';
import { ErrorBanner } from '@/components/features/signal/ErrorBanner';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useSignals } from '@/hooks/useSignals';
import { RSS_SOURCES } from '@/types/signal';

export default function SignalScreen() {
    const { feeds, loading, refreshing, error, sourceErrors, isFromCache, refresh, clearError, markAsRead } = useSignals();
    const theme = useThemeContext();
    
    const [activeCategory, setActiveCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const onRefresh = useCallback(() => {
        refresh();
    }, [refresh]);

    const filteredFeeds = useMemo(() => {
        return feeds.filter(feed => {
            const matchesCategory = activeCategory === 'All' || feed.category === activeCategory;
            const query = searchQuery.toLowerCase();
            const matchesSearch = !query || 
                feed.title.toLowerCase().includes(query) || 
                feed.description.toLowerCase().includes(query);
            
            return matchesCategory && matchesSearch;
        });
    }, [feeds, activeCategory, searchQuery]);

    const styles = useMemo(() => StyleSheet.create({
        container: {
            position: 'relative',
            flex: 1,
            backgroundColor: theme.colors.background,
        },
        contentContainer: {
            paddingTop: 20,
            paddingBottom: 120,
        },
        searchContainer: {
            paddingHorizontal: theme.spacing.marginMobile,
            marginBottom: theme.spacing.md,
        },
        searchInput: {
            backgroundColor: theme.colors.surfaceContainerLow,
            color: theme.colors.onSurface,
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.sm,
            borderRadius: theme.roundness.md,
            fontSize: theme.typography.bodyMd.fontSize ?? 16,
        },
        centerMessage: {
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            padding: theme.spacing.md,
            fontSize: theme.typography.bodyMd.fontSize ?? 16,
        },
        errorText: {
            color: theme.colors.error,
        },
        cacheBanner: {
            color: theme.colors.onSurfaceVariant,
            textAlign: 'center',
            paddingVertical: theme.spacing.xs,
            fontSize: theme.typography.labelCaps.fontSize ?? 12,
            fontStyle: 'italic',
        },
        feedList: {
            paddingHorizontal: theme.spacing.marginMobile,
        }
    }), [theme]);

    const showLoading = loading && feeds.length === 0;
    
    const activeErrors = Object.entries(sourceErrors).filter(([_, err]) => err !== null);
    const allSourcesFailed = activeErrors.length > 0 && activeErrors.length === RSS_SOURCES.length;
    const showError = (error && feeds.length === 0) || allSourcesFailed;

    return (
        <View style={styles.container}>
            <FlatList
                data={filteredFeeds}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={5}
                initialNumToRender={10}
                ListHeaderComponent={
                    <>
                        <CategoryTabs 
                            activeCategory={activeCategory} 
                            onSelectCategory={setActiveCategory} 
                        />

                        <View style={styles.searchContainer}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search feeds..."
                                placeholderTextColor={theme.colors.onSurfaceVariant}
                                value={searchQuery}
                                onChangeText={setSearchQuery}
                            />
                        </View>

                        {isFromCache && feeds.length > 0 && (
                            <Text style={styles.cacheBanner}>Showing cached data...</Text>
                        )}

                        {showLoading && (
                            <ActivityIndicator size="large" color={theme.colors.primary} />
                        )}

                        {showError ? (
                            <Text style={[styles.centerMessage, styles.errorText]}>
                                {allSourcesFailed ? "All feed sources failed to load." : error}
                            </Text>
                        ) : (
                            <>
                                {activeErrors.map(([sourceId, err]) => (
                                    <ErrorBanner 
                                        key={sourceId} 
                                        sourceId={sourceId} 
                                        error={err as string} 
                                        onDismiss={clearError} 
                                    />
                                ))}
                            </>
                        )}
                    </>
                }
                ListEmptyComponent={
                    !loading && !showError && filteredFeeds.length === 0 ? (
                        <Text style={styles.centerMessage}>
                            {feeds.length === 0 ? "No feeds available" : "No results found"}
                        </Text>
                    ) : null
                }
                renderItem={({ item }) => (
                    <View style={styles.feedList}>
                        <SignalCard signal={item} onMarkRead={() => markAsRead(item.id)} />
                    </View>
                )}
            />
        </View>
    );
}
