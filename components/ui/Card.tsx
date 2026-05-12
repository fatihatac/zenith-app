import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAppearanceStore } from '@/store/appearanceStore';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: 'unit' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'marginMobile';
}

export const Card = ({ children, style, padding }: CardProps) => {
  const theme = useThemeContext();
  const { visualEffects } = useAppearanceStore();
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

  const visualStyle: ViewStyle = visualEffects === 'full' ? {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  } : {};

  return (
    <View style={[styles.card, { padding: theme.spacing[resolvedPadding] }, visualStyle, style]}>
      {children}
    </View>
  );
};
