import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

interface ThemeOptionProps {
  label: string;
  color: string;
  active?: boolean;
}

const ThemeOption = ({ label, color, active = false }: ThemeOptionProps) => (
  <Pressable style={[styles.themeOption, active && styles.activeTheme]}>
    <View style={[styles.colorPreview, { backgroundColor: color }]} />
    <Text style={styles.optionLabel}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
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
});

export default ThemeOption;
