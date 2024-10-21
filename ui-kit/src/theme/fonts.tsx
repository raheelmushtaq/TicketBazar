import {colors} from './colors';

// Typography
export const typography = {
  // Font sizes
  fontSizes: {
    xs: 12, // Extra small font size
    sm: 14, // Small font size
    md: 16, // Medium font size (default body text)
    lg: 18, // Large font size
    xl: 24, // Extra large font size
    xxl: 32, // Extra extra large font size (used for big titles)
  },

  // Text styles
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  h3: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  body1: {
    fontSize: 16,
    color: colors.textPrimary,
  },
  body2: {
    fontSize: 14,
    color: colors.textPrimary,
  },
  caption: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textSecondary,
  },
};
