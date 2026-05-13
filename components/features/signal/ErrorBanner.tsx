import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { RSS_SOURCES } from '@/types/signal';

interface ErrorBannerProps {
    sourceId: string;
    error: string;
    onDismiss: (sourceId: string) => void;
}

export function ErrorBanner({ sourceId, error, onDismiss }: ErrorBannerProps) {
    const theme = useThemeContext();

    const sourceName = useMemo(() => {
        const source = RSS_SOURCES.find(s => s.id === sourceId);
        return source ? source.name : sourceId;
    }, [sourceId]);

    const styles = useMemo(() => StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: theme.colors.surfaceContainerLow,
            borderLeftWidth: 3,
            borderLeftColor: theme.colors.error,
            padding: theme.spacing.md,
            marginHorizontal: theme.spacing.marginMobile,
            marginBottom: theme.spacing.sm,
            borderRadius: theme.roundness.md,
        },
        content: {
            flex: 1,
        },
        title: {
            color: theme.colors.error,
            fontSize: theme.typography.labelCaps.fontSize ?? 12,
            fontWeight: '600',
            marginBottom: 2,
            textTransform: 'uppercase',
        },
        message: {
            color: theme.colors.error,
            fontSize: theme.typography.bodyMd.fontSize ?? 16,
        },
        dismissButton: {
            padding: theme.spacing.xs,
            marginLeft: theme.spacing.sm,
        },
        dismissText: {
            color: theme.colors.error,
            fontSize: 16,
            fontWeight: 'bold',
        },
    }), [theme]);

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{sourceName} Failed</Text>
                <Text style={styles.message} numberOfLines={2}>{error}</Text>
            </View>
            <TouchableOpacity 
                style={styles.dismissButton} 
                onPress={() => onDismiss(sourceId)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
                <Text style={styles.dismissText}>✕</Text>
            </TouchableOpacity>
        </View>
    );
}
