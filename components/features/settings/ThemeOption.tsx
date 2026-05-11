import { useMemo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';

interface ThemeOptionProps {
  label: string;
  color: string;
  active?: boolean;
  onPress?: () => void;
}

const ThemeOption = ({ label, color, active = false, onPress }: ThemeOptionProps) => {
  const theme = useThemeContext();
  const styles = useMemo(() => StyleSheet.create({
    themeOption: {
      flex: 1,
      backgroundColor: theme.colors.surfaceContainerLow,
      padding: 12,
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
      marginBottom: 8,
    },
    optionLabel: {
      ...theme.typography.labelCaps,
      fontSize: 10,
      color: theme.colors.primary,
    },
  }), [theme]);
  return (
    <Pressable onPress={onPress} style={[styles.themeOption, active && styles.activeTheme]}>
      <View style={[styles.colorPreview, { backgroundColor: color }]} />
      <Text style={styles.optionLabel}>{label}</Text>
    </Pressable>
  );
};


export default ThemeOption;
