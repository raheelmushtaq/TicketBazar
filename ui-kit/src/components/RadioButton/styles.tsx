import {StyleSheet} from 'react-native';
import {dimensions} from '../../theme/dimensions';
import {colors} from '../../theme/colors';
import {typography} from '../../theme/fonts';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginVertical: dimensions.margin.medium,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: dimensions.margin.small,
  },
  circle: {
    height: 24,
    width: 24,
    borderRadius: dimensions.border.large,
    borderWidth: 2,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: dimensions.margin.small,
  },
  checkedCircle: {
    width: 12,
    height: 12,
    borderRadius: dimensions.border.large,
    backgroundColor: colors.black,
  },
  label: {
    fontSize: typography.fontSizes.md,
    color: colors.black,
  },
});
