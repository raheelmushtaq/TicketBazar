import {StyleSheet} from 'react-native';
import {colors} from '../../../ui-kit';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {width: '100%', height: '110%'},
  logo: {
    width: 350,
    height: 200,
    resizeMode: 'contain',
  },
  centerView: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  titleText: {color: colors.white, fontSize: 33, fontWeight: 'bold'},
  description: {color: colors.white, fontSize: 12},
});
