import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { RSS_SOURCES } from '@/types/signal';

interface CategoryTabsProps {
    activeCategory: string;
    onSelectCategory: (category: string) => void;
}

export function CategoryTabs({ activeCategory, onSelectCategory }: CategoryTabsProps) {
    const theme = useThemeContext();

    const categories = useMemo(() => {
        const uniqueCategories = Array.from(new Set(RSS_SOURCES.map(source => source.category)));
        return ['All', ...uniqueCategories];
    }, []);

    const styles = useMemo(() => StyleSheet.create({
        container: {
            paddingVertical: theme.spacing.sm,
            marginBottom: theme.spacing.sm,
        },
        contentContainer: {
            paddingHorizontal: theme.spacing.marginMobile,
            gap: theme.spacing.sm,
        },
        tab: {
            paddingHorizontal: theme.spacing.md,
            paddingVertical: theme.spacing.xs,
            borderRadius: theme.roundness.full,
            backgroundColor: theme.colors.surfaceContainerLow,
        },
        activeTab: {
            backgroundColor: theme.colors.primary,
        },
        tabText: {
            color: theme.colors.onSurfaceVariant,
            fontSize: theme.typography.labelCaps.fontSize ?? 12,
            fontWeight: '600',
            letterSpacing: 0.96,
        },
        activeTabText: {
            color: theme.colors.onPrimary,
        },
    }), [theme]);

    return (
        <View style={styles.container}>
            <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.contentContainer}
            >
                {categories.map(category => {
                    const isActive = activeCategory === category;
                    return (
                        <TouchableOpacity
                            key={category}
                            style={[styles.tab, isActive && styles.activeTab]}
                            onPress={() => onSelectCategory(category)}
                            activeOpacity={0.7}
                        >
                            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                                {category}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}
