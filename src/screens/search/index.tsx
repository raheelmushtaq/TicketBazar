import React, {useEffect, useLayoutEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Keyboard,
  ScrollView,
  Text,
  View,
} from 'react-native';
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
import useController from './controller';

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};

const SearchScreen: React.FC<SearchScreenProps> = ({navigation}) => {
  const {
    email,
    emailError,
    orderIdError,
    handleEmaiChange,
    orderId,
    handleOrderIdChange,
    setSelectedTab,
    selectedFlightType,
    selectedTab,
    setSelectedFlightType,
  } = useController();
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

  const renderFlightView = () => {
    if (selectedTab === 'flight')
      return (
        <View style={{marginVertical: dimensions.margin.medium}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <Button
              type={selectedFlightType === 'one' ? 'primary' : 'secondary'}
              title="One Way"
              buttonStyle={{paddingVertical: dimensions.padding.small}}
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
              buttonStyle={{paddingVertical: dimensions.padding.small}}
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
              buttonStyle={{paddingVertical: dimensions.padding.small}}
              onPress={() => {
                setSelectedFlightType('any');
              }}
            />
          </View>
          <InputField
            error={orderIdError}
            value={orderId}
            label="From"
            placeholder="Flying From (City or Airport)"
            editable={false}
            blurOnSubmit={false}
            onPress={() => {}}
            onChangeText={handleOrderIdChange}
          />
          <InputField
            error={emailError}
            label="To"
            placeholder="Flying To (City or Airport)"
            value={email}
            editable={false}
            blurOnSubmit={false}
            onChangeText={handleEmaiChange}
            onSubmitEditing={Keyboard.dismiss}
          />

          <InputField
            error={emailError}
            editable={false}
            label="Departing"
            placeholder="Date to Depart"
            value={email}
            blurOnSubmit={false}
            onChangeText={handleEmaiChange}
            onSubmitEditing={Keyboard.dismiss}
          />
          {selectedFlightType === 'two' && (
            <InputField
              error={emailError}
              label="Returning"
              placeholder="Date to Return"
              value={email}
              editable={false}
              blurOnSubmit={false}
              onChangeText={handleEmaiChange}
              onSubmitEditing={Keyboard.dismiss}
            />
          )}
          <InputField
            error={emailError}
            label="Travlers"
            placeholder="No of People Travelling"
            value={email}
            editable={false}
            blurOnSubmit={false}
            onChangeText={handleEmaiChange}
            onSubmitEditing={Keyboard.dismiss}
          />
          <InputField
            error={emailError}
            label="Class"
            placeholder="Class for Flight"
            value={email}
            blurOnSubmit={false}
            editable={false}
            onChangeText={handleEmaiChange}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
      );
    return null;
  };
  const renderBusView = () => {
    if (selectedTab === 'bus')
      return (
        <View style={{marginVertical: dimensions.margin.medium}}>
          <InputField
            error={orderIdError}
            value={orderId}
            label="From"
            placeholder="Leaving From (City)"
            editable={false}
            blurOnSubmit={false}
            onPress={() => {}}
            onChangeText={handleOrderIdChange}
          />
          <InputField
            error={emailError}
            label="To"
            placeholder="Leaving To (City)"
            value={email}
            editable={false}
            blurOnSubmit={false}
            onChangeText={handleEmaiChange}
            onSubmitEditing={Keyboard.dismiss}
          />

          <InputField
            error={emailError}
            label="Date"
            placeholder="Date"
            value={email}
            blurOnSubmit={false}
            onChangeText={handleEmaiChange}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
      );
    return null;
  };
  const renderVisaView = () => {
    if (selectedTab === 'visa')
      return (
        <View style={{marginVertical: dimensions.margin.medium}}>
          <InputField
            error={orderIdError}
            value={'Pakistani'}
            label="Nationaliy"
            placeholder="Pakistani"
            editable={false}
            blurOnSubmit={false}
            onPress={() => {}}
            onChangeText={handleOrderIdChange}
          />
          <InputField
            error={emailError}
            label="Visa"
            placeholder="Visa for?"
            value={email}
            editable={false}
            blurOnSubmit={false}
            onChangeText={handleEmaiChange}
            onSubmitEditing={Keyboard.dismiss}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode={'on-drag'}>
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
            {renderFlightView()}
            {renderBusView()}
            {renderVisaView()}

            <Button title="Search" onPress={() => {}} type={'primary'} />
          </View>
        </CardView>
      </ScrollView>
    </AppBackground>
  );
};
export default SearchScreen;
