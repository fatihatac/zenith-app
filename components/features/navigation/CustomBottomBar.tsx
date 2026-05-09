import { Compass, Home, LineChart, Lock } from 'lucide-react-native';
import React from 'react';
import { Pressable, View } from 'react-native';

interface CustomBottomBarProps {
  state: any;
  navigation: any;
}

export const CustomBottomBar: React.FC<CustomBottomBarProps> = ({ state, navigation }) => {
  return (
    <View className="absolute bottom-6 self-center w-[92%] max-w-[400px] flex-row justify-around items-center px-6 py-3 bg-surface-container border border-white/10 rounded-full shadow-2xl">
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
            className={`p-3 rounded-full items-center justify-center ${isFocused ? 'bg-white/10' : ''}`}
          >
            <IconComponent color={isFocused ? '#ffffff' : '#c4c7c8'} size={24} />
          </Pressable>
        );
      })}
    </View>
  );
};
