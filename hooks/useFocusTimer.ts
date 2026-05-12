import { useEffect, useRef, useCallback, useMemo } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import * as Haptics from 'expo-haptics';
import { useFocusStore } from '@/store/focusStore';
import { FocusSessionType, SESSION_TYPE_DURATION_KEY } from '@/types/focus';

export const useFocusTimer = () => {
  // --- Store state selectors ---
  const timeLeft = useFocusStore((s) => s.timeLeft);
  const isActive = useFocusStore((s) => s.isActive);
  const sessionType = useFocusStore((s) => s.sessionType);
  const config = useFocusStore((s) => s.config);
  const completedFocusSessions = useFocusStore((s) => s.completedFocusSessions);
  const startTimestamp = useFocusStore((s) => s.startTimestamp);
  const showCompletion = useFocusStore((s) => s.showCompletion);

  // --- Store action selectors ---
  const tick = useFocusStore((s) => s.tick);
  const setBackgroundTimestamp = useFocusStore((s) => s.setBackgroundTimestamp);
  const startSession = useFocusStore((s) => s.startSession);
  const incrementCompletedFocusSessions = useFocusStore(
    (s) => s.incrementCompletedFocusSessions,
  );
  const resetCompletedFocusSessions = useFocusStore(
    (s) => s.resetCompletedFocusSessions,
  );
  const setShowCompletion = useFocusStore((s) => s.setShowCompletion);

  // --- Refs for lifecycle management ---
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const appStateRef = useRef<AppStateStatus>(AppState.currentState);
  const completionHandledRef = useRef(false);
  const prevIsActiveRef = useRef(isActive);

  // --------------------------------------------------
  // 1. Timer interval
  //    Starts/stops a 1s interval that calls tick()
  // --------------------------------------------------
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        tick();
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isActive, timeLeft, tick]);

  // --------------------------------------------------
  // 2. AppState background/foreground sync
  //    Records timestamp on blur; recalculates on focus
  // --------------------------------------------------
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
      const prevAppState = appStateRef.current;
      appStateRef.current = nextAppState;

      if (prevAppState === 'active' && (nextAppState === 'background' || nextAppState === 'inactive')) {
        const state = useFocusStore.getState();
        if (state.isActive) {
          state.setBackgroundTimestamp(Date.now());
        }
      } else if ((prevAppState === 'background' || prevAppState === 'inactive') && nextAppState === 'active') {
        const state = useFocusStore.getState();
        const bgTs = state.backgroundTimestamp;

        if (bgTs) {
          // tick() recalculates timeLeft from Date.now() - startTimestamp,
          // which automatically accounts for time spent in background.
          // If the session expired while away, tick() handles it.
          tick();
        }

        state.setBackgroundTimestamp(null);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [tick]);

  // --------------------------------------------------
  // 3. Auto-transition on session completion
  //    Determines next session type and schedules it
  // --------------------------------------------------
  useEffect(() => {
    if (showCompletion && !completionHandledRef.current) {
      completionHandledRef.current = true;

      // Haptic feedback for completed session
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      let nextType: FocusSessionType;

      if (sessionType === 'focus') {
        incrementCompletedFocusSessions();
        const newCount = completedFocusSessions + 1;
        nextType =
          newCount % config.sessionsBeforeLongBreak === 0
            ? 'longBreak'
            : 'shortBreak';
      } else if (sessionType === 'shortBreak') {
        nextType = 'focus';
      } else {
        // longBreak
        resetCompletedFocusSessions();
        nextType = 'focus';
      }

      // Clear any leftover timeout before scheduling a new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setShowCompletion(false);
        startSession(nextType);
        completionHandledRef.current = false;
      }, 3000);
    }
  }, [
    showCompletion,
    sessionType,
    completedFocusSessions,
    config,
    incrementCompletedFocusSessions,
    resetCompletedFocusSessions,
    setShowCompletion,
    startSession,
  ]);

  // --------------------------------------------------
  // 4. Cancel auto-transition on manual session start
  //    Detects isActive false→true transition
  // --------------------------------------------------
  useEffect(() => {
    const wasActive = prevIsActiveRef.current;
    prevIsActiveRef.current = isActive;

    if (isActive && !wasActive) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      completionHandledRef.current = false;
    }
  }, [isActive]);

  // --------------------------------------------------
  // 5. Cleanup on unmount
  // --------------------------------------------------
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, []);

  // --------------------------------------------------
  // Derived values
  // --------------------------------------------------
  const formattedTime = useMemo(() => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, [timeLeft]);

  const progress = useMemo(() => {
    const durationKey = SESSION_TYPE_DURATION_KEY[sessionType];
    const total = config[durationKey];
    if (total <= 0) return 0;
    return Math.min(1, Math.max(0, timeLeft / total));
  }, [timeLeft, sessionType, config]);

  // --------------------------------------------------
  // Public callback – light haptic for play/pause
  // --------------------------------------------------
  const impactPlayPause = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  }, []);

  return {
    formattedTime,
    progress,
    impactPlayPause,
    isActive,
    sessionType,
    timeLeft,
    completedFocusSessions,
  };
};
