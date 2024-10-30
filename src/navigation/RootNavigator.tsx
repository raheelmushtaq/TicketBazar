import * as React from 'react';
import {useRef} from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ScreenName} from '../constants/constants.screens';
import BottomTabsNavigator from './BottomTabsNavigator';
import useGeneralStore from '../store/useGeneralStore';
import OnBoardingScreen from '../screens/onboarding/OnBoarding';
import SupportScreen from '../screens/support';
import ContactSupportScreen from '../screens/contact_support';
import WebViewScreen from '../screens/WebViewScreen';
import ContactUsScreen from '../screens/contactus';

export const Stack = createNativeStackNavigator();
export const navigationRef =
  React.createRef<NavigationContainerRef<ReactNavigation.RootParamList>>();

const RootNavigator = () => {
  const routeNameRef = useRef<string>();

  const {isOnBoardingViewed} = useGeneralStore();

  const onStateChange = (state: any) => {
    if (__DEV__) {
      const previousRouteName = routeNameRef.current;
      const {name, params} = navigationRef?.current?.getCurrentRoute?.() || {};

      if (previousRouteName !== name) {
        console.log({previousRouteName, name});
      }
      routeNameRef.current = name;
    }
  };

  const onReady = () => {};
  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      onStateChange={onStateChange}>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <>
          {!isOnBoardingViewed ? (
            <Stack.Screen
              name="OnBoarding"
              component={OnBoardingScreen}
              options={{headerShown: false}}
            />
          ) : (
            <>
              <Stack.Screen
                name={ScreenName.BottomTabs}
                options={{headerShown: false}}
                component={BottomTabsNavigator}
              />
              <Stack.Screen
                name={ScreenName.SupportScreen}
                component={SupportScreen}
                options={{headerBackTitle: 'Back', headerShown: true}} // Custom back button label
              />
              <Stack.Screen
                name={ScreenName.ChatSupport}
                component={ContactSupportScreen}
                options={{headerBackTitle: 'Back', headerShown: true}} // Custom back button label
              />
              <Stack.Screen
                name={ScreenName.WebViewScreen}
                component={WebViewScreen}
                options={{headerBackTitle: 'Back', headerShown: true}} // Custom back button label
              />
              <Stack.Screen
                name={ScreenName.ContactUs}
                component={ContactUsScreen}
                options={{headerBackTitle: 'Back', headerShown: true}} // Custom back button label
              />
            </>
          )}
          {/*<Stack.Screen name={screens.VIEW_COMPANIES_SCREEN} component={ViewCompaniesScreen}/>*/}
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
