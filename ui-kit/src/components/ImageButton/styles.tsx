import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {dimensions} from '../../theme/dimensions';
import {typography} from '../../theme/fonts';
const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: dimensions.padding.small,
    paddingVertical: dimensions.padding.medium,
    borderWidth: 1,
    borderRadius: dimensions.border.medium,
  },
  defaultText: {
    fontSize: typography.fontSizes.md,
    fontWeight: '500',
    lineHeight: 24,
  },
  secondaryButton: {
    backgroundColor: colors.secondary,
    borderColor: colors.border,
  },
  secondaryText: {
    color: colors.textOnSecondary,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  primaryText: {
    color: colors.textOnPrimary,
  },
  dangerButton: {
    backgroundColor: colors.error,
    borderColor: colors.error,
  },
  dangerText: {
    color: colors.textOnError,
  },
  disabledButton: {
    backgroundColor: colors.disabled,
    borderColor: colors.disabled,
  },
  disabledText: {
    color: colors.textOnDisabled,
  },
});

export default styles;
