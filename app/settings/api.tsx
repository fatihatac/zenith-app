import { useMemo } from 'react';
import { SubHeader } from '@/components/features/navigation/SubHeader';
import ApiNodeCard from '@/components/features/settings/ApiNodeCard';
import { useThemeContext } from '@/contexts/ThemeContext';
import { Plus, Server } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ApiSettingsScreen() {
    const theme = useThemeContext();
    const styles = useMemo(() => StyleSheet.create({
        container: { flex: 1, backgroundColor: theme.colors.background },
        content: { padding: theme.spacing.md, paddingTop: 20 },
        headerTitle: { ...theme.typography.displayLg, fontSize: 28, color: theme.colors.primary, marginBottom: theme.spacing.lg },
        section: { marginBottom: theme.spacing.lg },
        sectionLabel: { ...theme.typography.labelCaps, color: theme.colors.outline, marginBottom: 16 },
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
    }), [theme]);

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