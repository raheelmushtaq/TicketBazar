import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    width: '100%',
    marginTop: 12,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.black,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerNotEditable: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignContent: 'center',
  },
  input: {
    ...Platform.select({
      ios: {
        height: 56,
      },
      android: {
        height: 56,
      },
    }),
    paddingHorizontal: 10,
    flex: 1,
    paddingEnd: 20,
    color: colors.black,
    fontFamily: 'LibreFranklin-Regular',
  },
  inputNotEditAble: {
    ...Platform.select({
      ios: {
        paddingTop: 18,
      },
      android: {
        height: 56,
      },
    }),
    textAlignVertical: 'center',
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    paddingStart: 15,
  },
  label: {
    backgroundColor: colors.white,
    position: 'absolute',
    top: -8,
    start: 8,
    paddingHorizontal: 8,
  },
  inputRightViewContainer: {
    alignSelf: 'center',
    padding: 10,
  },
  inputRightImage: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});

export default styles;
