import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { TAB_CONFIG } from '@/constants/navigation';
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

export const CustomBottomBar = ({ state, navigation }: BottomTabBarProps) => {
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
              style={[styles.tabButton, isFocused && styles.activeTabButton]}
            >
              <Icon
                color={isFocused ? theme.colors.primary : theme.colors.onSurfaceVariant}
                size={24}
              />
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

const styles = StyleSheet.create<CustomBottomBarStyles>({
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
    paddingHorizontal: 24,
    paddingVertical: 12,
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
    padding: 12,
    borderRadius: theme.roundness.full,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  activeTabButton: {
    backgroundColor: theme.colors.surfaceHighlight,
  },
});