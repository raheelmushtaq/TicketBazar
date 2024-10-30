import {StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';
import {colors} from '../../theme/colors';
import {CountryCodeType} from './contants';
import TouchableComponent from '../Touchable';

type CountryButtonProps = {
  item: CountryCodeType;
  name?: string;
  style?: ViewStyle;
  onPress?: () => void;
};
export const CountryButton = ({
  item,
  style,
  onPress = () => {},
}: CountryButtonProps) => (
  <TouchableComponent onPress={onPress} containerStyle={[styles.countryButton]}>
    <Text
      style={[
        {
          flex: 0.2,
        },
      ]}>
      {item?.flag}
    </Text>
    <Text
      style={[
        {
          flex: 0.3,
          color: colors.black,
        },
      ]}>
      {item?.dial_code}
    </Text>
    <Text
      style={[
        {
          flex: 1,
          color: colors.black,
        },
      ]}>
      {item?.name?.en}
    </Text>
  </TouchableComponent>
);

const styles = StyleSheet.create({
  countryButton: {
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
