import {Platform} from 'react-native';
import {colors} from '../../ui-kit';

export const tabBarStyles = {
  backgroundColor: '#1789C9',
  paddingTop: 15,
  paddingHorizontal: 20,
  height: Platform.OS === 'ios' ? 70 : 55,
  ...Platform.select({
    android: {
      paddingBottom: 5,
      elevation: 8,
      // top: 1,
    },
    ios: {
      shadowColor: colors.black,
      shadowOpacity: 0.6,
      shadowRadius: 20,
      shadowOffset: {
        height: 15,
        width: 15,
      },
    },
  }),
};

export const tabBarLabelStyle = {
  fontSize: 11,
};
