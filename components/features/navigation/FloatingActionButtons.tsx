import { useThemeContext } from '@/contexts/ThemeContext';
import { useAppearanceStore } from '@/store/appearanceStore';
import { Plus, Terminal } from 'lucide-react-native';
import { useMemo, useRef } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

export const FloatingActionButtons = () => {
  const theme = useThemeContext();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { visualEffects } = useAppearanceStore();
  const commandScale = useRef(new Animated.Value(1)).current;
  const addScale = useRef(new Animated.Value(1)).current;

  const createPressIn = (anim: Animated.Value) => () => {
    if (visualEffects === 'full') {
      Animated.spring(anim, { toValue: 0.96, useNativeDriver: true }).start();
    }
  };
  const createPressOut = (anim: Animated.Value) => () => {
    if (visualEffects === 'full') {
      Animated.spring(anim, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    }
  };

  return (
    <View pointerEvents="box-none" style={styles.container}>
      {/* Command Button */}
      <Pressable style={styles.commandButton} onPressIn={createPressIn(commandScale)} onPressOut={createPressOut(commandScale)}>
        <Animated.View style={[styles.commandButtonContent, { transform: [{ scale: commandScale }] }]}>
          <Terminal color={theme.colors.onPrimary} size={18} />
          <Text style={styles.commandText}>Command</Text>
        </Animated.View>
      </Pressable>

      {/* Add Button */}
      <Pressable style={styles.addButton} onPressIn={createPressIn(addScale)} onPressOut={createPressOut(addScale)}>
        <Animated.View style={{ transform: [{ scale: addScale }] }}>
          <Plus color={theme.colors.primary} size={24} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const createStyles = (theme: ReturnType<typeof useThemeContext>) =>
  StyleSheet.create({
    container: {
      position: 'absolute',
      bottom: 112,
      right: 24,
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs + 4,
      zIndex: 40,
    },
    commandButton: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.roundness.full,
      paddingHorizontal: theme.spacing.sm + 4,
      paddingVertical: theme.spacing.xs + 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
    },
    commandText: {
      ...theme.typography.titleSm,
      fontSize: 14,
      color: theme.colors.onPrimary,
      fontWeight: '500',
    },
    commandButtonContent: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing.xs,
    },
    addButton: {
      backgroundColor: theme.colors.surfaceContainerHigh,
      borderWidth: 1,
      borderColor: theme.colors.innerStroke,
      borderRadius: theme.roundness.full,
      width: 48,
      height: 48,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });