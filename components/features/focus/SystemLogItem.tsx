import { Cloud, ShieldCheck } from 'lucide-react-native';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { theme } from '../../../constants/theme';

interface SystemLogItemProps {
  icon: 'cloud' | 'shield';
  title: string;
  description: string;
  time: string;
}

export const SystemLogItem = ({ icon, title, description, time }: SystemLogItemProps) => {
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

interface SystemLogItemStyles {
  container: ViewStyle;
  content: ViewStyle;
  title: TextStyle;
  description: TextStyle;
  timeText: TextStyle;
}

const styles = StyleSheet.create<SystemLogItemStyles>({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineVariant, // Updated to outlineVariant
  },
  content: {
    flex: 1,
    marginLeft: theme.spacing.sm,
  },
  title: {
    ...theme.typography.bodyMd,
    color: theme.colors.primary,
    fontWeight: '500',
    lineHeight: 22, // Increased from 20
  },
  description: {
    ...theme.typography.labelCaps,
    color: theme.colors.onSurfaceVariant,
    marginTop: 2,
    letterSpacing: 0.16, // Matches bodyMd letter spacing for better readability in lists
    textTransform: 'none',
    lineHeight: 18,
  },
  timeText: {
    ...theme.typography.labelCaps,
    fontSize: 10,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 14, // Increased
  },
});