import { Database, Link2, Trash2 } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

interface ApiNodeCardProps {
    provider: string;
    status: 'CONNECTED' | 'STANDBY';
    lastSync: string;
    latency: string;
}

export default function ApiNodeCard({ provider, status, lastSync, latency }: ApiNodeCardProps) {
    return (
        <View style={styles.nodeCard}>
            <View style={styles.nodeHeader}>
                <View style={styles.nodeIdentity}>
                    <Database size={18} color={theme.colors.primary} />
                    <Text style={styles.nodeProvider}>{provider}</Text>
                </View>
                <View style={[styles.statusBadge, status === 'CONNECTED' ? styles.statusActive : styles.statusStandby]}>
                    <Text style={styles.statusLabel}>{status}</Text>
                </View>
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

const styles = StyleSheet.create({
    nodeCard: {
        backgroundColor: theme.colors.surfaceContainerLow,
        borderRadius: theme.roundness.xl,
        padding: 16,
        borderWidth: 1,
        borderColor: theme.colors.innerStroke,
        marginBottom: 12
    },
    nodeHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    nodeIdentity: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    nodeProvider: { ...theme.typography.titleSm, color: theme.colors.primary },
    statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
    statusActive: { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
    statusStandby: { backgroundColor: 'rgba(142, 145, 146, 0.1)' },
    statusLabel: { ...theme.typography.labelCaps, fontSize: 9, color: theme.colors.emerald },
    nodeStats: { flexDirection: 'row', gap: 16, marginBottom: 16 },
    statText: { ...theme.typography.labelCaps, fontSize: 9, color: theme.colors.outline },
    nodeActions: { flexDirection: 'row', gap: 12, borderTopWidth: 1, borderTopColor: theme.colors.innerStroke, paddingTop: 12 },
    actionButton: { flexDirection: 'row', alignItems: 'center', gap: 6 },
    actionText: { ...theme.typography.labelCaps, fontSize: 10, color: theme.colors.onSurfaceVariant }
});
