import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  FocusState,
  FocusActions,
  FocusSessionType,
  FocusSessionRecord,
  FocusConfig,
  SESSION_TYPE_DURATION_KEY,
  getDefaultFocusState,
} from '@/types/focus';

type PersistedFocus = Pick<FocusState, 'config' | 'sessionHistory' | 'completedFocusSessions'>;

export const useFocusStore = create<FocusState & FocusActions>()(
  persist<FocusState & FocusActions, [], [], PersistedFocus>(
    (set, get) => ({
      ...getDefaultFocusState(),

      startSession: (type: FocusSessionType) => {
        const config = get().config;
        const durationKey = SESSION_TYPE_DURATION_KEY[type];
        const duration = config[durationKey] as number;
        set({
          sessionType: type,
          timeLeft: duration,
          isActive: true,
          backgroundTimestamp: null,
          startTimestamp: Date.now(),
        });
      },

      pauseSession: () => {
        set({ isActive: false });
      },

      resetSession: () => {
        const state = get();
        const config = state.config;
        const durationKey = SESSION_TYPE_DURATION_KEY[state.sessionType];
        const plannedDuration = config[durationKey] as number;
        const elapsed = plannedDuration - state.timeLeft;

        if (elapsed > 5 && state.startTimestamp) {
          const record: FocusSessionRecord = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            type: state.sessionType,
            startTime: state.startTimestamp,
            endTime: Date.now(),
            plannedDuration,
            completed: false,
          };
          const history = [record, ...state.sessionHistory].slice(0, 50);
          set({ sessionHistory: history });
        }

        set({
          isActive: false,
          backgroundTimestamp: null,
          timeLeft: plannedDuration,
          startTimestamp: null,
        });
      },

      tick: () => {
        const state = get();
        if (!state.isActive || !state.startTimestamp) return;

        const config = state.config;
        const durationKey = SESSION_TYPE_DURATION_KEY[state.sessionType];
        const plannedDuration = config[durationKey] as number;
        const elapsed = Math.floor((Date.now() - state.startTimestamp) / 1000);
        const newTimeLeft = Math.max(0, plannedDuration - elapsed);

        if (newTimeLeft <= 0) {
          const record: FocusSessionRecord = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
            type: state.sessionType,
            startTime: state.startTimestamp,
            endTime: Date.now(),
            plannedDuration,
            completed: true,
          };
          const history = [record, ...state.sessionHistory].slice(0, 50);
          set({
            timeLeft: 0,
            isActive: false,
            startTimestamp: null,
            sessionHistory: history,
            showCompletion: true,
          });
        } else {
          set({ timeLeft: newTimeLeft });
        }
      },

      updateConfig: (newConfig: Partial<FocusConfig>) => {
        const state = get();
        const updatedConfig = { ...state.config, ...newConfig };
        const updates: Partial<FocusState> = { config: updatedConfig };

        if (!state.isActive) {
          const durationKey = SESSION_TYPE_DURATION_KEY[state.sessionType];
          updates.timeLeft = updatedConfig[durationKey] as number;
        }

        set(updates);
      },

      addSessionRecord: (record: FocusSessionRecord) => {
        const state = get();
        const history = [record, ...state.sessionHistory].slice(0, 50);
        set({ sessionHistory: history });
      },

      setBackgroundTimestamp: (timestamp: number | null) => {
        set({ backgroundTimestamp: timestamp });
      },

      incrementCompletedFocusSessions: () => {
        set((state) => ({ completedFocusSessions: state.completedFocusSessions + 1 }));
      },

      resetCompletedFocusSessions: () => {
        set({ completedFocusSessions: 0 });
      },

      setShowCompletion: (value: boolean) => {
        set({ showCompletion: value });
      },

      resumeSession: () => {
        const state = get();
        const config = state.config;
        const durationKey = SESSION_TYPE_DURATION_KEY[state.sessionType];
        const plannedDuration = config[durationKey] as number;
        const elapsedAlready = Math.max(0, plannedDuration - state.timeLeft);
        set({
          isActive: true,
          startTimestamp: Date.now() - (elapsedAlready * 1000),
          backgroundTimestamp: null,
        });
      },
    }),
    {
      name: 'focus-storage',
      storage: createJSONStorage<PersistedFocus>(() => AsyncStorage),
      partialize: (state): PersistedFocus => ({
        config: state.config,
        sessionHistory: state.sessionHistory,
        completedFocusSessions: state.completedFocusSessions,
      }),
    }
  )
);
