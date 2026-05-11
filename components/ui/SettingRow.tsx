import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { theme } from '@/constants/theme';

interface SettingRowProps {
  icon: LucideIcon;
  label: string;
  value: string;
  valueColor?: string;
  onPress?: () => void;
}

export const SettingRow = ({
  icon: Icon,
  label,
  value,
  valueColor = theme.colors.primary,
  onPress,
}: SettingRowProps) => {
  const content = (
    <View style={styles.row}>
      <View style={styles.rowLead}>
        <Icon size={20} color={theme.colors.onSurfaceVariant} />
        <Text style={styles.rowLabel}>{label}</Text>
      </View>
      <Text style={[styles.rowValue, { color: valueColor }]}>{value}</Text>
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress}>{content}</Pressable>;
  }

  return content;
};

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
