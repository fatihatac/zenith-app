import { useMemo, useCallback } from 'react';
import { Pressable, StyleSheet, Text, View, ViewStyle, TextStyle } from 'react-native';
import { Play, Pause, RotateCcw, Settings } from 'lucide-react-native';
import { useThemeContext } from '@/contexts/ThemeContext';
import { useFocusTimer } from '@/hooks/useFocusTimer';
import { SESSION_TYPE_DURATION_KEY } from '@/types/focus';
import { useFocusStore } from '@/store/focusStore';

interface WorkSessionWidgetProps {
  onSettingsPress?: () => void;
}

interface WorkSessionWidgetStyles {
  container: ViewStyle;
  label: TextStyle;
  timerText: TextStyle;
  buttonsRow: ViewStyle;
  primaryButton: ViewStyle;
  secondaryButton: ViewStyle;
  buttonText: TextStyle;
  secondaryButtonText: TextStyle;
  settingsButton: ViewStyle;
}

const SESSION_LABELS: Record<string, string> = {
  focus: 'Deep Work Session',
  shortBreak: 'Short Break',
  longBreak: 'Long Break',
};

export const WorkSessionWidget = ({ onSettingsPress }: WorkSessionWidgetProps) => {
  const theme = useThemeContext();
  const { formattedTime, isActive, sessionType, impactPlayPause, timeLeft } = useFocusTimer();

  const startSession = useFocusStore((s) => s.startSession);
  const pauseSession = useFocusStore((s) => s.pauseSession);
  const resetSession = useFocusStore((s) => s.resetSession);
  const resumeSession = useFocusStore((s) => s.resumeSession);

  const handleStart = useCallback(() => {
    impactPlayPause();
    if (!isActive && timeLeft > 0) {
      resumeSession();
    } else {
      startSession(sessionType);
    }
  }, [impactPlayPause, isActive, timeLeft, sessionType, startSession, resumeSession]);

  const handlePause = useCallback(() => {
    impactPlayPause();
    pauseSession();
  }, [impactPlayPause, pauseSession]);

  const handleReset = useCallback(() => {
    resetSession();
  }, [resetSession]);

  const styles = useMemo<WorkSessionWidgetStyles>(
    () =>
      StyleSheet.create({
        container: {
          backgroundColor: theme.colors.surfaceContainer,
          borderWidth: 1,
          borderColor: theme.colors.innerStroke,
          borderRadius: theme.roundness.xl,
          padding: theme.spacing.lg,
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 300,
          marginBottom: theme.spacing.md,
        },
        label: {
          ...theme.typography.labelCaps,
          color: theme.colors.onSurfaceVariant,
          textTransform: 'uppercase',
          marginBottom: theme.spacing.md,
          lineHeight: 16,
        },
        timerText: {
          ...theme.typography.displayLg,
          fontSize: 64,
          lineHeight: 72,
          color: theme.colors.primary,
          fontWeight: '700',
          marginVertical: theme.spacing.sm,
        },
        buttonsRow: {
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.sm,
          marginTop: theme.spacing.sm,
        },
        primaryButton: {
          backgroundColor: theme.colors.primary,
          paddingHorizontal: 32,
          paddingVertical: 12,
          borderRadius: theme.roundness.full,
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.xs,
        },
        secondaryButton: {
          borderWidth: 1,
          borderColor: theme.colors.outlineVariant,
          paddingHorizontal: 20,
          paddingVertical: 12,
          borderRadius: theme.roundness.full,
          flexDirection: 'row',
          alignItems: 'center',
          gap: theme.spacing.xs,
        },
        buttonText: {
          ...theme.typography.titleSm,
          color: theme.colors.onPrimary,
          fontWeight: '600',
          lineHeight: 24,
        },
        secondaryButtonText: {
          ...theme.typography.titleSm,
          color: theme.colors.onSurfaceVariant,
          fontWeight: '600',
          lineHeight: 24,
        },
        settingsButton: {
          position: 'absolute',
          top: theme.spacing.sm,
          right: theme.spacing.sm,
          width: 32,
          height: 32,
          borderRadius: theme.roundness.default,
          alignItems: 'center',
          justifyContent: 'center',
        },
      }),
    [theme]
  );

  return (
    <View style={styles.container}>
      {onSettingsPress && (
        <Pressable style={styles.settingsButton} onPress={onSettingsPress}>
          <Settings size={18} color={theme.colors.onSurfaceVariant} />
        </Pressable>
      )}
      <Text style={styles.label}>{SESSION_LABELS[sessionType] ?? 'Focus Session'}</Text>

      <Text style={styles.timerText}>{formattedTime}</Text>

      <View style={styles.buttonsRow}>
        {isActive ? (
          <>
            <Pressable style={styles.secondaryButton} onPress={handleReset}>
              <RotateCcw size={18} color={theme.colors.onSurfaceVariant} />
              <Text style={styles.secondaryButtonText}>Stop</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={handlePause}>
              <Pause size={18} color={theme.colors.onPrimary} />
              <Text style={styles.buttonText}>Pause</Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable style={styles.secondaryButton} onPress={handleReset}>
              <RotateCcw size={18} color={theme.colors.onSurfaceVariant} />
              <Text style={styles.secondaryButtonText}>Reset</Text>
            </Pressable>
            <Pressable style={styles.primaryButton} onPress={handleStart}>
              <Play size={18} color={theme.colors.onPrimary} />
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
          </>
        )}
      </View>
    </View>
  );
};