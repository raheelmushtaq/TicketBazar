// import {TransitionPresets} from '@react-navigation/native-stack';

import {colors} from '../../ui-kit';
import {tabBarLabelStyle, tabBarStyles} from './navigationStyles';
import {Platform} from 'react-native';

export const rootNavigationOptions = {
  headerShown: false,
};

export const tabBarScreenOptions = {
  headerShown: true,
  backgroundColor: '#ffffff',
  tabBarInactiveTintColor: colors.inactiveTabColor,
  tabBarActiveTintColor: colors.white,
  tabBarLabelStyle: tabBarLabelStyle,
  tabBarStyle: tabBarStyles,
  tabBarHideOnKeyboard: true,
};

export const tabCenterIconStyles = {
  // position: 'absolute',
  bottom: 40,
  height: 50,
  width: 50,
  borderRadius: 50,
  marginHorizontal: 20,
  justifyContent: 'center',
  alignItems: 'center',
  ...Platform.select({
    android: {
      elevation: 3,
    },
    ios: {
      shadowColor: colors.black,
      shadowOpacity: 0.2,
      shadowRadius: 10,
      shadowOffset: {
        height: 10,
        width: 0,
      },
    },
  }),
};
export const screenNavigationOptions = {
  headerShown: false,
};
