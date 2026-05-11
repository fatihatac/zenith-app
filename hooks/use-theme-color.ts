import { theme } from '@/constants/theme';

/**
 * Merkezi temadan renk çekmek için kullanılır.
 * "Monochrome Zen" yapısına uygun olarak theme.colors'tan beslenir.
 *
 * @deprecated Use `theme.colors[colorName]` directly from `@/constants/theme` instead.
 */
export function useThemeColor(colorName: keyof typeof theme.colors) {
  return theme.colors[colorName];
}