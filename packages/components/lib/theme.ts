export const colors = {
  bg: '#0A0A0A',
  bgElevated: '#121212',
  bgSubtle: '#1A1A1A',
  bgHover: '#222222',

  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textTertiary: '#666666',

  accent: '#6366F1',
  accentLight: '#1E1B4B',
  accentMuted: '#2D2A5E',

  border: '#2A2A2A',
  borderStrong: '#333333',

  success: '#22C55E',
  successLight: '#052E16',
  warning: '#F59E0B',
  warningLight: '#451A03',
  error: '#EF4444',
  errorLight: '#450A0A',
  info: '#3B82F6',
  infoLight: '#0C1929',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export const spacing = {
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
} as const;

export const radius = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

export const typography = {
  displayXl: { fontSize: 32, lineHeight: 38, fontWeight: '700' },
  displayLg: { fontSize: 26, lineHeight: 32, fontWeight: '700' },
  headingXl: { fontSize: 22, lineHeight: 28, fontWeight: '700' },
  headingLg: { fontSize: 20, lineHeight: 26, fontWeight: '600' },
  headingMd: { fontSize: 17, lineHeight: 23, fontWeight: '600' },
  headingSm: { fontSize: 15, lineHeight: 21, fontWeight: '600' },
  bodyLg: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodyMd: { fontSize: 14, lineHeight: 20, fontWeight: '400' },
  bodySm: { fontSize: 12, lineHeight: 17, fontWeight: '400' },
  label: { fontSize: 11, lineHeight: 15, fontWeight: '600' },
  priceMain: { fontSize: 18, lineHeight: 24, fontWeight: '700' },
  priceLg: { fontSize: 22, lineHeight: 28, fontWeight: '800' },
  priceStruck: { fontSize: 14, lineHeight: 18, fontWeight: '400' },
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 8,
  },
  glow: {
    shadowColor: '#6366F1',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 4,
  },
} as const;
