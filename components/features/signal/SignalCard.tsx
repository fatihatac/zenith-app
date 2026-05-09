import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants/theme';
import { SignalIntel } from '../../../types/signal';

interface SignalCardProps {
  signal: SignalIntel;
}

export const SignalCard: React.FC<SignalCardProps> = ({ signal }) => {
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: theme.colors.innerStroke,
    borderRadius: theme.roundness.xl, // 24px
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
  },
  timestamp: {
    ...theme.typography.labelCaps,
    color: theme.colors.onSurfaceVariant,
    textTransform: 'uppercase',
  },
  title: {
    ...theme.typography.titleSm,
    color: theme.colors.primary,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 22,
  },
  description: {
    ...theme.typography.bodyMd,
    color: theme.colors.onSurfaceVariant,
    lineHeight: 24,
  },
});