import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, ImageProps, Text} from 'react-native';
import {ScreenName} from '../constants/constants.screens';
import {images} from '../assets/images';
import {colors} from '../../ui-kit';
import SearchScreen from '../screens/search';
import BookingScreen from '../screens/booking';
import SupportScreen from '../screens/support';
import MenuScreen from '../screens/menu';
import {tabBarScreenOptions} from './navigationOptions';

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
        tintColor={focused ? colors.black : colors.inactiveTabColor}
        style={{
          width: 25,
          height: 25,
          resizeMode: 'contain',
        }}
      />
    );
  };

  return (
    <>
      <Tab.Navigator
        screenOptions={tabBarScreenOptions}
        initialRouteName={ScreenName.SearchScreen}>
        <Tab.Screen
          name={ScreenName.SearchScreen}
          component={SearchScreen}
          options={{
            tabBarLabel: ({focused}) => renderTabBarLabel(focused, 'Search'),
            tabBarIcon: ({focused}) =>
              renderTabBarIcon(focused, images.nav_search, images.nav_search),
          }}
        />

        <Tab.Screen
          name={ScreenName.BookingStack}
          component={BookingScreen}
          options={{
            tabBarLabel: ({focused}) => renderTabBarLabel(focused, 'Booking'),
            tabBarIcon: ({focused}) =>
              renderTabBarIcon(focused, images.nav_booking, images.nav_booking),
          }}
        />
        {/* <Tab.Screen
          name={ScreenName.SupportStack}
          component={ d}
          options={{
            tabBarLabel: ({focused}) => renderTabBarLabel(focused, 'Support'),
            tabBarIcon: ({focused}) =>
              renderTabBarIcon(focused, images.nav_support, images.nav_support),
          }}
        /> */}
        <Tab.Screen
          name={ScreenName.MenuScreen}
          component={MenuScreen}
          options={{
            tabBarLabel: ({focused}) => renderTabBarLabel(focused, 'Menu'),
            tabBarIcon: ({focused}) =>
              renderTabBarIcon(focused, images.nav_menu, images.nav_menu),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default BottomTabsNavigator;
