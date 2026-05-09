import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants/theme';

export const WorkSessionWidget: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Deep Work Session</Text>

      <Text style={styles.timerText}>25:00</Text>

      <Pressable style={styles.startButton}>
        <Text style={styles.buttonText}>START</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.surfaceContainer,
    borderWidth: 1,
    borderColor: theme.colors.innerStroke,
    borderRadius: theme.roundness.xl, // 24px
    padding: theme.spacing.lg, // 40px
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 300,
    marginBottom: theme.spacing.md,
  },
  label: {
    ...theme.typography.labelCaps,
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.md,
  },
  timerText: {
    ...theme.typography.displayLg,
    fontSize: 64,
    lineHeight: 72,
    color: theme.colors.primary,
    fontWeight: '700',
    marginVertical: theme.spacing.sm,
  },
  startButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: theme.roundness.full,
  },
  buttonText: {
    ...theme.typography.titleSm,
    color: theme.colors.onPrimary,
    fontWeight: '600',
  },
});