import { SubHeader } from '@/components/features/navigation/SubHeader';
import { Eye, Layout, Sparkles, Type } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../constants/theme';

export default function AppearanceScreen() {
    return (
        <View style={{ flex: 1, backgroundColor: theme.colors.background }}>
            <SubHeader title="Appearance" />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >

                {/* Tonal Depth Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>TONAL DEPTH (SURFACE)</Text>
                    <View style={styles.optionGrid}>
                        <ThemeOption label="Absolute" color="#000000" active />
                        <ThemeOption label="Zenith" color="#131313" />
                        <ThemeOption label="Elevated" color="#1B1B1B" />
                    </View>
                </View>

                {/* Typography Scale */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>TYPOGRAPHY SCALE</Text>
                    <View style={styles.card}>
                        <SettingRow icon={Type} label="Font Scale" value="100%" />
                        <View style={styles.divider} />
                        <SettingRow icon={Eye} label="Reading Focus" value="ENABLED" />
                    </View>
                </View>

                {/* Interface Density */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>INTERFACE DENSITY</Text>
                    <View style={styles.card}>
                        <SettingRow icon={Layout} label="Layout Mode" value="GENEROUS" />
                        <View style={styles.divider} />
                        <SettingRow icon={Sparkles} label="Visual Effects" value="MINIMAL" />
                    </View>
                </View>

                {/* Wildcard: Experimental Feature */}
                <View style={[styles.card, styles.experimentalCard]}>
                    <Text style={styles.experimentalTitle}>EXPERIMENTAL: CLASSIC TERMINAL</Text>
                    <Text style={styles.experimentalDesc}>
                        Forces monochrome emerald palette across all layers for a retro-technical aesthetic.
                    </Text>
                    <Pressable style={styles.experimentalButton}>
                        <Text style={styles.experimentalButtonText}>ACTIVATE MODE</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}

// Alt Bileşenler
const ThemeOption = ({ label, color, active = false }: any) => (
    <Pressable style={[styles.themeOption, active && styles.activeTheme]}>
        <View style={[styles.colorPreview, { backgroundColor: color }]} />
        <Text style={styles.optionLabel}>{label}</Text>
    </Pressable>
);

const SettingRow = ({ icon: Icon, label, value }: any) => (
    <View style={styles.settingRow}>
        <View style={styles.rowLead}>
            <Icon size={20} color={theme.colors.onSurfaceVariant} />
            <Text style={styles.rowLabel}>{label}</Text>
        </View>
        <Text style={styles.rowValue}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.colors.background },
    content: { padding: theme.spacing.md, paddingTop: 20 },
    headerTitle: {
        ...theme.typography.displayLg,
        fontSize: 28,
        color: theme.colors.primary,
        marginBottom: theme.spacing.lg
    },
    section: { marginBottom: theme.spacing.xl },
    sectionLabel: {
        ...theme.typography.labelCaps,
        color: theme.colors.outline,
        marginBottom: 16
    },
    optionGrid: { flexDirection: 'row', gap: 12 },
    themeOption: {
        flex: 1,
        backgroundColor: theme.colors.surfaceContainerLow,
        padding: 12,
        borderRadius: theme.roundness.md,
        borderWidth: 1,
        borderColor: theme.colors.innerStroke,
        alignItems: 'center'
    },
    activeTheme: { borderColor: theme.colors.primary },
    colorPreview: {
        width: '100%',
        height: 40,
        borderRadius: theme.roundness.sm,
        marginBottom: 8
    },
    optionLabel: { ...theme.typography.labelCaps, fontSize: 10, color: theme.colors.primary },
    card: {
        backgroundColor: theme.colors.surfaceContainerLow,
        borderRadius: theme.roundness.xl,
        borderWidth: 1,
        borderColor: theme.colors.innerStroke,
        overflow: 'hidden'
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16
    },
    rowLead: { flexDirection: 'row', alignItems: 'center', gap: 12 },
    rowLabel: { ...theme.typography.titleSm, fontSize: 16, color: theme.colors.primary },
    rowValue: { ...theme.typography.labelCaps, color: theme.colors.emerald },
    divider: { height: 1, backgroundColor: theme.colors.innerStroke, marginHorizontal: 16 },
    experimentalCard: { padding: 16, marginTop: theme.spacing.md, backgroundColor: '#0A0A0A' },
    experimentalTitle: { ...theme.typography.labelCaps, color: theme.colors.emerald, marginBottom: 8 },
    experimentalDesc: { ...theme.typography.bodyMd, fontSize: 12, color: theme.colors.onSurfaceVariant, lineHeight: 18 },
    experimentalButton: {
        marginTop: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderRadius: theme.roundness.default,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: theme.colors.emerald
    },
    experimentalButtonText: { ...theme.typography.labelCaps, color: theme.colors.emerald }
});