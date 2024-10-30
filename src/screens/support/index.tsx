import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  FlatListProps,
  Image,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import {styles} from './styles';
import {images} from '../../assets/images';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {Button, colors, dimensions, typography} from '../../../ui-kit';
import {getSupportList, SupportListType} from './constants';
import CardView from '../../../ui-kit/src/components/CardView';
import NextActionItem from '../../../ui-kit/src/components/NextActionItem';
import AppBackground from '../../../ui-kit/src/components/RootView/AppBackground';

type SupportScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Support'
>;

type SupportScreenProps = {
  navigation: SupportScreenNavigationProp;
};

const SupportScreen: React.FC<SupportScreenProps> = ({navigation}) => {
  const [data, setData] = useState<SupportListType[]>([]);
  useEffect(() => {
    setData(getSupportList(navigation));
  }, []);

  const renderSupportItem = ({item}: {item: SupportListType}) => (
    <NextActionItem
      title={item.title}
      description={item.contactUs}
      leftIcon={item.icon}
      onPress={item.onPress}
    />
  );

  return (
    <AppBackground navigation={navigation} title="Support">
      <Text
        style={{
          fontSize: typography.fontSizes.xxl,
          marginBottom: dimensions.margin.medium,
          color: colors.black,
        }}>
        Contact Us
      </Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        style={{paddingHorizontal: dimensions.margin.smallest}}
        renderItem={renderSupportItem}
      />
    </AppBackground>
  );
};
export default SupportScreen;
