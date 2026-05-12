export type FocusSessionType = 'focus' | 'shortBreak' | 'longBreak';

export interface FocusConfig {
  focusDuration: number; // saniye, default: 25*60
  shortBreakDuration: number; // saniye, default: 5*60
  longBreakDuration: number; // saniye, default: 15*60
  sessionsBeforeLongBreak: number; // default: 4
}

export interface FocusSessionRecord {
  id: string;
  type: FocusSessionType;
  startTime: number;
  endTime: number;
  plannedDuration: number;
  completed: boolean;
}

export interface FocusState {
  timeLeft: number;
  isActive: boolean;
  sessionType: FocusSessionType;
  config: FocusConfig;
  sessionHistory: FocusSessionRecord[];
  backgroundTimestamp: number | null;
  startTimestamp: number | null;
  completedFocusSessions: number;
  showCompletion: boolean;
}

export interface FocusActions {
  startSession: (type: FocusSessionType) => void;
  pauseSession: () => void;
  resetSession: () => void;
  tick: () => void;
  updateConfig: (newConfig: Partial<FocusConfig>) => void;
  addSessionRecord: (record: FocusSessionRecord) => void;
  setBackgroundTimestamp: (timestamp: number | null) => void;
  incrementCompletedFocusSessions: () => void;
  resetCompletedFocusSessions: () => void;
  setShowCompletion: (value: boolean) => void;
  resumeSession: () => void;
}

export const DEFAULT_FOCUS_CONFIG: FocusConfig = {
  focusDuration: 25 * 60,
  shortBreakDuration: 5 * 60,
  longBreakDuration: 15 * 60,
  sessionsBeforeLongBreak: 4,
};

export const SESSION_TYPE_DURATION_KEY: Record<FocusSessionType, keyof FocusConfig> = {
  focus: 'focusDuration',
  shortBreak: 'shortBreakDuration',
  longBreak: 'longBreakDuration',
};

export function getDefaultFocusState(): FocusState {
  return {
    timeLeft: DEFAULT_FOCUS_CONFIG.focusDuration,
    isActive: false,
    sessionType: 'focus',
    config: { ...DEFAULT_FOCUS_CONFIG },
    sessionHistory: [],
    backgroundTimestamp: null,
    startTimestamp: null,
    completedFocusSessions: 0,
    showCompletion: false,
  };
}
