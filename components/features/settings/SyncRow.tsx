import { useMemo } from 'react';
import { useThemeContext } from '@/contexts/ThemeContext';
import { LucideIcon } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface SyncRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  statusColor?: string;
}

const SyncRow = ({ icon: Icon, label, value, statusColor }: SyncRowProps) => {
  const theme = useThemeContext();
  const resolvedStatusColor = statusColor ?? theme.colors.primary;
  const styles = useMemo(() => StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: theme.spacing.sm,
    },
    rowLead: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs + 4,
    },
    rowLabel: {
      ...theme.typography.titleSm,
      fontSize: 15,
      color: theme.colors.primary,
    },
    rowValue: {
      ...theme.typography.labelCaps,
      fontSize: 10,
    },
  }), [theme]);
  return (
    <View style={styles.row}>
      <View style={styles.rowLead}>
        <Icon size={20} color={theme.colors.onSurfaceVariant} />
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <Text style={[styles.rowValue, { color: resolvedStatusColor }]}>{value}</Text>
    </View>
  );
};


export default SyncRow;
