import {FlatList, Image, Pressable, Text, View, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Modal from 'react-native-modal';
import {colors, dimensions} from '../../../ui-kit';
import NoDataComponent from '../../../ui-kit/src/components/NoDataComponent';
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import InputField from '../../../ui-kit/src/components/InputField';
import SearchBar from '../../../ui-kit/src/components/SearchBarComponent';
import {images} from '../../../ui-kit/src/assets/images';
import DatePickerModal from '../DatePickerModal';

type DateInputFieldProps = {
  value: Date;
  label: string;
  error?: string;
  onValueSelected: (text: Date) => void;
  placeholder: string;
};
const DateInputField = ({
  value,
  label,
  error,
  onValueSelected,
  placeholder,
}: DateInputFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [date, setDate] = useState<Date | undefined>(value);

  useEffect(() => {
    setDate(value);
  }, [value]);

  const onClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      setDate(undefined);
    }
  }, [isVisible]);

  const renderDateInputField = () => {
    return (
      <DatePickerModal
        title={label}
        defaultDate={value}
        onCanceled={() => {}}
        onDateSelected={date => {
          setDate(date);
          onValueSelected(date);
          onClose();
        }}
        minimumDate={new Date()}
        isVisible={isVisible}
      />
    );
  };
  return (
    <View>
      <InputField
        error={error}
        value={value.toString()}
        label={label}
        placeholder={placeholder}
        editable={false}
        blurOnSubmit={false}
        onPress={() => {
          setIsVisible(true);
        }}
        onChangeText={() => {}}
      />
      {renderDateInputField()}
    </View>
  );
};

export default DateInputField;
