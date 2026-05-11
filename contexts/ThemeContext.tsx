import { createContext, useContext, ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';
import { theme as baseTheme } from '@/constants/theme';

type Theme = typeof baseTheme;

const ThemeContext = createContext<Theme>(baseTheme);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useThemeContext(): Theme {
  return useContext(ThemeContext);
}
