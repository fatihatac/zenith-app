import { Lock } from 'lucide-react-native';
import { StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { theme } from '@/constants/theme';
import { VaultStatus } from '@/types/vault';

interface VaultStatusCardProps {
  status: VaultStatus;
}

export const VaultStatusCard = ({ status }: VaultStatusCardProps) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Lock color={theme.colors.emerald} size={24} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{status.title}</Text>
        <Text style={styles.statusText}>{status.status}</Text>
      </View>
    </View>
  );
};

interface VaultStatusCardStyles {
  card: ViewStyle;
  iconContainer: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  statusText: TextStyle;
}

const styles = StyleSheet.create<VaultStatusCardStyles>({
  card: {
    backgroundColor: theme.colors.surfaceContainerLow,
    borderWidth: 1,
    borderColor: theme.colors.innerStroke,
    borderRadius: theme.roundness.xl,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 8,
  },
  iconContainer: {
    backgroundColor: theme.colors.innerStroke,
    padding: theme.spacing.sm,
    borderRadius: theme.roundness.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: theme.colors.emeraldMuted,
  },
  textContainer: {
    flexDirection: 'column',
    gap: 4,
  },
  title: {
    ...theme.typography.titleSm,
    fontSize: 20,
    color: theme.colors.primary,
    fontWeight: '500',
    lineHeight: 26, // Increased to avoid clipping
  },
  statusText: {
    ...theme.typography.labelCaps,
    color: theme.colors.emerald,
    fontWeight: '600',
    letterSpacing: 1,
    lineHeight: 16, // Increased to avoid clipping
  },
});