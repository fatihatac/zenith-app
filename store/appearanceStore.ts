import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AppearanceState {
  // Preferences:
  surfaceDepth: 'absolute' | 'zenith' | 'elevated';
  fontScale: 1.0 | 1.15 | 1.3;
  readingFocus: boolean;
  layoutMode: 'generous' | 'compact';
  visualEffects: 'minimal' | 'full';
  classicTerminal: boolean;
  // Actions:
  setSurfaceDepth: (depth: AppearanceState['surfaceDepth']) => void;
  setFontScale: (scale: AppearanceState['fontScale']) => void;
  toggleReadingFocus: () => void;
  setLayoutMode: (mode: AppearanceState['layoutMode']) => void;
  setVisualEffects: (effects: AppearanceState['visualEffects']) => void;
  toggleClassicTerminal: () => void;
}

// Persisted subset — only preference fields, no actions
type PersistedAppearance = Pick<
  AppearanceState,
  'surfaceDepth' | 'fontScale' | 'readingFocus' | 'layoutMode' | 'visualEffects' | 'classicTerminal'
>;

export const useAppearanceStore = create<AppearanceState>()(
  persist<AppearanceState, [], [], PersistedAppearance>(
    (set) => ({
      // Default values:
      surfaceDepth: 'zenith',
      fontScale: 1.0,
      readingFocus: false,
      layoutMode: 'generous',
      visualEffects: 'minimal',
      classicTerminal: false,
      // Actions:
      setSurfaceDepth: (depth) => set({ surfaceDepth: depth }),
      setFontScale: (scale) => set({ fontScale: scale }),
      toggleReadingFocus: () => set((state) => ({ readingFocus: !state.readingFocus })),
      setLayoutMode: (mode) => set({ layoutMode: mode }),
      setVisualEffects: (effects) => set({ visualEffects: effects }),
      toggleClassicTerminal: () => set((state) => ({ classicTerminal: !state.classicTerminal })),
    }),
    {
      name: 'appearance-storage',
      storage: createJSONStorage<PersistedAppearance>(() => AsyncStorage),
      partialize: (state): PersistedAppearance => ({
        surfaceDepth: state.surfaceDepth,
        fontScale: state.fontScale,
        readingFocus: state.readingFocus,
        layoutMode: state.layoutMode,
        visualEffects: state.visualEffects,
        classicTerminal: state.classicTerminal,
      }),
    }
  )
);
