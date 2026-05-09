import { Cloud, ShieldCheck } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants/theme';

interface SystemLogItemProps {
  icon: 'cloud' | 'shield';
  title: string;
  description: string;
  time: string;
}

export const SystemLogItem: React.FC<SystemLogItemProps> = ({ icon, title, description, time }) => {
  const IconComponent = icon === 'cloud' ? Cloud : ShieldCheck;

  return (
    <View style={styles.container}>
      <IconComponent color={theme.colors.onSurfaceVariant} size={20} />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <Text style={styles.timeText}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.onSurfaceVariant,
  },
  content: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  title: {
    ...theme.typography.bodyMd,
    color: theme.colors.primary,
    fontWeight: '500',
    lineHeight: 20,
  },
  description: {
    ...theme.typography.labelCaps,
    fontSize: 14,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
    letterSpacing: 0,
    textTransform: 'none',
    lineHeight: 18,
  },
  timeText: {
    ...theme.typography.labelCaps,
    fontSize: 10,
    color: theme.colors.onSurfaceVariant,
  },
});