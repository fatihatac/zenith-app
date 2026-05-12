import { useMemo } from 'react';
import { SubHeader } from '@/components/features/navigation/SubHeader';
import { SettingRow } from '@/components/ui/SettingRow';
import ThemeOption from '@/components/features/settings/ThemeOption';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAppearanceStore } from '@/store/appearanceStore';
import { Eye, Layout, Sparkles, Type } from 'lucide-react-native';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function AppearanceScreen() {
    const theme = useThemeContext();
    const {
        surfaceDepth, setSurfaceDepth,
        fontScale, setFontScale,
        readingFocus, toggleReadingFocus,
        layoutMode, setLayoutMode,
        visualEffects, setVisualEffects,
        classicTerminal, toggleClassicTerminal
    } = useAppearanceStore();
    const styles = useMemo(() => StyleSheet.create({
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
        optionGrid: { flexDirection: 'row', gap: theme.spacing.xs + 4 },
        card: {
            backgroundColor: theme.colors.surfaceContainerLow,
            borderRadius: theme.roundness.xl,
            borderWidth: 1,
            borderColor: theme.colors.innerStroke,
            overflow: 'hidden'
        },
        divider: { height: 1, backgroundColor: theme.colors.innerStroke, marginHorizontal: theme.spacing.sm },
        experimentalCard: { padding: theme.spacing.sm, marginTop: theme.spacing.md, backgroundColor: '#0A0A0A' },
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
    }), [theme]);

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
                        <ThemeOption label="Absolute" color="#000000" active={surfaceDepth === 'absolute'} onPress={() => setSurfaceDepth('absolute')} />
                        <ThemeOption label="Zenith" color="#131313" active={surfaceDepth === 'zenith'} onPress={() => setSurfaceDepth('zenith')} />
                        <ThemeOption label="Elevated" color="#1B1B1B" active={surfaceDepth === 'elevated'} onPress={() => setSurfaceDepth('elevated')} />
                    </View>
                </View>

                {/* Typography Scale */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>TYPOGRAPHY SCALE</Text>
                    <View style={styles.card}>
                        <SettingRow 
                            icon={Type} 
                            label="Font Scale" 
                            value={`${Math.round(fontScale * 100)}%`} 
                            valueColor={fontScale !== 1.0 ? theme.colors.emerald : theme.colors.outline} 
                            onPress={() => {
                                if (fontScale === 1.0) setFontScale(1.15);
                                else if (fontScale === 1.15) setFontScale(1.3);
                                else setFontScale(1.0);
                            }}
                        />
                        <View style={styles.divider} />
                        <SettingRow 
                            icon={Eye} 
                            label="Reading Focus" 
                            value={readingFocus ? "ENABLED" : "DISABLED"} 
                            valueColor={readingFocus ? theme.colors.emerald : theme.colors.outline} 
                            onPress={toggleReadingFocus}
                        />
                    </View>
                </View>

                {/* Interface Density */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>INTERFACE DENSITY</Text>
                    <View style={styles.card}>
                        <SettingRow 
                            icon={Layout} 
                            label="Layout Mode" 
                            value={layoutMode === 'generous' ? "GENEROUS" : "COMPACT"} 
                            valueColor={layoutMode === 'compact' ? theme.colors.emerald : theme.colors.outline} 
                            onPress={() => setLayoutMode(layoutMode === 'generous' ? 'compact' : 'generous')}
                        />
                        <View style={styles.divider} />
                        <SettingRow 
                            icon={Sparkles} 
                            label="Visual Effects" 
                            value={visualEffects === 'minimal' ? "MINIMAL" : "FULL"} 
                            valueColor={visualEffects === 'full' ? theme.colors.emerald : theme.colors.outline} 
                            onPress={() => setVisualEffects(visualEffects === 'minimal' ? 'full' : 'minimal')}
                        />
                    </View>
                </View>

                {/* Wildcard: Experimental Feature */}
                <View style={[styles.card, styles.experimentalCard]}>
                    <Text style={styles.experimentalTitle}>EXPERIMENTAL: CLASSIC TERMINAL</Text>
                    <Text style={styles.experimentalDesc}>
                        Forces monochrome emerald palette across all layers for a retro-technical aesthetic.
                    </Text>
                    <Pressable 
                        style={[
                            styles.experimentalButton, 
                            { backgroundColor: classicTerminal ? 'rgba(16, 185, 129, 0.25)' : 'rgba(16, 185, 129, 0.1)' }
                        ]}
                        onPress={toggleClassicTerminal}
                    >
                        <Text style={styles.experimentalButtonText}>
                            {classicTerminal ? "DEACTIVATE MODE" : "ACTIVATE MODE"}
                        </Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}