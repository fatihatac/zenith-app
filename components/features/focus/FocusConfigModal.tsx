import { useMemo } from 'react';
import { Modal, Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Plus, Minus } from 'lucide-react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useFocusStore } from '@/store/focusStore';
import type { FocusSessionType } from '@/types/focus';

interface FocusConfigModalProps {
  visible: boolean;
  onClose: () => void;
}

interface ConfigRowStyles {
  row: ViewStyle;
  label: TextStyle;
  controls: ViewStyle;
  button: ViewStyle;
  value: TextStyle;
}

interface FocusConfigModalStyles {
  backdrop: ViewStyle;
  container: ViewStyle;
  title: TextStyle;
  row: ViewStyle;
  rowLabel: TextStyle;
  controls: ViewStyle;
  controlButton: ViewStyle;
  controlValue: TextStyle;
}

const ROW_CONFIGS: { key: FocusSessionType; label: string }[] = [
  { key: 'focus', label: 'Focus Duration' },
  { key: 'shortBreak', label: 'Short Break' },
  { key: 'longBreak', label: 'Long Break' },
];

const MIN_SECONDS = 60;
const MAX_SECONDS = 120 * 60;

export default function FocusConfigModal({ visible, onClose }: FocusConfigModalProps) {
  const theme = useThemeContext();
  const config = useFocusStore((state) => state.config);
  const updateConfig = useFocusStore((state) => state.updateConfig);

  const styles = useMemo<FocusConfigModalStyles>(
    () =>
      StyleSheet.create({
        backdrop: {
          flex: 1,
          backgroundColor: theme.colors.backdrop ?? 'rgba(0, 0, 0, 0.4)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        container: {
          backgroundColor: theme.colors.surface,
          borderRadius: theme.roundness.lg,
          padding: theme.spacing.lg,
          marginHorizontal: theme.spacing.md,
          width: '90%',
          maxWidth: 360,
        },
        title: {
          ...theme.typography.headlineMd,
          color: theme.colors.onSurface,
          marginBottom: theme.spacing.md,
          textAlign: 'center',
        },
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: theme.spacing.xs + 2,
        },
        rowLabel: {
          ...theme.typography.bodyMd,
          color: theme.colors.onSurface,
        },
        controls: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.sm,
        },
        controlButton: {
          width: 36,
          height: 36,
          borderRadius: theme.roundness.full,
          backgroundColor: theme.colors.surfaceContainer,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1,
          borderColor: theme.colors.innerStroke,
        },
        controlValue: {
          ...theme.typography.headlineMd,
          color: theme.colors.primary,
          fontWeight: '700',
          minWidth: 44,
          textAlign: 'center',
        },
      }),
    [theme]
  );

  const handleAdjust = (type: FocusSessionType, delta: number) => {
    const durationKey = type === 'focus'
      ? 'focusDuration'
      : type === 'shortBreak'
      ? 'shortBreakDuration'
      : 'longBreakDuration';
    const current = config[durationKey];
    const next = Math.min(MAX_SECONDS, Math.max(MIN_SECONDS, current + delta));
    updateConfig({ [durationKey]: next });
  };

  const toMinutes = (seconds: number) => Math.round(seconds / 60);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.container} onPress={(e) => e.stopPropagation()}>
          <Text style={styles.title}>Engine Configuration</Text>

          {ROW_CONFIGS.map(({ key, label }) => (
            <View key={key} style={styles.row}>
              <Text style={styles.rowLabel}>{label}</Text>
              <View style={styles.controls}>
                <Pressable
                  style={styles.controlButton}
                  onPress={() => handleAdjust(key, -60)}
                >
                  <Minus size={18} color={theme.colors.onSurface} />
                </Pressable>
                <Text style={[styles.controlValue, { fontVariant: ['tabular-nums'] }]}>
                  {toMinutes(config[key === 'focus' ? 'focusDuration' : key === 'shortBreak' ? 'shortBreakDuration' : 'longBreakDuration'])}
                </Text>
                <Pressable
                  style={styles.controlButton}
                  onPress={() => handleAdjust(key, 60)}
                >
                  <Plus size={18} color={theme.colors.onSurface} />
                </Pressable>
              </View>
            </View>
          ))}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
