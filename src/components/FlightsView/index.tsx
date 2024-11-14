import {Image, Text, View} from 'react-native';
import {
  Button,
  colors,
  dimensions,
  Separator,
  typography,
} from '../../../ui-kit';
import TravelInputField from '../TravelInputField';
import TravelClassInputField from '../TravelClassInputField';
import FlightInputField from '../FlightInputField';
import DateInputField from '../DateInputField';
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import ImageButton from '../../../ui-kit/src/components/ImageButton';
import {images} from '../../assets/images';
import {FlightDataItem, FlightType, TravelsData} from '../../types/SearchTypes';

type FlightViewProps = {
  flightData: FlightDataItem;
  mutiFlightData: FlightDataItem[];
  travelData: TravelsData;
  handleFlightFromChange: (text: string) => void;
  handleFlightToChange: (text: string) => void;
  handleFlightDepartDateChange: (date: Date) => void;
  handleFlightReturnDateChange: (date: Date) => void;
  selectedFlightType: FlightType;
  removeDestination: (index: number) => void;
  handleMultiFlightFromChange: (text: string, index: number) => void;
  handleMultiFlightToChange: (text: string, index: number) => void;
  handleMultiFlightsDepartDateChange: (date: Date, index: number) => void;
  addMultiFlightData: () => void;
  setSelectedFlightType: (text: FlightType) => void;
  handleTravelDataChange: (
    adults: number,
    children: number,
    infants: number,
  ) => void;
  handleTravelClassChange: (travelClass: string) => void;
};
const FlightView = ({
  flightData,
  mutiFlightData,
  travelData,
  selectedFlightType,
  handleFlightFromChange,
  handleFlightToChange,
  handleFlightDepartDateChange,
  handleFlightReturnDateChange,
  removeDestination,
  handleMultiFlightFromChange,
  handleMultiFlightToChange,
  handleMultiFlightsDepartDateChange,
  addMultiFlightData,
  setSelectedFlightType,
  handleTravelDataChange,
  handleTravelClassChange,
}: FlightViewProps) => {
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
                onValueSelected={text => handleMultiFlightToChange(text, index)}
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
};

export default FlightView;
