import { Menu, Search } from 'lucide-react-native';
import { Animated, Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useMemo, useRef } from 'react';
import { useAppearanceStore } from '@/store/appearanceStore';

interface MainHeaderProps {
  onMenuPress: () => void;
}

export const MainHeader = ({ onMenuPress }: MainHeaderProps) => {
  const theme = useThemeContext();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const { visualEffects } = useAppearanceStore();
  const menuScale = useRef(new Animated.Value(1)).current;
  const searchScale = useRef(new Animated.Value(1)).current;

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
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
      <Pressable style={styles.iconButton} onPress={onMenuPress} onPressIn={createPressIn(menuScale)} onPressOut={createPressOut(menuScale)}>
        <Animated.View style={{ transform: [{ scale: menuScale }] }}>
          <Menu color={theme.colors.primary} size={24} />
        </Animated.View>
      </Pressable>

      <Text style={styles.logoText}>ZENITH</Text>

      <Pressable style={styles.iconButton} onPressIn={createPressIn(searchScale)} onPressOut={createPressOut(searchScale)}>
        <Animated.View style={{ transform: [{ scale: searchScale }] }}>
          <Search color={theme.colors.primary} size={24} />
        </Animated.View>
      </Pressable>
    </View>
  );
};

interface MainHeaderStyles {
  header: ViewStyle;
  iconButton: ViewStyle;
  logoText: TextStyle;
}

const createStyles = (theme: ReturnType<typeof useThemeContext>) =>
  StyleSheet.create<MainHeaderStyles>({
    header: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.marginMobile,
      paddingBottom: theme.spacing.sm,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.innerStroke,
      backgroundColor: theme.colors.background,
      zIndex: 50,
    },
    iconButton: {
      padding: theme.spacing.xs,
      marginHorizontal: -8,
    },
    logoText: {
      ...theme.typography.headlineMd,
      color: theme.colors.primary,
      fontWeight: '700',
      lineHeight: 32,
    },
  });