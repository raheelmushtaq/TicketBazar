import React, {useEffect, useState} from 'react';
import DatePicker, {DatePickerProps} from 'react-native-date-picker';

type DatePickerModalProp = {
  title: string;
  isVisible: boolean;
  defaultDate: Date;
  maximumDate?: Date;
  minimumDate?: Date;
  onDateSelected: (date: Date) => void;
  onCanceled: () => void;
};
const DatePickerModal = ({
  title,
  isVisible,
  defaultDate,
  maximumDate,
  minimumDate,
  onDateSelected,
  onCanceled,
}: DatePickerModalProp) => {
  if (isVisible)
    return (
      <DatePicker
        modal
        title={title}
        open={isVisible}
        mode="date"
        maximumDate={maximumDate}
        minimumDate={minimumDate}
        date={defaultDate}
        confirmText={'Confirm'}
        cancelText={'Cancel'}
        onConfirm={date => {
          onDateSelected(date);
        }}
        onCancel={() => {
          onCanceled();
        }}
      />
    );
  else return null;
};

export default DatePickerModal;
