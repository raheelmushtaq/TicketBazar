import {Platform, StyleSheet} from 'react-native';
import {colors} from './colors';

export const GlobalStyle = StyleSheet.create({
  viewShadow: {
    ...Platform.select({
      android: {
        elevation: 3,
      },
      ios: {
        shadowColor: colors.black,
        shadowOpacity: 0.15,
        shadowRadius: 1,
        shadowOffset: {
          height: 2,
          width: 0,
        },
      },
    }),
  },
  buttonShadow: {},
});
