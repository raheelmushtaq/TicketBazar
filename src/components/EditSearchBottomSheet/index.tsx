import React, {useEffect, useState} from 'react';
import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import AppStrings from '../../constants/constants.strings';
import {images} from '../../assets/images';
import {
  BottomSheetDialog,
  Button,
  colors,
  dimensions,
  Separator,
} from '../../../ui-kit';
import CountryCodePicker from '../../../ui-kit/src/components/CountryCodePicker';
import InputField from '../../../ui-kit/src/components/InputField';
import VerifyPinBottomSheet from '../VerifyPinBottomSheet';
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import useUserStore from '../../store/useUserStore';
import useController from './controller';
import TabItem from '../../../ui-kit/src/components/TabItem';
import FlightInputField from '../FlightInputField';
import DateInputField from '../DateInputField';
import ImageButton from '../../../ui-kit/src/components/ImageButton';
import TravelInputField from '../TravelInputField';
import TravelClassInputField from '../TravelClassInputField';
import BusInputField from '../BusInputField';
import BusView from '../BusView';
import FlightView from '../FlightsView';
import {FlightType} from '../../types/SearchTypes';
import VisaInputField from '../VisaInputField';
import VisaView from '../VisaView';

type EditSearchBottomSheetProps = {
  isVisible: boolean;
  closeModal: () => void;
  onSavePressed: () => void;
};
const EditSearchBottomSheet = ({
  isVisible,
  closeModal,
  onSavePressed,
}: EditSearchBottomSheetProps) => {
  const {} = useController();

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
    saveFlightData,
  } = useController();

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
  const renderModalContent = () => (
    <>
      {renderBusView()}
      {renderFlightView()}
      {renderVisaView()}

      <Button
        title="Save"
        onPress={() => {
          saveFlightData(onSavePressed);
        }}
        type={'primary'}
      />
    </>
  );

  return (
    <BottomSheetDialog
      isVisible={isVisible}
      showCrossIcon={true}
      showTopBar={false}
      closeModal={closeModal}
      onBackDropPress={() => {}}>
      {renderModalContent()}
    </BottomSheetDialog>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default EditSearchBottomSheet;
