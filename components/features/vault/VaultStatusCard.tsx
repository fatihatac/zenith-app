import { Lock } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants/theme';

export const VaultStatusCard: React.FC<{ status: any }> = ({ status }) => {
  return (
    <View style={styles.card}>
      <View style={styles.iconContainer}>
        <Lock color={theme.colors.emerald} size={24} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>Local Vault</Text>
        <Text style={styles.statusText}>E2E ENCRYPTION ACTIVE</Text>
      </View>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 8,
  },
  iconContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: 16,
    borderRadius: theme.roundness.full,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.2)', // Emerald tint
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
    lineHeight: 20,
  },
  statusText: {
    ...theme.typography.labelCaps,
    color: theme.colors.emerald,
    fontWeight: '600',
    letterSpacing: 1,
  },
});