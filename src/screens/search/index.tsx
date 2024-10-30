import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator, Image, Keyboard, Text, View} from 'react-native';
import {styles} from './styles';
import {images} from '../../assets/images';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {
  Button,
  colors,
  dimensions,
  Separator,
  typography,
} from '../../../ui-kit';
import AppBackground from '../../../ui-kit/src/components/RootView/AppBackground';
import InputField from '../../../ui-kit/src/components/InputField';
import CardView from '../../../ui-kit/src/components/CardView';
import TabItem from '../../../ui-kit/src/components/TabItem';
import ImageButton from '../../../ui-kit/src/components/ImageButton';

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};

type TabType = 'flight' | 'bus' | 'visa';
type FlightType = 'one' | 'two' | 'any';

const SearchScreen: React.FC<SearchScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');

  const [emailError, setEmailError] = useState('');
  const [orderIdError, setOrderIdError] = useState('');

  const [selectedTab, setSelectedTab] = useState<TabType>('flight');

  const [selectedFlightType, setSelectedFlightType] =
    useState<FlightType>('one');
  const handleEmaiChange = (text: string) => {
    if (emailError) setEmailError('');
    setEmail(text);
  };
  const handleOrderIdChange = (text: string) => {
    if (orderIdError) setOrderIdError('');
    setOrderId(text);
  };

  const renderTabView = () => {
    return (
      <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
        <TabItem
          selected={selectedTab === 'flight'}
          icon={images.call}
          title="Flight"
          selectOrUnSelectItem={selected => {
            setSelectedTab('flight');
          }}
        />
        <TabItem
          selected={selectedTab === 'bus'}
          icon={images.call}
          title="Buses"
          selectOrUnSelectItem={selected => {
            setSelectedTab('bus');
          }}
        />
        <TabItem
          selected={selectedTab === 'visa'}
          icon={images.call}
          title="Visa"
          selectOrUnSelectItem={selected => {
            setSelectedTab('visa');
          }}
        />
      </View>
    );
  };

  const renderFLightView = () => {
    if (selectedTab === 'flight')
      return (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: dimensions.margin.medium,
          }}>
          <Button
            type={selectedFlightType === 'one' ? 'primary' : 'secondary'}
            title="One Way"
            onPress={() => {
              setSelectedFlightType('one');
            }}
          />
          <Separator
            showTransparent
            showVertical={false}
            width={dimensions.margin.small}
          />
          <Button
            type={selectedFlightType === 'two' ? 'primary' : 'secondary'}
            title="Return"
            onPress={() => {
              setSelectedFlightType('two');
            }}
          />

          <Separator
            showTransparent
            showVertical={false}
            width={dimensions.margin.small}
          />
          <Button
            type={selectedFlightType === 'any' ? 'primary' : 'secondary'}
            title="Multi City"
            onPress={() => {
              setSelectedFlightType('any');
            }}
          />
        </View>
      );
    return null;
  };
  return (
    <AppBackground navigation={navigation} title="Search">
      <Image
        source={images.search_bg}
        resizeMode={'cover'}
        style={{
          height: '50%',
          zIndex: -999,
          position: 'absolute',
          left: -100,
          width: '150%',
          backgroundColor: colors.black,
        }}
      />
      <CardView containerStyle={{marginTop: dimensions.margin.xLarge}}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: typography.fontSizes.lg,
              color: colors.textPrimary,
              marginBottom: dimensions.margin.large,
            }}>
            Travel Booking Made Easy
          </Text>
          {renderTabView()}
          {renderFLightView()}
          <InputField
            error={orderIdError}
            value={orderId}
            label="Order Id"
            placeholder="Order Id"
            blurOnSubmit={false}
            onChangeText={handleOrderIdChange}
            onSubmitEditing={Keyboard.dismiss}
          />

          <Text
            style={{
              fontSize: typography.fontSizes.sm,
              marginBottom: dimensions.margin.medium,
            }}>
            Your Order Id is emailed with the booking confirmation.
          </Text>

          <InputField
            error={emailError}
            label="Email"
            placeholder="Email"
            value={email}
            blurOnSubmit={false}
            onChangeText={handleEmaiChange}
            onSubmitEditing={Keyboard.dismiss}
          />

          <Text
            style={{
              fontSize: typography.fontSizes.sm,
              marginBottom: dimensions.margin.xLarge,
            }}>
            The email address entered during booking.
          </Text>
          <Button title="Search" onPress={() => {}} type={'primary'} />
        </View>
      </CardView>
    </AppBackground>
  );
};
export default SearchScreen;
