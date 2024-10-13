import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState} from 'react';
import {ColorValue, Image, ImageProps, Pressable, Text} from 'react-native';
import {Stack} from './RootNavigator';
import {colors} from '../theme/colors';
import {ScreenName} from '../constants/constants.screens';
import {images} from '../theme/images';
import HomeStackNavigator from './bottom_tabs/HomeStackNavigator';

const Tab = createBottomTabNavigator();
type BottomTabTextProps = {
  focused: boolean;
  title: string;
};
const BottomTabText = ({focused, title}: BottomTabTextProps) => {
  return (
    <Text
      style={{
        fontSize: 9,
        fontWeight: focused ? 'bold' : 'normal',
        color: focused ? colors.black : colors.inactiveTabColor,
      }}>
      {title}
    </Text>
  );
};
const BottomTabsNavigator = () => {
  const renderTabBarLabel = (focused: boolean, value: string) => (
    <BottomTabText title={value} focused={focused} />
  );
  const renderTabBarIcon = (
    focused: boolean,
    activeIcon: ImageProps,
    inActiveIcon: ImageProps,
  ) => {
    return (
      <Image
        source={activeIcon}
        style={{
          width: 25,
          height: 25,
          resizeMode: 'contain',
          tintColor: focused ? colors.black : colors.inactiveTabColor,
        }}
      />
    );
  };

  return (
    <>
      <Tab.Navigator initialRouteName={ScreenName.HomeStack}>
        <Tab.Screen
          name={ScreenName.HomeStack}
          component={HomeStackNavigator}
          options={{
            tabBarLabel: ({focused}) => renderTabBarLabel(focused, 'Search'),
            tabBarIcon: ({focused}) =>
              renderTabBarIcon(
                focused,
                images.bottomSearch,
                images.bottomSearch,
              ),
          }}
        />

        <Tab.Screen
          name={ScreenName.BookingStack}
          component={HomeStackNavigator}
          options={{
            tabBarLabel: ({focused}) => renderTabBarLabel(focused, 'Booking'),
            tabBarIcon: ({focused}) =>
              renderTabBarIcon(
                focused,
                images.bottomSearch,
                images.bottomSearch,
              ),
          }}
        />
        <Tab.Screen
          name={ScreenName.OtherStack}
          component={HomeStackNavigator}
          options={{
            tabBarLabel: ({focused}) => renderTabBarLabel(focused, 'Other'),
            tabBarIcon: ({focused}) =>
              renderTabBarIcon(focused, images.bottomOther, images.bottomOther),
          }}
        />
        <Tab.Screen
          name={ScreenName.SettingStack}
          component={HomeStackNavigator}
          options={{
            tabBarLabel: ({focused}) => renderTabBarLabel(focused, 'Settings'),
            tabBarIcon: ({focused}) =>
              renderTabBarIcon(focused, images.bottomOther, images.bottomOther),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabsNavigator;
