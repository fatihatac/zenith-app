import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TAB_CONFIG } from '@/constants/navigation';
import { Animated, Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useMemo, useRef } from 'react';
import { useAppearanceStore } from '@/store/appearanceStore';

export const CustomBottomBar = ({ state, navigation }: BottomTabBarProps) => {
  const theme = useThemeContext();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { visualEffects } = useAppearanceStore();

  const tabScales = useRef<Map<string, Animated.Value>>(new Map()).current;

  const getTabScale = (key: string) => {
    if (!tabScales.has(key)) {
      tabScales.set(key, new Animated.Value(1));
    }
    return tabScales.get(key)!;
  };

  const onTabPressIn = (key: string) => {
    if (visualEffects === 'full') {
      Animated.spring(getTabScale(key), { toValue: 0.96, useNativeDriver: true }).start();
    }
  };
  const onTabPressOut = (key: string) => {
    if (visualEffects === 'full') {
      Animated.spring(getTabScale(key), { toValue: 1, friction: 3, useNativeDriver: true }).start();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {state.routes.map((route, index) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const { icon: Icon } = TAB_CONFIG[route.name];

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              onPressIn={() => onTabPressIn(route.key)}
              onPressOut={() => onTabPressOut(route.key)}
              style={[styles.tabButton, isFocused && styles.activeTabButton]}
            >
              <Animated.View style={{ transform: [{ scale: getTabScale(route.key) }] }}>
                <Icon
                  color={isFocused ? theme.colors.primary : theme.colors.onSurfaceVariant}
                  size={24}
                />
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

interface CustomBottomBarStyles {
  container: ViewStyle;
  bar: ViewStyle;
  tabButton: ViewStyle;
  activeTabButton: ViewStyle;
}

const createStyles = (theme: ReturnType<typeof useThemeContext>) =>
  StyleSheet.create<CustomBottomBarStyles>({
    container: {
      position: 'absolute',
      bottom: 24,
      alignSelf: 'center',
      width: '92%',
      maxWidth: 400,
    },
    bar: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingHorizontal: theme.spacing.md,
      paddingVertical: theme.spacing.xs + 4,
      backgroundColor: theme.colors.surfaceContainer,
      borderWidth: 1,
      borderColor: theme.colors.innerStroke,
      borderRadius: theme.roundness.full,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.3,
      shadowRadius: 20,
      elevation: 10,
      width: '100%',
    },
    tabButton: {
      padding: theme.spacing.xs + 4,
      borderRadius: theme.roundness.full,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    activeTabButton: {
      backgroundColor: theme.colors.surfaceHighlight,
    },
  });