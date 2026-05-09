import { CloudCheck, Key, RefreshCcw, ShieldCheck, User } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SubHeader } from '../../components/features/navigation/SubHeader';
import { theme } from '../../constants/theme';


export default function AccountScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <SubHeader title='Account & Sync' />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                {/* Identity Card */}
                <View style={styles.card}>
                    <View style={styles.identityRow}>
                        <View style={styles.avatarPlaceholder}>
                            <User size={32} color={theme.colors.onSurfaceVariant} />
                        </View>
                        <View style={styles.identityText}>
                            <Text style={styles.userName}>Fatih Atac</Text>
                            <Text style={styles.userTier}>ZENITH PRO MEMBER</Text>
                        </View>
                    </View>
                </View>

                {/* Sync Status Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>SYNCHRONIZATION ENGINE</Text>
                    <View style={styles.card}>
                        <SyncRow
                            icon={CloudCheck}
                            label="Cloud Vault Status"
                            value="ENCRYPTED & SYNCED"
                            statusColor={theme.colors.emerald}
                        />
                        <View style={styles.divider} />
                        <SyncRow
                            icon={RefreshCcw}
                            label="Last Auto-Backup"
                            value="32 MINUTES AGO"
                        />
                    </View>
                </View>

                {/* Security & Nodes */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>SECURITY PROTOCOLS</Text>
                    <View style={styles.card}>
                        <SyncRow icon={Key} label="Master Access Key" value="SECURED" />
                        <View style={styles.divider} />
                        <SyncRow icon={ShieldCheck} label="Two-Factor Auth" value="ACTIVE" />
                    </View>
                </View>

                {/* Action Area */}
                <Pressable style={styles.syncButton}>
                    <RefreshCcw size={18} color={theme.colors.background} />
                    <Text style={styles.syncButtonText}>FORCE RE-SYNC ALL NODES</Text>
                </Pressable>
            </ScrollView>
        </View>
    );
}

// Alt Bileşen: Senkronizasyon Satırı
const SyncRow = ({ icon: Icon, label, value, statusColor = theme.colors.primary }: any) => (
    <View style={styles.row}>
        <View style={styles.rowLead}>
            <Icon size={20} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.rowLabel}>{label}</Text>
        </View>
        <Text style={[styles.rowValue, { color: statusColor }]}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    content: {
        padding: theme.spacing.md,
        paddingTop: 20
    },
    headerTitle: {
        ...theme.typography.displayLg,
        fontSize: 28,
        color: theme.colors.primary,
        marginBottom: theme.spacing.lg
    },
    card: {
        backgroundColor: theme.colors.surfaceContainerLow,
        borderRadius: theme.roundness.xl,
        borderWidth: 1,
        borderColor: theme.colors.innerStroke,
        overflow: 'hidden',
        marginBottom: theme.spacing.md
    },
    identityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        gap: 16
    },
    avatarPlaceholder: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: theme.colors.surfaceContainerHigh,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.innerStroke
    },
    identityText: { flex: 1 },
    userName: {
        ...theme.typography.titleSm,
        fontSize: 20,
        color: theme.colors.primary
    },
    userTier: {
        ...theme.typography.labelCaps,
        color: theme.colors.emerald,
        marginTop: 4
    },
    section: {
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.sm
    },
    sectionLabel: {
        ...theme.typography.labelCaps,
        color: theme.colors.outline,
        marginBottom: 12,
        paddingLeft: 4
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16
    },
    rowLead: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12
    },
    rowLabel: {
        ...theme.typography.titleSm,
        fontSize: 15,
        color: theme.colors.primary
    },
    rowValue: {
        ...theme.typography.labelCaps,
        fontSize: 10
    },
    divider: {
        height: 1,
        backgroundColor: theme.colors.innerStroke,
        marginHorizontal: 16
    },
    syncButton: {
        flexDirection: 'row',
        backgroundColor: theme.colors.primary,
        paddingVertical: 18,
        borderRadius: theme.roundness.xl,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10,
        marginTop: theme.spacing.lg
    },
    syncButtonText: {
        ...theme.typography.labelCaps,
        color: theme.colors.background,
        fontWeight: '700'
    }
});