import { SubHeader } from '@/components/features/navigation/SubHeader';
import { Database, Link2, Plus, Server, Trash2 } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../constants/theme';

export default function ApiSettingsScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <SubHeader title="Data Sources & API" />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Active Connections */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>ACTIVE DATA NODES</Text>

                    <ApiNodeCard
                        provider="Binance Global"
                        status="CONNECTED"
                        lastSync="2s ago"
                        latency="45ms"
                    />

                    <ApiNodeCard
                        provider="CoinGecko Pro"
                        status="STANDBY"
                        lastSync="12m ago"
                        latency="--"
                    />
                </View>

                {/* Add New Source */}
                <Pressable style={styles.addButton}>
                    <Plus size={20} color={theme.colors.primary} />
                    <Text style={styles.addButtonText}>CONNECT NEW DATA SOURCE</Text>
                </Pressable>

                {/* Infrastructure Info */}
                <View style={styles.infoBox}>
                    <Server size={18} color={theme.colors.onSurfaceVariant} />
                    <Text style={styles.infoText}>
                        All API keys are encrypted locally with AES-256. Zenith never stores your private credentials on its own servers.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const ApiNodeCard = ({ provider, status, lastSync, latency }: any) => (
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { padding: theme.spacing.md, paddingTop: 20 },
    headerTitle: { ...theme.typography.displayLg, fontSize: 28, color: theme.colors.primary, marginBottom: theme.spacing.lg },
    section: { marginBottom: theme.spacing.lg },
    sectionLabel: { ...theme.typography.labelCaps, color: theme.colors.outline, marginBottom: 16 },
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
    actionText: { ...theme.typography.labelCaps, fontSize: 10, color: theme.colors.onSurfaceVariant },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        paddingVertical: 16,
        borderRadius: theme.roundness.xl,
        borderWidth: 1,
        borderColor: theme.colors.primary,
        borderStyle: 'dashed'
    },
    addButtonText: { ...theme.typography.labelCaps, color: theme.colors.primary },
    infoBox: { flexDirection: 'row', gap: 12, marginTop: 40, paddingHorizontal: 8 },
    infoText: { ...theme.typography.bodyMd, fontSize: 12, color: theme.colors.onSurfaceVariant, flex: 1, lineHeight: 18 }
});