import { useMemo, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useAppearanceStore } from '@/store/appearanceStore';

interface ThemeOptionProps {
  label: string;
  color: string;
  active?: boolean;
  onPress?: () => void;
}

const ThemeOption = ({ label, color, active = false, onPress }: ThemeOptionProps) => {
  const theme = useThemeContext();
  const { visualEffects } = useAppearanceStore();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const styles = useMemo(() => StyleSheet.create({
    themeOption: {
      flex: 1,
      backgroundColor: theme.colors.surfaceContainerLow,
      padding: theme.spacing.xs + 4,
      borderRadius: theme.roundness.md,
      borderWidth: 1,
      borderColor: theme.colors.innerStroke,
      alignItems: 'center',
    },
    activeTheme: {
      borderColor: theme.colors.primary,
    },
    colorPreview: {
      width: '100%',
      height: 40,
      borderRadius: theme.roundness.sm,
      marginBottom: theme.spacing.xs,
    },
    optionLabel: {
      ...theme.typography.labelCaps,
      fontSize: 10,
      color: theme.colors.primary,
    },
  }), [theme]);
  const handlePressIn = () => {
    if (visualEffects === 'full') {
      Animated.spring(scaleAnim, { toValue: 0.96, useNativeDriver: true }).start();
    }
  };
  const handlePressOut = () => {
    if (visualEffects === 'full') {
      Animated.spring(scaleAnim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    }
  };

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut} style={[styles.themeOption, active && styles.activeTheme]}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <View style={[styles.colorPreview, { backgroundColor: color }]} />
        <Text style={styles.optionLabel}>{label}</Text>
      </Animated.View>
    </Pressable>
  );
};


export default ThemeOption;
