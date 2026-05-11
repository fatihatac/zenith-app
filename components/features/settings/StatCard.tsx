import { useMemo } from 'react';
import { LucideIcon } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
    subValue?: string;
    color?: string;
}

export default function StatCard({ icon: Icon, label, value, subValue, color }: StatCardProps) {
    const theme = useThemeContext();
    const resolvedColor = color ?? theme.colors.primary;
    const styles = useMemo(() => StyleSheet.create({
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
        }
    }), [theme]);
    return (
        <View style={styles.statCard}>
            <View style={styles.statHeader}>
                <Icon size={16} color={theme.colors.onSurfaceVariant} />
                <Text style={styles.statLabel}>{label}</Text>
            </View>
            <Text style={[styles.statValue, { color: resolvedColor }]}>{value}</Text>
            <Text style={styles.statSubValue}>{subValue}</Text>
        </View>
    );
}

