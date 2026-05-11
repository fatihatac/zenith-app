import React, { useMemo } from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';

interface StatusBadgeProps {
  label: string;
  variant: 'active' | 'standby' | 'default';
}

export const StatusBadge = ({ label, variant }: StatusBadgeProps) => {
  const theme = useThemeContext();

  let containerStyle: ViewStyle = {};
  let textStyle: TextStyle = {};

  switch (variant) {
    case 'active':
      containerStyle = { backgroundColor: 'rgba(16, 185, 129, 0.1)' };
      textStyle = { color: theme.colors.emerald };
      break;
    case 'standby':
      containerStyle = { backgroundColor: 'rgba(142, 145, 146, 0.1)' };
      textStyle = { color: theme.colors.onSurfaceVariant };
      break;
    case 'default':
    default:
      containerStyle = { backgroundColor: theme.colors.surfaceHighlight };
      textStyle = { color: theme.colors.primary };
      break;
  }

  const styles = useMemo(() => StyleSheet.create({
    badge: {
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    label: {
      ...theme.typography.labelCaps,
      fontSize: 9,
    },
  }), [theme]);

  return (
    <View style={[styles.badge, containerStyle]}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </View>
  );
};
