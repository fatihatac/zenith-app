import { Menu, Search } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants/theme';

interface MainHeaderProps {
  onMenuPress: () => void;
}

export const MainHeader: React.FC<MainHeaderProps> = ({ onMenuPress }) => {
  return (
    <View style={styles.header}>
      <Pressable style={styles.iconButton} onPress={onMenuPress}>
        <Menu color={theme.colors.primary} size={24} />
      </Pressable>

      <Text style={styles.logoText}>ZENITH</Text>

      <Pressable style={styles.iconButton}>
        <Search color={theme.colors.primary} size={24} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.marginMobile,
    paddingTop: 56, // Safe Area + Padding
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.innerStroke,
    backgroundColor: theme.colors.background,
    zIndex: 50,
  },
  iconButton: {
    padding: 8,
    marginHorizontal: -8,
  },
  logoText: {
    ...theme.typography.headlineMd,
    color: theme.colors.primary,
    fontWeight: '700',
  },
});