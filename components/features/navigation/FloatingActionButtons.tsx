import { Plus, Terminal } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { theme } from '@/constants/theme';

export const FloatingActionButtons = () => {
  return (
    <View pointerEvents="box-none" style={styles.container}>
      {/* Command Button */}
      <Pressable style={styles.commandButton}>
        <Terminal color={theme.colors.onPrimary} size={18} />
        <Text style={styles.commandText}>Command</Text>
      </Pressable>

      {/* Add Button */}
      <Pressable style={styles.addButton}>
        <Plus color={theme.colors.primary} size={24} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 112, // BottomBar'ın üstünde durması için
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    zIndex: 40,
  },
  commandButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.roundness.full,
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  commandText: {
    ...theme.typography.titleSm,
    fontSize: 14,
    color: theme.colors.onPrimary,
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: theme.colors.surfaceContainerHigh,
    borderWidth: 1,
    borderColor: theme.colors.innerStroke,
    borderRadius: theme.roundness.full,
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});