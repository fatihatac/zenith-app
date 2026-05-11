import { LucideIcon } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';
import { theme } from '@/constants/theme';

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export const SidebarItem = ({ icon: Icon, label, active = false, onPress }: SidebarItemProps) => (
  <Pressable
    style={[styles.navItem, active && styles.activeNavItem]}
    onPress={onPress}
  >
    <Icon
      color={active ? theme.colors.onPrimaryContainer : theme.colors.onSurfaceVariant}
      size={24}
      strokeWidth={active ? 2 : 1.5}
    />
    <Text style={[styles.navLabel, active && styles.activeNavLabel]}>{label}</Text>
  </Pressable>
);

interface SidebarItemStyles {
  navItem: ViewStyle;
  activeNavItem: ViewStyle;
  navLabel: TextStyle;
  activeNavLabel: TextStyle;
}

const styles = StyleSheet.create<SidebarItemStyles>({
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 12,
    borderRadius: theme.roundness.default,
  },
  activeNavItem: { backgroundColor: theme.colors.primaryContainer },
  navLabel: { ...theme.typography.titleSm, color: theme.colors.onSurfaceVariant, lineHeight: 22 },
  activeNavLabel: { color: theme.colors.onPrimaryContainer, fontWeight: '700' },
});
