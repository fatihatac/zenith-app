jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

import { renderHook, act } from '@testing-library/react-native';
import { useTheme } from '@/hooks/useTheme';
import { useAppearanceStore } from '@/store/appearanceStore';
import { theme as baseTheme } from '@/constants/theme';

describe('useTheme', () => {
  beforeEach(() => {
    useAppearanceStore.setState(useAppearanceStore.getInitialState());
  });

  it('should return base theme at default preferences', () => {
    const { result } = renderHook(() => useTheme());
    const current = result.current;

    expect(current.colors.surface).toBe(baseTheme.colors.surface);
    expect(current.colors.onSurface).toBe(baseTheme.colors.onSurface);
    expect(current.colors.background).toBe(baseTheme.colors.background);
    expect(current.spacing.unit).toBe(baseTheme.spacing.unit);
    expect(current.spacing.sm).toBe(baseTheme.spacing.sm);
    expect(current.typography.displayLg.fontSize).toBe(baseTheme.typography.displayLg.fontSize);
    expect(current.typography.bodyMd.fontSize).toBe(baseTheme.typography.bodyMd.fontSize);
    expect(current.roundness.default).toBe(baseTheme.roundness.default);
    expect(current.roundness.sm).toBe(baseTheme.roundness.sm);
  });

  it('should apply absolute tonal depth', () => {
    act(() => {
      useAppearanceStore.getState().setSurfaceDepth('absolute');
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.colors.surface).toBe('#000000');
    expect(result.current.colors.surfaceDim).toBe('#000000');
    expect(result.current.colors.background).toBe('#000000');
    expect(result.current.colors.surfaceContainer).toBe('#0e0e0e');
    expect(result.current.colors.surfaceContainerHigh).toBe('#1a1a1a');
  });

  it('should apply elevated tonal depth', () => {
    act(() => {
      useAppearanceStore.getState().setSurfaceDepth('elevated');
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.colors.surface).toBe('#1B1B1B');
    expect(result.current.colors.surfaceDim).toBe('#1B1B1B');
    expect(result.current.colors.background).toBe('#1B1B1B');
    expect(result.current.colors.surfaceContainerLowest).toBe('#141414');
    expect(result.current.colors.surfaceContainerHighest).toBe('#3d3d3d');
  });

  it('should affect typography font sizes when font scale changes', () => {
    act(() => {
      useAppearanceStore.getState().setFontScale(1.15);
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.typography.displayLg.fontSize).toBe(46);
    expect(result.current.typography.headlineMd.fontSize).toBeCloseTo(27.6);
    expect(result.current.typography.titleSm.fontSize).toBeCloseTo(20.7);
    expect(result.current.typography.bodyMd.fontSize).toBeCloseTo(18.4);
    expect(result.current.typography.labelCaps.fontSize).toBeCloseTo(13.8);
  });

  it('should override colors to emerald monochrome in classic terminal mode', () => {
    act(() => {
      useAppearanceStore.getState().toggleClassicTerminal();
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.colors.surface).toBe('#050f09');
    expect(result.current.colors.onSurface).toBe('#10b981');
    expect(result.current.colors.primary).toBe('#10b981');
    expect(result.current.colors.background).toBe('#050f09');
    expect(result.current.colors.onBackground).toBe('#10b981');
    expect(result.current.colors.emerald).toBe('#34d399');
    expect(result.current.colors.error).toBe('#ef4444');
  });

  it('should apply reading focus text contrast', () => {
    act(() => {
      useAppearanceStore.getState().toggleReadingFocus();
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.colors.onSurface).toBe('#ffffff');
    expect(result.current.colors.onSurfaceVariant).toBe('#a0a3a4');
  });

  it('should apply compact layout spacing', () => {
    act(() => {
      useAppearanceStore.getState().setLayoutMode('compact');
    });

    const { result } = renderHook(() => useTheme());
    expect(result.current.spacing.unit).toBe(3);
    expect(result.current.spacing.xs).toBe(6);
    expect(result.current.spacing.sm).toBe(12);
    expect(result.current.spacing.md).toBe(18);
    expect(result.current.spacing.lg).toBe(30);
    expect(result.current.spacing.xl).toBe(48);
    expect(result.current.spacing.marginMobile).toBe(18);
  });
});
