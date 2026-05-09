import { SubHeader } from '@/components/features/navigation/SubHeader';
import { BellOff, Clock, Smartphone, Zap } from 'lucide-react-native';
import { ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { theme } from '../../constants/theme';

export default function AutomationsScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <SubHeader title="Focus Automations" />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                {/* Auto-Trigger Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>SENSORY TRIGGERS</Text>
                    <View style={styles.card}>
                        <AutomationRow
                            icon={Clock}
                            title="Scheduled Silence"
                            desc="Enable Focus Mode every day at 09:00 AM."
                            active={true}
                        />
                        <View style={styles.divider} />
                        <AutomationRow
                            icon={Smartphone}
                            title="App Intercept"
                            desc="Block non-essential apps during active sessions."
                            active={false}
                        />
                    </View>
                </View>

                {/* Signal Rules */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>SIGNAL OVERRIDES</Text>
                    <View style={styles.card}>
                        <AutomationRow
                            icon={Zap}
                            title="High-Volatility Alert"
                            desc="Force wake device for critical market signals."
                            active={true}
                        />
                        <View style={styles.divider} />
                        <AutomationRow
                            icon={BellOff}
                            title="Notification Muffle"
                            desc="Dim screen and silence all alerts in Deep Work."
                            active={true}
                        />
                    </View>
                </View>

                {/* Logic Card */}
                <View style={styles.logicCard}>
                    <Text style={styles.logicTitle}>Automation Logic</Text>
                    <Text style={styles.logicDesc}>
                        Zenith uses local device heuristics to determine optimal focus windows based on your market activity and engine load.
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
}

const AutomationRow = ({ icon: Icon, title, desc, active }: any) => (
    <View style={styles.row}>
        <View style={styles.rowLead}>
            <Icon size={22} color={theme.colors.onSurfaceVariant} />
            <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{title}</Text>
                <Text style={styles.rowDesc}>{desc}</Text>
            </View>
        </View>
        <Switch
            value={active}
            trackColor={{ false: theme.colors.surfaceContainerHighest, true: theme.colors.emerald }}
            thumbColor={theme.colors.primary}
        />
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { padding: theme.spacing.md, paddingTop: 20 },
    headerTitle: { ...theme.typography.displayLg, fontSize: 28, color: theme.colors.primary, marginBottom: theme.spacing.lg },
    section: { marginBottom: theme.spacing.xl },
    sectionLabel: { ...theme.typography.labelCaps, color: theme.colors.outline, marginBottom: 12, paddingLeft: 4 },
    card: {
        backgroundColor: theme.colors.surfaceContainerLow,
        borderRadius: theme.roundness.xl,
        borderWidth: 1,
        borderColor: theme.colors.innerStroke,
        overflow: 'hidden'
    },
    row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
    rowLead: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, flex: 1 },
    rowText: { flex: 1 },
    rowTitle: { ...theme.typography.titleSm, color: theme.colors.primary, marginBottom: 4 },
    rowDesc: { ...theme.typography.bodyMd, fontSize: 12, color: theme.colors.onSurfaceVariant, lineHeight: 18 },
    divider: { height: 1, backgroundColor: theme.colors.innerStroke, marginHorizontal: 20 },
    logicCard: {
        padding: 20,
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: theme.roundness.lg,
        marginTop: 20,
        borderWidth: 1,
        borderColor: theme.colors.innerStroke
    },
    logicTitle: { ...theme.typography.labelCaps, color: theme.colors.emerald, marginBottom: 8 },
    logicDesc: { ...theme.typography.bodyMd, fontSize: 11, color: theme.colors.outline, lineHeight: 16 }
});