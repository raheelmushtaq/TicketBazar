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
    const renderOne2FlightView = () => {
      return (
        <>
          <FlightInputField
            error={flightData.fromError}
            label="From"
            placeholder="Flying From (City or Airport)"
            value={flightData.from}
            onValueSelected={handleFlightFromChange}
          />
          <FlightInputField
            error={flightData.toError}
            label="To"
            placeholder="Flying To (City or Airport)"
            value={flightData.to}
            onValueSelected={handleFlightToChange}
          />

          <DateInputField
            error={flightData.departDateError}
            label="Departing"
            placeholder="Date to Depart"
            value={flightData.departDate}
            onValueSelected={handleFlightDepartDateChange}
          />
          {selectedFlightType === 'two' && (
            <DateInputField
              error={flightData.returnDateError}
              label="Returning"
              placeholder="Date to Return"
              value={flightData.returnDate || new Date()}
              onValueSelected={handleFlightReturnDateChange}
            />
          )}
        </>
      );
    };
    const renderMultiFlightView = () => {
      return (
        <>
          {mutiFlightData.map((item, index) => {
            return (
              <>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: dimensions.margin.large,
                  }}>
                  <Text
                    style={{
                      fontSize: typography.fontSizes.md,
                      color: colors.black,
                      flex: 1,
                    }}>
                    Flight {index + 1}
                  </Text>

                  {index >= 2 && (
                    <TouchableComponent
                      containerStyle={{padding: dimensions.padding.small}}
                      onPress={() => {
                        removeDestination(index);
                      }}>
                      <Image
                        style={{height: 16, width: 16, resizeMode: 'contain'}}
                        source={images.trash}
                      />
                    </TouchableComponent>
                  )}
                </View>
                <FlightInputField
                  error={item.fromError}
                  value={item.from}
                  label="From"
                  placeholder="Flying From (City or Airport)"
                  onValueSelected={text =>
                    handleMultiFlightFromChange(text, index)
                  }
                />
                <FlightInputField
                  error={item.toError}
                  label="To"
                  placeholder="Flying To (City or Airport)"
                  value={item.to}
                  onValueSelected={text =>
                    handleMultiFlightToChange(text, index)
                  }
                />

                <DateInputField
                  error={item.departDateError}
                  label="Departing"
                  placeholder="Date to Depart"
                  value={item.departDate}
                  onValueSelected={date =>
                    handleMultiFlightsDepartDateChange(date, index)
                  }
                />
              </>
            );
          })}
          {mutiFlightData.length <= 4 && (
            <ImageButton
              containerStyle={{
                marginTop: dimensions.margin.medium,
                width: '50%',
              }}
              iconLocation={'left'}
              onPress={addMultiFlightData}
              type={'primary'}
              icon={images.plus}
              title="Add Destintation"
            />
          )}
          <Separator showTransparent={true} showVertical={true} height={20} />
        </>
      );
    };
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

          {selectedFlightType === 'any' && renderMultiFlightView()}
          {selectedFlightType !== 'any' && renderOne2FlightView()}

          <TravelInputField
            error={travelData.error}
            label="Travlers"
            placeholder="No of People Travelling"
            adults={travelData.adult}
            infants={travelData.infants}
            children={travelData.children}
            onValueSelected={handleTravelDataChange}
          />
          <TravelClassInputField
            onValueSelected={handleTravelClassChange}
            error={travelData.classError}
            label="Class"
            placeholder="Class for Flight"
            value={travelData.travelClass}
          />
        </View>
      );
    return null;
  };
  const renderBusView = () => {
    if (selectedTab === 'bus')
      return (
        <View style={{marginVertical: dimensions.margin.medium}}>
          <BusInputField
            error={busData.fromError}
            value={busData.from}
            label="From"
            placeholder="Leaving From (City)"
            onValueSelected={handleBusFromChange}
          />
          <BusInputField
            error={busData.toError}
            value={busData.to}
            label="To"
            placeholder="Leaving To (City)"
            onValueSelected={handleBusToChange}
          />

          <DateInputField
            error={busData.departDateError}
            label="Date"
            placeholder="Date"
            value={busData.departDate}
            onValueSelected={handleBusDepartDateChange}
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
            value={'Pakistani'}
            label="Nationaliy"
            placeholder="Pakistani"
            editable={false}
            blurOnSubmit={false}
            onPress={() => {}}
            onChangeText={() => {}}
          />
          <VisaInputField
            error={visaData.visaError}
            label="Visa"
            placeholder="Visa for?"
            value={visaData.visa}
            onValueSelected={handleVisaChange}
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
