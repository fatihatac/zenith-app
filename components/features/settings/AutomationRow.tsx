import { useMemo } from 'react';
import { LucideIcon } from 'lucide-react-native';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';

interface AutomationRowProps {
    icon: LucideIcon;
    title: string;
    desc: string;
    active: boolean;
    onToggle?: (value: boolean) => void;
}

export default function AutomationRow({ icon: Icon, title, desc, active }: AutomationRowProps) {
    const theme = useThemeContext();
    const styles = useMemo(() => StyleSheet.create({
        row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: theme.spacing.sm + 4 },
        rowLead: { flexDirection: 'row', alignItems: 'flex-start', gap: theme.spacing.sm, flex: 1 },
        rowText: { flex: 1 },
        rowTitle: { ...theme.typography.titleSm, color: theme.colors.primary, marginBottom: 4 },
        rowDesc: { ...theme.typography.bodyMd, fontSize: 12, color: theme.colors.onSurfaceVariant, lineHeight: 18 }
    }), [theme]);
    return (
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
}

