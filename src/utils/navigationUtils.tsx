import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/RootStackParamList';
import {ScreenName} from '../constants/constants.screens';
import {StackActions} from '@react-navigation/native';
import {navigationRef} from '../navigation/RootNavigator';

export const navigateToSupport = (
  navigation: StackNavigationProp<RootStackParamList>,
) => {
  navigation.navigate(ScreenName.SupportScreen);
};

export const navigateToContactUs = (
  navigation: StackNavigationProp<RootStackParamList>,
) => {
  navigation.navigate(ScreenName.ContactUs);
};

export const navigateToContactSupport = (
  navigation: StackNavigationProp<RootStackParamList>,
) => {
  navigation.navigate(ScreenName.ChatSupport);
};

export const navigateToProfile = (
  navigation: StackNavigationProp<RootStackParamList>,
) => {
  navigation.navigate(ScreenName.ProfileScreen);
};

export const navigateToWebView = (
  navigation: StackNavigationProp<RootStackParamList>,
  title: string,
  url: string,
) => {
  const params = {
    title: title,
    url: url,
  };

  navigation.navigate(ScreenName.WebViewScreen, params);
};

export function navigateTo(name: string, params: object = {}) {
  navigationRef?.current?.navigate(name, params);
}

export function pushScreen(name: string, params: object = {}) {
  navigationRef?.current?.dispatch(StackActions.push(name, params));
}

export function goBack() {
  navigationRef.current?.goBack?.();
}
