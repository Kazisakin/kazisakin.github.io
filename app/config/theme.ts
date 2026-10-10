// ============================================
// THEME SWITCH — code only, there is no toggle in the UI.
// ============================================
// Change THEME, save, and rebuild/redeploy.
//
//   'editorial' → dark, bold, magazine-style design
//   'classic'   → the original clean light design
//
// DARK_MODE only affects the 'classic' theme.

export type ThemeName = 'classic' | 'editorial' | 'krishivet';

// 'krishivet' → Krishivet-style layout in white + blue (light by default, dark via the header switch)
export const THEME: ThemeName = 'krishivet';

export const DARK_MODE = false;
