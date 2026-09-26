// ============================================
// THEME SWITCH — code only, there is no toggle in the UI.
// ============================================
// Change THEME, save, and rebuild/redeploy.
//
//   'editorial' → dark, bold, magazine-style design
//   'classic'   → the original clean light design
//
// DARK_MODE only affects the 'classic' theme.

export type ThemeName = 'classic' | 'editorial';

export const THEME: ThemeName = 'editorial';

export const DARK_MODE = false;
