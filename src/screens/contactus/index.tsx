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
import {getContactUsData, ContactUsDataType} from './constants';
import CardView from '../../../ui-kit/src/components/CardView';
import NextActionItem from '../../../ui-kit/src/components/NextActionItem';
import ImageButton from '../../../ui-kit/src/components/ImageButton';
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import AppBackground from '../../../ui-kit/src/components/RootView/AppBackground';

type ContactUsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContactUs'
>;

type ContactUsScreenProps = {
  navigation: ContactUsScreenNavigationProp;
};

const ContactUsScreen: React.FC<ContactUsScreenProps> = ({navigation}) => {
  const [data, setData] = useState<ContactUsDataType[]>([]);
  useEffect(() => {
    setData(getContactUsData(navigation));
  }, []);
  const renderSupportItem = ({item}: {item: ContactUsDataType}) => (
    <CardView>
      <View style={{width: '100%'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: dimensions.margin.smallest,
          }}>
          {item.icon && (
            <Image
              source={item.icon}
              style={{
                height: 15,
                width: 15,
                marginRight: dimensions.margin.medium,
              }}
              tintColor={colors.black}
              resizeMode={'contain'}
            />
          )}
          <Text
            style={{
              fontSize: typography.fontSizes.md,
              color: colors.primary,
              fontWeight: 'bold',
            }}>
            {item.title}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: dimensions.margin.medium,
          }}>
          {item.items.map(child => {
            if (child.type === 'image') {
              return (
                <ImageButton
                  containerStyle={{marginEnd: dimensions.margin.medium}}
                  onPress={child.onPress}
                  iconLocation={'left'}
                  icon={child.icon}
                  type={'secondary'}
                />
              );
            } else {
              return (
                <ImageButton
                  containerStyle={{marginEnd: dimensions.margin.medium}}
                  onPress={child.onPress}
                  iconLocation={'left'}
                  icon={child.icon}
                  title={child.title}
                  type={'secondary'}
                />
              );
            }
          })}
        </View>
      </View>
    </CardView>
  );
  return (
    <AppBackground navigation={navigation} title={'Contact Us'}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={data}
        style={{paddingHorizontal: dimensions.margin.smallest}}
        renderItem={renderSupportItem}
      />
    </AppBackground>
  );
};
export default ContactUsScreen;
