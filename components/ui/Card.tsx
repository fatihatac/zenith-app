import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: keyof typeof theme.spacing;
}

export const Card = ({ children, style, padding = 'md' }: CardProps) => {
  return (
    <View style={[styles.card, { padding: theme.spacing[padding] }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surfaceContainerLow,
    borderRadius: theme.roundness.xl,
    borderWidth: 1,
    borderColor: theme.colors.innerStroke,
    overflow: 'hidden',
  },
});
