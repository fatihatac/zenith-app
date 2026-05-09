import { ChevronRight, FileText, FolderOpen, Key } from 'lucide-react-native';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '../../../constants/theme';
import { VaultItem } from '../../../types/vault';

interface VaultItemRowProps {
  item: VaultItem;
}

export const VaultItemRow: React.FC<VaultItemRowProps> = ({ item }) => {
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

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#1A1A1A',
    borderWidth: 1,
    borderColor: theme.colors.innerStroke,
    borderRadius: theme.roundness.xl, // 24px
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
    lineHeight: 16,
  },
  subtitle: {
    ...theme.typography.labelCaps,
    fontSize: 12,
    color: theme.colors.onSurfaceVariant,
    textTransform: 'none',
    letterSpacing: 0,
    lineHeight: 12,
  },
});