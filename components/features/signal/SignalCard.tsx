import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { theme } from '@/constants/theme';
import { SignalIntel } from '@/types/signal';

interface SignalCardProps {
  signal: SignalIntel;
}

export const SignalCard = ({ signal }: SignalCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.category}>{signal.category}</Text>
        <Text style={styles.timestamp}>{signal.timestamp}</Text>
      </View>
      <Text style={styles.title}>{signal.title}</Text>
      <Text style={styles.description}>{signal.description}</Text>
    </View>
  );
};

interface SignalCardStyles {
  card: ViewStyle;
  header: ViewStyle;
  category: TextStyle;
  timestamp: TextStyle;
  title: TextStyle;
  description: TextStyle;
}

const styles = StyleSheet.create<SignalCardStyles>({
  card: {
    backgroundColor: theme.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: theme.colors.innerStroke,
    borderRadius: theme.roundness.xl,
    padding: 24,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  category: {
    ...theme.typography.labelCaps,
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
    lineHeight: 16,
  },
  timestamp: {
    ...theme.typography.labelCaps,
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
    lineHeight: 16,
  },
  title: {
    ...theme.typography.titleSm,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 26, // Increased from 22
  },
  description: {
    ...theme.typography.bodyMd,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 24,
  },
});