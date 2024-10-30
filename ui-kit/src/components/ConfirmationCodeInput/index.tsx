import React, {useState} from 'react';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

import {StyleSheet, Text, TextStyle, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';

type ConfirmationCodeInputProps = {
  value: string;
  setValue: (text: string) => void;
  cellCount: number;
  containerStyle?: ViewStyle;
  cellStyle: ViewStyle | TextStyle;
  focusedStyle?: ViewStyle;
  placeHolderStyle?: ViewStyle;
  errorMessage: string;
};

const ConfirmationCodeInput = ({
  value,
  setValue,
  cellCount,
  containerStyle,
  cellStyle,
  focusedStyle,
  placeHolderStyle,
  errorMessage,
}: ConfirmationCodeInputProps) => {
  const CELL_COUNT = cellCount;
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  return (
    <CodeField
      ref={ref}
      {...props}
      value={value}
      onChangeText={setValue}
      cellCount={CELL_COUNT}
      rootStyle={[styles.codeFieldRoot, containerStyle]}
      keyboardType="number-pad"
      textContentType="oneTimeCode"
      renderCell={({index, symbol, isFocused}) => (
        <Text
          key={index}
          style={[
            styles.cell,
            cellStyle,
            errorMessage && {borderColor: colors.error},
            isFocused && styles.focusCell,
            symbol && {color: colors.black},
          ]}
          onLayout={getCellOnLayoutHandler(index)}>
          {symbol || (isFocused ? <Cursor /> : '-')}
        </Text>
      )}
    />
  );
};

const styles = StyleSheet.create({
  codeFieldRoot: {marginVertical: 10, alignItems: 'center'},
  cell: {
    width: 70,
    height: 50,
    borderWidth: 1,
    lineHeight: 50,
    fontSize: 24,
    marginHorizontal: 10,
    color: colors.black,
    borderRadius: 10,
    borderColor: colors.border,
    textAlign: 'center',
    alignSelf: 'center',
  },
  focusCell: {
    borderColor: colors.activeBorder,
  },

  borderStyleBase: {
    width: 30,
    height: 45,
  },
});
export default ConfirmationCodeInput;
