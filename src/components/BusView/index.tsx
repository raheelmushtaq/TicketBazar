import React from 'react';
import {View} from 'react-native';
import BusInputField from '../BusInputField';
import {dimensions} from '../../../ui-kit';
import DateInputField from '../DateInputField';
import {BusDataItem} from '../../types/SearchTypes';

type BusViewProps = {
  busData: BusDataItem;
  handleBusFromChange: (text: string) => void;
  handleBusToChange: (text: string) => void;
  handleBusDepartDateChange: (date: Date) => void;
};
const BusView = ({
  busData,
  handleBusDepartDateChange,
  handleBusFromChange,
  handleBusToChange,
}: BusViewProps) => {
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
};

export default BusView;
