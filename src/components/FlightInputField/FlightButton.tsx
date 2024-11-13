import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {FlightLists} from './contants';
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import {colors} from '../../../ui-kit';

type FlightButtonProps = {
  item: string;
  name?: string;
  style?: ViewStyle;
  onPress?: () => void;
  type: 'primary' | 'secondary';
};
export const FlightButton = ({
  item,
  style,
  onPress = () => {},
  type,
}: FlightButtonProps) => (
  <TouchableComponent
    onPress={onPress}
    containerStyle={[
      styles.FlightButton,
      {backgroundColor: type === 'primary' ? colors.primary : colors.secondary},
    ]}>
    <Text
      style={[
        {
          color:
            type === 'primary' ? colors.textOnPrimary : colors.textOnSecondary,
        },
      ]}>
      {item}
    </Text>
  </TouchableComponent>
);

const styles = StyleSheet.create({
  FlightButton: {
    paddingVertical: 10,
    backgroundColor: '#f5f5f5',
    width: '100%',
    height: 50,
    paddingHorizontal: 25,
    alignItems: 'center',
    marginVertical: 2,
    flexDirection: 'row',
    borderRadius: 10,
  },
});
