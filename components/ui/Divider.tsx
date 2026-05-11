import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

interface DividerProps {
  style?: ViewStyle;
  color?: string;
}

export const Divider = ({ style, color = theme.colors.innerStroke }: DividerProps) => {
  return (
    <View style={[styles.divider, { backgroundColor: color }, style]} />
  );
};

const styles = StyleSheet.create({
  divider: {
    height: 1,
    marginVertical: 20,
  },
});
