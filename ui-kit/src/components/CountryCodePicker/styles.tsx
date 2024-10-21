import {StyleSheet} from 'react-native';
import {colors} from '../../theme/colors';
import {GlobalStyle} from '../../theme/styles';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  inputBorderFocused: {
    borderColor: '#1789C9',
  },
  inputBorder: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightIcon: {
    width: 20,
    height: 20,
    tintColor: colors.black,
    resizeMode: 'contain',
  },
  rightIconPicker: {
    width: 10,
    height: 10,
    tintColor: colors.black,
    resizeMode: 'contain',
  },
  bottomButtonContainer: {
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearFilterContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  applyButtonStyle: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {width: '90%', height: 1, marginVertical: 20},

  hr: {
    backgroundColor: colors.black,
    flex: 1,
    width: 1,
    marginHorizontal: 13,
  },

  modalContent: {
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },

  bottomModal: {
    marginBottom: 0,
    marginHorizontal: 0,
    justifyContent: 'flex-end',
  },
  buttonTextStyle: {
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
    color: colors.white,
  },
  modalButton: {
    paddingHorizontal: 26,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 15,
  },
  buttonLeftIcon: {
    tintColor: colors.white,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  buttonRightIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});
