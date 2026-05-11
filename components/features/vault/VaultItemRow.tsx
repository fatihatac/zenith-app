import { useMemo } from 'react';
import { ChevronRight, FileText, FolderOpen, Key } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { VaultItem } from '@/types/vault';

interface VaultItemRowProps {
  item: VaultItem;
}

export const VaultItemRow = ({ item }: VaultItemRowProps) => {
  const theme = useThemeContext();
  const styles = useMemo(() => StyleSheet.create<VaultItemRowStyles>({
    row: {
      backgroundColor: theme.colors.surfaceContainerLow,
      borderWidth: 1,
      borderColor: theme.colors.innerStroke,
      borderRadius: theme.roundness.xl,
      padding: 16,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 4,
    },
    contentLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },
    textContainer: {
      flexDirection: 'column',
      gap: 4,
    },
    title: {
      ...theme.typography.titleSm,
      fontSize: 16,
      color: theme.colors.primary,
      lineHeight: 22,
    },
    subtitle: {
      ...theme.typography.labelCaps,
      fontSize: 12,
      color: theme.colors.onSurfaceVariant,
      textTransform: 'none',
      letterSpacing: 0,
      lineHeight: 16,
    },
  }), [theme]);

  let IconComponent = Key;
  if (item.icon === 'file-text') IconComponent = FileText;
  if (item.icon === 'folder-open') IconComponent = FolderOpen;

  return (
    <Pressable style={styles.row}>
      <View style={styles.contentLeft}>
        <IconComponent color={theme.colors.onSurfaceVariant} size={20} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <ChevronRight color={theme.colors.onSurfaceVariant} size={20} />
    </Pressable>
  );
};

interface VaultItemRowStyles {
  row: ViewStyle;
  contentLeft: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
}