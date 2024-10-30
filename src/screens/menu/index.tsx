import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Image, Text, View} from 'react-native';
import {styles} from './styles';
import {images} from '../../assets/images';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {colors, dimensions, typography} from '../../../ui-kit';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getMenuData, MenuItemType} from './constants';
import NextActionItem from '../../../ui-kit/src/components/NextActionItem';
import AppBackground from '../../../ui-kit/src/components/RootView/AppBackground';

type MenuScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Menu'>;

type MenuScreenProps = {
  navigation: MenuScreenNavigationProp;
};

const MenuScreen: React.FC<MenuScreenProps> = ({navigation}) => {
  const [data, setData] = useState<MenuItemType[]>([]);
  useEffect(() => {
    setData(getMenuData(navigation));
  }, []);

  const renderSupportItem = ({item}: {item: MenuItemType}) => (
    <NextActionItem
      title={item.title}
      leftIcon={item.icon}
      onPress={item.onPress}
    />
  );

  return (
    <AppBackground navigation={navigation} title="Menu">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        style={{paddingHorizontal: dimensions.margin.smallest}}
        renderItem={renderSupportItem}
      />
    </AppBackground>
  );
};
export default MenuScreen;
