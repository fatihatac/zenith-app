import { useMemo } from 'react';
import { Activity, Cpu, Thermometer, Zap } from 'lucide-react-native';
import { Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SubHeader } from '@/components/features/navigation/SubHeader';
import StatCard from '@/components/features/settings/StatCard';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function TelemetryScreen() {
    const theme = useThemeContext();
    const styles = useMemo(() => StyleSheet.create({
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
            gap: theme.spacing.xs + 4,
            marginBottom: theme.spacing.lg
        },
        sectionLabel: {
            ...theme.typography.labelCaps,
            color: theme.colors.onSurfaceVariant,
            marginBottom: 12
        },
        console: {
            backgroundColor: '#000',
            padding: theme.spacing.sm,
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
    }), [theme]);

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