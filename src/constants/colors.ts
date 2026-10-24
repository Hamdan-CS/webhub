export const themeColors = {
  dark: {
    bg: '#0A0F1C',
    surface: '#111827',
    elevated: '#1A2333',
    accent: '#6366F1',
    accentLight: '#818CF8',
    accent2: '#06B6D4',
    accent2Light: '#22D3EE',
    text: '#F1F5F9',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
  },
  light: {
    bg: '#FAFBFC',
    surface: '#FFFFFF',
    elevated: '#F1F4F9',
    accent: '#6366F1',
    accentLight: '#818CF8',
    accent2: '#0EA5E9',
    accent2Light: '#38BDF8',
    text: '#1E293B',
    textSecondary: '#475569',
    textMuted: '#94A3B8',
  },
} as const;

export const legacyColors = {
  primary: '#6366F1',
  secondary: '#06B6D4',
  accent: '#818CF8',
  dark: '#0A0F1C',
  light: '#FAFBFC',
} as const;
