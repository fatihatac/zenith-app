import { theme } from '../constants/theme';

/**
 * Merkezi temadan renk çekmek için kullanılır.
 * "Monochrome Zen" yapısına uygun olarak theme.colors'tan beslenir.
 */
export function useThemeColor(colorName: keyof typeof theme.colors) {
  return theme.colors[colorName];
}