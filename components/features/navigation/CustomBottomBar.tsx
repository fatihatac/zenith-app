import { Compass, Home, LineChart, Lock } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../../../constants/theme';

interface CustomBottomBarProps {
  state: any;
  navigation: any;
}

export const CustomBottomBar: React.FC<CustomBottomBarProps> = ({ state, navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let IconComponent = Home;
          if (route.name === 'signal') IconComponent = Compass;
          if (route.name === 'markets') IconComponent = LineChart;
          if (route.name === 'vault') IconComponent = Lock;

          return (
            <Pressable
              key={route.key}
              onPress={onPress}
              style={[styles.tabButton, isFocused && styles.activeTabButton]}
            >
              <IconComponent
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

const styles = StyleSheet.create({
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
    // Shadow for depth
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
    flex: 11,
  },
  activeTabButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});