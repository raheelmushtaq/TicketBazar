import {colors} from '../../theme/colors';
import {ActivityIndicator, View} from 'react-native';

export const CustomerLoader = () => {
  return (
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 10,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <ActivityIndicator color={colors.black} size={'small'} />
    </View>
  );
};
