import { useMemo } from 'react';
import { LucideIcon } from 'lucide-react-native';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAppearanceStore } from '@/store/appearanceStore';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    subValue?: string;
    color?: string;
}

export default function StatCard({ icon: Icon, label, value, subValue, color }: StatCardProps) {
    const theme = useThemeContext();
    const { visualEffects } = useAppearanceStore();
    const resolvedColor = color ?? theme.colors.primary;
    const styles = useMemo(() => StyleSheet.create({
        statCard: {
            width: '48%',
            backgroundColor: theme.colors.surfaceContainerLow,
            padding: theme.spacing.sm,
            borderRadius: theme.roundness.md,
            borderWidth: 1,
            borderColor: theme.colors.innerStroke
        },
        statHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: theme.spacing.unit + 2,
            marginBottom: theme.spacing.xs
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
        }
    }), [theme]);

    const visualStyle: ViewStyle = visualEffects === 'full' ? {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
        borderColor: 'rgba(255, 255, 255, 0.12)',
    } : {};

    return (
        <View style={[styles.statCard, visualStyle]}>
            <View style={styles.statHeader}>
                <Icon size={16} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.statLabel}>{label}</Text>
            </View>
            <Text style={[styles.statValue, { color: resolvedColor }]}>{value}</Text>
            <Text style={styles.statSubValue}>{subValue}</Text>
        </View>
    );
}

