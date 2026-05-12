import { useMemo } from 'react';
import { useAppearanceStore } from '@/store/appearanceStore';
import { theme as baseTheme } from '@/constants/theme';

type Theme = typeof baseTheme;

export function useTheme(): Theme {
  const {
    surfaceDepth,
    fontScale,
    readingFocus,
    layoutMode,
    visualEffects,
    classicTerminal,
  } = useAppearanceStore();

  return useMemo<Theme>(() => {
    // Deep clone to avoid mutating the base theme
    const colors = { ...baseTheme.colors };
    const spacing = { ...baseTheme.spacing };
    const typography = {
      displayLg: { ...baseTheme.typography.displayLg },
      headlineMd: { ...baseTheme.typography.headlineMd },
      titleSm: { ...baseTheme.typography.titleSm },
      bodyMd: { ...baseTheme.typography.bodyMd },
      labelCaps: { ...baseTheme.typography.labelCaps },
    };
    let roundness = { ...baseTheme.roundness };

    // 1. Tonal Depth — override surface colors
    if (surfaceDepth === 'absolute') {
      colors.surface = '#000000';
      colors.surfaceDim = '#000000';
      colors.background = '#000000';
      colors.surfaceContainerLowest = '#000000';
      colors.surfaceContainerLow = '#0a0a0a';
      colors.surfaceContainer = '#0e0e0e';
      colors.surfaceContainerHigh = '#1a1a1a';
      colors.surfaceContainerHighest = '#242424';
      colors.surfaceBright = '#1a1a1a';
    } else if (surfaceDepth === 'elevated') {
      colors.surface = '#1B1B1B';
      colors.surfaceDim = '#1B1B1B';
      colors.background = '#1B1B1B';
      colors.surfaceContainerLowest = '#141414';
      colors.surfaceContainerLow = '#242424';
      colors.surfaceContainer = '#2a2a2a';
      colors.surfaceContainerHigh = '#333333';
      colors.surfaceContainerHighest = '#3d3d3d';
      colors.surfaceBright = '#3d3d3d';
    }
    // 'zenith' uses base theme — no changes needed

    // 2. Reading Focus — adjust text contrast (only when classicTerminal is off)
    if (readingFocus && !classicTerminal) {
      colors.onSurface = '#ffffff';
      colors.onSurfaceVariant = '#a0a3a4';
    }

    // 3. Layout Mode — compact reduces spacing + roundness
    if (layoutMode === 'compact') {
      spacing.unit = Math.round(4 * 0.5);
      spacing.xs = Math.round(8 * 0.5);
      spacing.sm = Math.round(16 * 0.5);
      spacing.md = Math.round(24 * 0.5);
      spacing.lg = Math.round(40 * 0.5);
      spacing.xl = Math.round(64 * 0.5);
      spacing.marginMobile = Math.round(24 * 0.5);
      roundness = {
        sm: Math.round(4 * 0.75),
        default: Math.round(8 * 0.75),
        md: Math.round(12 * 0.75),
        lg: Math.round(16 * 0.75),
        xl: Math.round(24 * 0.75),
        full: roundness.full, // keep full as 9999
      };
    }

    // 4. Font Scale — multiply typography font sizes AND line heights
    // NOTE: Must scale lineHeight too, otherwise text gets vertically clipped
    // (font grows but container line height stays the same, cutting off descenders)
    if (fontScale !== 1.0) {
      typography.displayLg.fontSize = 40 * fontScale;
      typography.displayLg.lineHeight = Math.round(44 * fontScale);
      typography.headlineMd.fontSize = 24 * fontScale;
      typography.headlineMd.lineHeight = Math.round(28 * fontScale);
      typography.titleSm.fontSize = 18 * fontScale;
      typography.titleSm.lineHeight = Math.round(25 * fontScale);
      typography.bodyMd.fontSize = 16 * fontScale;
      typography.bodyMd.lineHeight = Math.round(25 * fontScale);
      typography.labelCaps.fontSize = 12 * fontScale;
      typography.labelCaps.lineHeight = Math.round(12 * fontScale);
    }

    // 5. Classic Terminal — overrides ALL colors (highest priority, applied last)
    if (classicTerminal) {
      colors.surface = '#050f09';
      colors.surfaceDim = '#050f09';
      colors.surfaceContainerLowest = '#020704';
      colors.surfaceContainerLow = '#0a1a11';
      colors.surfaceContainer = '#0e2216';
      colors.surfaceContainerHigh = '#132b1c';
      colors.surfaceContainerHighest = '#183422';
      colors.surfaceBright = '#183422';
      colors.onSurface = '#10b981';
      colors.onSurfaceVariant = '#34d399';
      colors.outline = '#065f46';
      colors.outlineVariant = '#0d3a28';
      colors.primary = '#10b981';
      colors.onPrimary = '#050f09';
      colors.primaryContainer = '#10b981';
      colors.onPrimaryContainer = '#050f09';
      colors.secondary = '#34d399';
      colors.onSecondary = '#050f09';
      colors.background = '#050f09';
      colors.onBackground = '#10b981';
      colors.error = '#ef4444';
      colors.emerald = '#34d399';
      colors.emeraldMuted = 'rgba(52, 211, 153, 0.2)';
      colors.innerStroke = 'rgba(16, 185, 129, 0.2)';
      colors.surfaceHighlight = 'rgba(16, 185, 129, 0.15)';
      colors.backdrop = 'rgba(5, 15, 9, 0.8)';
    }

    return { colors, spacing, typography, roundness };
  }, [
    surfaceDepth,
    fontScale,
    readingFocus,
    layoutMode,
    visualEffects,
    classicTerminal,
  ]);
}
