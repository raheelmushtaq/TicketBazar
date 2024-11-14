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
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import FlightInputField from '../../components/FlightInputField';
import DateInputField from '../../components/DateInputField';
import TravelInputField from '../../components/TravelInputField';
import TravelClassInputField from '../../components/TravelClassInputField';
import BusInputField from '../../components/BusInputField';
import VisaInputField from '../../components/VisaInputField';
import FlightView from '../../components/FlightsView';
import {FlightType} from '../../types/SearchTypes';
import BusView from '../../components/BusView';
import VisaView from '../../components/VisaView';

type SearchScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Search'
>;

type SearchScreenProps = {
  navigation: SearchScreenNavigationProp;
};

const SearchScreen: React.FC<SearchScreenProps> = ({navigation}) => {
  const {
    flightData,
    busData,
    visaData,
    travelData,
    mutiFlightData,
    setSelectedTab,
    selectedFlightType,
    selectedTab,
    setSelectedFlightType,
    addMultiFlightData,
    removeDestination,
    handleFlightDepartDateChange,
    handleFlightFromChange,
    handleFlightReturnDateChange,
    handleFlightToChange,
    handleTravelClassChange,
    handleTravelDataChange,
    handleVisaChange,
    handleBusDepartDateChange,
    handleBusFromChange,
    handleBusToChange,
    handleMultiFlightFromChange,
    handleMultiFlightToChange,
    handleMultiFlightsDepartDateChange,
    moveToSearchListScreen,
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
        <FlightView
          flightData={flightData}
          mutiFlightData={mutiFlightData}
          travelData={travelData}
          handleFlightDepartDateChange={handleFlightDepartDateChange}
          handleFlightFromChange={handleFlightFromChange}
          handleFlightReturnDateChange={handleFlightReturnDateChange}
          handleFlightToChange={handleFlightToChange}
          selectedFlightType={selectedFlightType}
          setSelectedFlightType={(text: FlightType) => {
            setSelectedFlightType(text);
          }}
          handleMultiFlightFromChange={handleMultiFlightFromChange}
          handleMultiFlightToChange={handleMultiFlightToChange}
          handleMultiFlightsDepartDateChange={
            handleMultiFlightsDepartDateChange
          }
          handleTravelClassChange={handleTravelClassChange}
          handleTravelDataChange={handleTravelDataChange}
          removeDestination={removeDestination}
          addMultiFlightData={addMultiFlightData}
        />
      );
    return null;
  };
  const renderBusView = () => {
    if (selectedTab === 'bus')
      return (
        <BusView
          busData={busData}
          handleBusDepartDateChange={handleBusDepartDateChange}
          handleBusFromChange={handleBusFromChange}
          handleBusToChange={handleBusToChange}
        />
      );
    return null;
  };
  const renderVisaView = () => {
    if (selectedTab === 'visa')
      return (
        <VisaView visaData={visaData} handleVisaChange={handleVisaChange} />
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

            <Button
              title="Search"
              onPress={() => {
                moveToSearchListScreen();
              }}
              type={'primary'}
            />
          </View>
        </CardView>
      </ScrollView>
    </AppBackground>
  );
};
export default SearchScreen;
