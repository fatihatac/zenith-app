import { Menu, Search } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useMemo } from 'react';

interface MainHeaderProps {
  onMenuPress: () => void;
}

export const MainHeader = ({ onMenuPress }: MainHeaderProps) => {
  const theme = useThemeContext();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
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
      lineHeight: 32,
    },
  });