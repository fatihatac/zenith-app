import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useFocusStore } from '@/store/focusStore';
import { useThemeContext } from '@/contexts/ThemeContext';

export default function FocusOverlay() {
  const isActive = useFocusStore((state) => state.isActive);
  const theme = useThemeContext();

  const styles = React.useMemo(
    () =>
      StyleSheet.create({
        overlay: {
          position: 'absolute',
          inset: 0,
          backgroundColor: theme.colors.backdrop ?? 'rgba(0, 0, 0, 0.4)',
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 60,
          zIndex: 100,
        },
        badge: {
          backgroundColor: theme.colors.surface,
          paddingHorizontal: theme.spacing.sm,
          paddingVertical: theme.spacing.xs,
          borderRadius: theme.roundness.lg,
        },
        badgeText: {
          color: theme.colors.onSurface,
          fontSize: theme.typography.labelCaps.fontSize ?? 14,
          fontWeight: '600',
        },
      }),
    [theme]
  );

  if (!isActive) return null;

  return (
    <View style={styles.overlay} pointerEvents="none">
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Focus Mode Active</Text>
      </View>
    </View>
  );
}
