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
import OnBoardingScreen from '../screens/feat_onboarding/OnBoarding';

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
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <>
          {!isOnBoardingViewed ? (
            <Stack.Screen name="OnBoarding" component={OnBoardingScreen} />
          ) : (
            <Stack.Screen
              name={ScreenName.BottomTabs}
              component={BottomTabsNavigator}
            />
          )}
          {/*<Stack.Screen name={screens.VIEW_COMPANIES_SCREEN} component={ViewCompaniesScreen}/>*/}
        </>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
