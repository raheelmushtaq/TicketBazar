import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import CardView from '../CardView';
import {colors} from '../../theme/colors';

type NoDataComponentProps = {
  header?: string;
  message?: string;
  showHeader?: boolean;
  showMessage?: boolean;
  headerStyle?: TextStyle;
  messageStyle?: TextStyle;
  containerStyle?: ViewStyle;
};
const NoDataComponent = ({
  headerStyle,
  messageStyle,
  header,
  message,
  showHeader = true,
  showMessage = true,
  containerStyle,
}: NoDataComponentProps) => {
  return (
    <CardView containerStyle={[styles.emptyListComponent, containerStyle]}>
      <View>
        {showHeader && (
          <Text style={[styles.noRecordText, headerStyle]}>
            {header ?? 'No Date Found'}
          </Text>
        )}
        {showMessage && (
          <Text style={[styles.noRecordMessage, messageStyle]}>
            {message ?? 'No data has been found to display'}
          </Text>
        )}
      </View>
    </CardView>
  );
};

const styles = StyleSheet.create({
  emptyListComponent: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  noRecordText: {
    fontWeight: '600',
    lineHeight: 20,
    color: colors.black,
    fontSize: 14,
  },
  noRecordMessage: {
    marginTop: 10,
    lineHeight: 20,
    color: colors.black,
    fontSize: 14,
  },
});
export default NoDataComponent;
