import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'unit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'marginMobile';
}

export const Card = ({ children, style, padding }: CardProps) => {
  const theme = useThemeContext();
  const resolvedPadding = padding ?? 'md';

  const styles = useMemo(() => StyleSheet.create({
    card: {
      backgroundColor: theme.colors.surfaceContainerLow,
      borderRadius: theme.roundness.xl,
      borderWidth: 1,
      borderColor: theme.colors.innerStroke,
      overflow: 'hidden',
    },
  }), [theme]);

  return (
    <View style={[styles.card, { padding: theme.spacing[resolvedPadding] }, style]}>
      {children}
    </View>
  );
};
