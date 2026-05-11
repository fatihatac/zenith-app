import { useMemo } from 'react';
import { type LucideIcon } from 'lucide-react-native';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';

interface SystemLogItemProps {
  icon: LucideIcon;
  title: string;
  description: string;
  time: string;
}

interface SystemLogItemStyles {
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  timeText: TextStyle;
}

export const SystemLogItem = ({ icon: IconComponent, title, description, time }: SystemLogItemProps) => {
  const theme = useThemeContext();
  const styles = useMemo<SystemLogItemStyles>(
    () =>
      StyleSheet.create({
        container: {
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: theme.spacing.sm,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.outlineVariant,
        },
        content: {
          flex: 1,
          marginLeft: theme.spacing.sm,
        },
        title: {
          ...theme.typography.bodyMd,
          color: theme.colors.primary,
          fontWeight: '500',
          lineHeight: 22,
        },
        description: {
          ...theme.typography.labelCaps,
          color: theme.colors.onSurfaceVariant,
          marginTop: 2,
          letterSpacing: 0.16,
          textTransform: 'none',
          lineHeight: 18,
        },
        timeText: {
          ...theme.typography.labelCaps,
          fontSize: 10,
          color: theme.colors.onSurfaceVariant,
          lineHeight: 14,
        },
      }),
    [theme]
  );
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
