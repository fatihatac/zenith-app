import { Activity, Cpu, Thermometer, Zap } from 'lucide-react-native';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SubHeader } from '../../components/features/navigation/SubHeader';
import { theme } from '../../constants/theme';

export default function TelemetryScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <SubHeader title="Engine Telemetry" />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                {/* Real-time Stats Grid */}
                <View style={styles.statsGrid}>
                    <StatCard
                        icon={Thermometer}
                        label="CORE TEMP"
                        value="42°C"
                        subValue="STABLE"
                        color={theme.colors.emerald}
                    />
                    <StatCard
                        icon={Cpu}
                        label="CPU LOAD"
                        value="12.4%"
                        subValue="4 CORES ACTIVE"
                    />
                    <StatCard
                        icon={Zap}
                        label="POWER LIMIT"
                        value="UNLIMITED"
                        subValue="TPL: OFF"
                    />
                    <StatCard
                        icon={Activity}
                        label="LATENCY"
                        value="1.2ms"
                        subValue="LOCAL NODE"
                    />
                </View>

                {/* System Log Console */}
                <Text style={styles.sectionLabel}>SYSTEM LOG OUTPUT</Text>
                <View style={styles.console}>
                    <Text style={styles.consoleText}>[2026-05-09 17:05:22] Initializing E2E Layer...</Text>
                    <Text style={styles.consoleText}>[2026-05-09 17:05:23] Secure Tunnel established: node_tx_01</Text>
                    <Text style={styles.consoleText}>[2026-05-09 17:05:25] Telemetry heartbeats: OK</Text>
                    <Text style={styles.consoleText}>[2026-05-09 17:05:28] Monitoring background tasks...</Text>
                    <Text style={styles.cursor}>_</Text>
                </View>
            </ScrollView>

        </View>
    );
}

// Alt Bileşen: İstatistik Kartı
const StatCard = ({ icon: Icon, label, value, subValue, color = theme.colors.primary }: any) => (
    <View style={styles.statCard}>
        <View style={styles.statHeader}>
            <Icon size={16} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.statLabel}>{label}</Text>
        </View>
        <Text style={[styles.statValue, { color }]}>{value}</Text>
        <Text style={styles.statSubValue}>{subValue}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background
    },
    content: {
        padding: theme.spacing.md,
        paddingTop: 20 // Header payı
    },
    headerTitle: {
        ...theme.typography.displayLg,
        fontSize: 28,
        color: theme.colors.primary,
        marginBottom: theme.spacing.lg
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginBottom: theme.spacing.lg
    },
    statCard: {
        width: '48%',
        backgroundColor: theme.colors.surfaceContainerLow,
        padding: 16,
        borderRadius: theme.roundness.md,
        borderWidth: 1,
        borderColor: theme.colors.innerStroke
    },
    statHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 8
    },
    statLabel: {
        ...theme.typography.labelCaps,
        fontSize: 10,
        color: theme.colors.onSurfaceVariant
    },
    statValue: {
        ...theme.typography.titleSm,
        fontSize: 20,
        fontWeight: '700'
    },
    statSubValue: {
        ...theme.typography.labelCaps,
        fontSize: 8,
        color: theme.colors.outline,
        marginTop: 2
    },
    sectionLabel: {
        ...theme.typography.labelCaps,
        color: theme.colors.onSurfaceVariant,
        marginBottom: 12
    },
    console: {
        backgroundColor: '#000',
        padding: 16,
        borderRadius: theme.roundness.sm,
        minHeight: 220,
        borderWidth: 1,
        borderColor: theme.colors.innerStroke
    },
    consoleText: {
        fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
        fontSize: 12,
        color: theme.colors.emerald,
        lineHeight: 18,
        marginBottom: 4
    },
    cursor: {
        color: theme.colors.emerald,
        fontWeight: '900'
    }
});