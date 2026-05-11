import React, { useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';

interface DividerProps {
  style?: ViewStyle;
  color?: string;
}

export const Divider = ({ style, color }: DividerProps) => {
  const theme = useThemeContext();
  const resolvedColor = color ?? theme.colors.innerStroke;

  const styles = useMemo(() => StyleSheet.create({
    divider: {
      height: 1,
      marginVertical: 20,
    },
  }), [theme]);

  return (
    <View style={[styles.divider, { backgroundColor: resolvedColor }, style]} />
  );
};
