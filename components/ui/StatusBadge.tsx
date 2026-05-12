import React, { useMemo, useRef, useEffect } from 'react';
import { Animated, Easing, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAppearanceStore } from '@/store/appearanceStore';

interface StatusBadgeProps {
  label: string;
  variant: 'active' | 'standby' | 'default';
}

export const StatusBadge = ({ label, variant }: StatusBadgeProps) => {
  const theme = useThemeContext();
  const { visualEffects } = useAppearanceStore();
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (visualEffects === 'full' && variant === 'active') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, { toValue: 0.6, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
          Animated.timing(pulseAnim, { toValue: 1, duration: 1500, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [visualEffects, variant]);

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
      paddingHorizontal: theme.spacing.xs,
      paddingVertical: theme.spacing.unit,
      borderRadius: theme.roundness.sm,
    },
    label: {
      ...theme.typography.labelCaps,
      fontSize: 9,
    },
  }), [theme]);

  return (
    <Animated.View style={[styles.badge, containerStyle, { opacity: pulseAnim }]}>
      <Text style={[styles.label, textStyle]}>{label}</Text>
    </Animated.View>
  );
};
