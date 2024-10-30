import {Dimensions} from 'react-native';

export const dimensions = {
  screenPadding: 8,

  padding: {
    smallest: 4,
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
  margin: {
    smallest: 4,
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
  border: {
    small: 4,
    medium: 8,
    large: 16,
    xLarge: 24,
  },

  SCREEN_HEIGHT: Dimensions.get('window').height,
  SCREEN_WIDTH: Dimensions.get('window').width,
  icon: {
    smallest: 8,
    small: 16,
    medium: 24,
    large: 32,
    XLarge: 48,
  },
};
