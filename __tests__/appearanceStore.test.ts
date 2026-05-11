jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import { useAppearanceStore } from '@/store/appearanceStore';

describe('appearanceStore', () => {
  beforeEach(() => {
    useAppearanceStore.setState(useAppearanceStore.getInitialState());
  });

  it('should initialize with default values', () => {
    const state = useAppearanceStore.getState();
    expect(state.surfaceDepth).toBe('zenith');
    expect(state.fontScale).toBe(1.0);
    expect(state.readingFocus).toBe(false);
    expect(state.layoutMode).toBe('generous');
    expect(state.visualEffects).toBe('minimal');
    expect(state.classicTerminal).toBe(false);
  });

  it('should set surface depth', () => {
    useAppearanceStore.getState().setSurfaceDepth('absolute');
    expect(useAppearanceStore.getState().surfaceDepth).toBe('absolute');

    useAppearanceStore.getState().setSurfaceDepth('elevated');
    expect(useAppearanceStore.getState().surfaceDepth).toBe('elevated');

    useAppearanceStore.getState().setSurfaceDepth('zenith');
    expect(useAppearanceStore.getState().surfaceDepth).toBe('zenith');
  });

  it('should set font scale', () => {
    useAppearanceStore.getState().setFontScale(1.15);
    expect(useAppearanceStore.getState().fontScale).toBe(1.15);

    useAppearanceStore.getState().setFontScale(1.3);
    expect(useAppearanceStore.getState().fontScale).toBe(1.3);

    useAppearanceStore.getState().setFontScale(1.0);
    expect(useAppearanceStore.getState().fontScale).toBe(1.0);
  });

  it('should toggle reading focus', () => {
    expect(useAppearanceStore.getState().readingFocus).toBe(false);

    useAppearanceStore.getState().toggleReadingFocus();
    expect(useAppearanceStore.getState().readingFocus).toBe(true);

    useAppearanceStore.getState().toggleReadingFocus();
    expect(useAppearanceStore.getState().readingFocus).toBe(false);
  });

  it('should set layout mode', () => {
    useAppearanceStore.getState().setLayoutMode('compact');
    expect(useAppearanceStore.getState().layoutMode).toBe('compact');

    useAppearanceStore.getState().setLayoutMode('generous');
    expect(useAppearanceStore.getState().layoutMode).toBe('generous');
  });

  it('should set visual effects', () => {
    useAppearanceStore.getState().setVisualEffects('full');
    expect(useAppearanceStore.getState().visualEffects).toBe('full');

    useAppearanceStore.getState().setVisualEffects('minimal');
    expect(useAppearanceStore.getState().visualEffects).toBe('minimal');
  });

  it('should toggle classic terminal', () => {
    expect(useAppearanceStore.getState().classicTerminal).toBe(false);

    useAppearanceStore.getState().toggleClassicTerminal();
    expect(useAppearanceStore.getState().classicTerminal).toBe(true);

    useAppearanceStore.getState().toggleClassicTerminal();
    expect(useAppearanceStore.getState().classicTerminal).toBe(false);
  });
});
