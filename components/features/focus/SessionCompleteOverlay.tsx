import { useEffect, useCallback } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { CheckCircle, Coffee, Moon } from 'lucide-react-native';
import { useFocusStore } from '@/store/focusStore';
import { useThemeContext } from '@/contexts/ThemeContext';
import type { FocusSessionType } from '@/types/focus';

const SESSION_ICONS: Record<FocusSessionType, typeof CheckCircle> = {
  focus: CheckCircle,
  shortBreak: Coffee,
  longBreak: Moon,
};

const SESSION_SUBTITLES: Record<FocusSessionType, string> = {
  focus: 'Great focus session!',
  shortBreak: 'Time to recharge!',
  longBreak: 'Well deserved rest!',
};

export default function SessionCompleteOverlay() {
  const theme = useThemeContext();
  const showCompletion = useFocusStore((s) => s.showCompletion);
  const sessionType = useFocusStore((s) => s.sessionType);
  const setShowCompletion = useFocusStore((s) => s.setShowCompletion);

  const IconComponent = SESSION_ICONS[sessionType] ?? CheckCircle;

  useEffect(() => {
    if (showCompletion) {
      const timer = setTimeout(() => {
        setShowCompletion(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showCompletion, setShowCompletion]);

  const handleDismiss = useCallback(() => {
    setShowCompletion(false);
  }, [setShowCompletion]);

  if (!showCompletion) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.card}>
        <IconComponent size={48} color="#10b981" />
        <Text style={styles.title}>Session Complete!</Text>
        <Text style={styles.subtitle}>
          {SESSION_SUBTITLES[sessionType] ?? 'Great work!'}
        </Text>
        <Pressable style={styles.button} onPress={handleDismiss}>
          <Text style={styles.buttonText}>OK</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 200,
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    gap: 16,
    marginHorizontal: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#c4c7c8',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 32,
    paddingVertical: 10,
    borderRadius: 999,
    marginTop: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2f3131',
  },
});