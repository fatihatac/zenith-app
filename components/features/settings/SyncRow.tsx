import { theme } from '@/constants/theme';
import { LucideIcon } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

interface SyncRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  statusColor?: string;
}

const SyncRow = ({ icon: Icon, label, value, statusColor = theme.colors.primary }: SyncRowProps) => (
  <View style={styles.row}>
    <View style={styles.rowLead}>
      <Icon size={20} color={theme.colors.onSurfaceVariant} />
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
    <Text style={[styles.rowValue, { color: statusColor }]}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  rowLead: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
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
});

export default SyncRow;
