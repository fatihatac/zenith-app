import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();

export const theme = {
  colors: {
    surface: '#131313',
    surfaceDim: '#131313',
    surfaceBright: '#393939',
    surfaceContainerLowest: '#0e0e0e',
    surfaceContainerLow: '#1b1b1b',
    surfaceContainer: '#1f1f1f',
    surfaceContainerHigh: '#2a2a2a',
    surfaceContainerHighest: '#353535',
    onSurface: '#e2e2e2',
    onSurfaceVariant: '#c4c7c8',
    outline: '#8e9192',
    outlineVariant: '#444748',
    primary: '#ffffff',
    onPrimary: '#2f3131',
    primaryContainer: '#e2e2e2',
    onPrimaryContainer: '#636565',
    secondary: '#c8c6c5',
    onSecondary: '#313030',
    error: '#ffb4ab',
    background: '#131313',
    onBackground: '#e2e2e2',
    emerald: '#10b981',
    innerStroke: 'rgba(255, 255, 255, 0.05)',
    backdrop: 'rgba(0, 0, 0, 0.4)',
  },
  spacing: {
    unit: 4,
    xs: 8,
    sm: 16,
    md: 24,
    lg: 40,
    xl: 64,
    marginMobile: 24,
  },
  typography: {
    displayLg: {
      fontSize: 40 * fontScale,
      fontWeight: '600' as const,
      lineHeight: 44,
      letterSpacing: -0.8,
    },
    headlineMd: {
      fontSize: 24 * fontScale,
      fontWeight: '500' as const,
      lineHeight: 28,
      letterSpacing: -0.24,
    },
    titleSm: {
      fontSize: 18 * fontScale,
      fontWeight: '500' as const,
      lineHeight: 25,
      letterSpacing: 0,
    },
    bodyMd: {
      fontSize: 16 * fontScale,
      fontWeight: '400' as const,
      lineHeight: 25,
      letterSpacing: 0.16,
    },
    labelCaps: {
      fontSize: 12 * fontScale,
      fontWeight: '600' as const,
      lineHeight: 12,
      letterSpacing: 0.96,
    },
  },
  roundness: {
    sm: 4,
    default: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 9999,
  }
};