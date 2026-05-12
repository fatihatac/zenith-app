import { Database, Link2, Trash2 } from 'lucide-react-native';
import { useMemo, useRef, useEffect } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAppearanceStore } from '@/store/appearanceStore';

interface ApiNodeCardProps {
    provider: string;
    status: 'CONNECTED' | 'STANDBY';
    lastSync: string;
    latency: string;
}

export default function ApiNodeCard({ provider, status, lastSync, latency }: ApiNodeCardProps) {
    const theme = useThemeContext();
    const { visualEffects } = useAppearanceStore();
    const pulseAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (visualEffects === 'full' && status === 'CONNECTED') {
            const pulse = Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, { toValue: 0.6, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                    Animated.timing(pulseAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
                ])
            );
            pulse.start();
            return () => pulse.stop();
        }
    }, [visualEffects, status]);

    const styles = useMemo(() => StyleSheet.create({
        nodeCard: {
            backgroundColor: theme.colors.surfaceContainerLow,
            borderRadius: theme.roundness.xl,
            padding: theme.spacing.sm,
            borderWidth: 1,
            borderColor: theme.colors.innerStroke,
            marginBottom: theme.spacing.xs + 4
        },
        nodeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: theme.spacing.xs + 4 },
        nodeIdentity: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.xs + 2 },
        nodeProvider: { ...theme.typography.titleSm, color: theme.colors.primary },
        statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
        statusActive: { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
        statusStandby: { backgroundColor: 'rgba(142, 145, 146, 0.1)' },
        statusLabel: { ...theme.typography.labelCaps, fontSize: 9, color: theme.colors.emerald },
        nodeStats: { flexDirection: 'row', gap: theme.spacing.sm, marginBottom: theme.spacing.sm },
        statText: { ...theme.typography.labelCaps, fontSize: 9, color: theme.colors.outline },
        nodeActions: { flexDirection: 'row', gap: theme.spacing.xs + 4, borderTopWidth: 1, borderTopColor: theme.colors.innerStroke, paddingTop: theme.spacing.xs + 4 },
        actionButton: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.unit + 2 },
        actionText: { ...theme.typography.labelCaps, fontSize: 10, color: theme.colors.onSurfaceVariant }
    }), [theme]);
    return (
        <View style={styles.nodeCard}>
            <View style={styles.nodeHeader}>
                <View style={styles.nodeIdentity}>
                    <Database size={18} color={theme.colors.primary} />
                    <Text style={styles.nodeProvider}>{provider}</Text>
                </View>
                <Animated.View style={[styles.statusBadge, status === 'CONNECTED' ? styles.statusActive : styles.statusStandby, { opacity: pulseAnim }]}>
                    <Text style={styles.statusLabel}>{status}</Text>
                </Animated.View>
            </View>

            <View style={styles.nodeStats}>
                <Text style={styles.statText}>SYNC: {lastSync}</Text>
                <Text style={styles.statText}>LATENCY: {latency}</Text>
            </View>

            <View style={styles.nodeActions}>
                <Pressable style={styles.actionButton}>
                    <Link2 size={16} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.actionText}>EDIT KEYS</Text>
                </Pressable>
                <Pressable style={styles.actionButton}>
                    <Trash2 size={16} color={theme.colors.error} />
                    <Text style={[styles.actionText, { color: theme.colors.error }]}>DISCONNECT</Text>
                </Pressable>
            </View>
        </View>
    );
}

