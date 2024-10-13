import * as React from 'react';
import {Stack} from '../RootNavigator';
import {ScreenName} from '../../constants/constants.screens';
import HomeScreen from '../../screens/feat_home/HomeScreen';
import {screenNavigationOptions} from '../navigationOptions';
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenNavigationOptions}>
      <Stack.Screen name={ScreenName.Home} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStackNavigator;
