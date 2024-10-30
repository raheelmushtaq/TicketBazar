import React, {useState} from 'react';
import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import AppStrings from '../../constants/constants.strings';
import {images} from '../../assets/images';
import {BottomSheetDialog, Button, colors, dimensions} from '../../../ui-kit';
import CountryCodePicker from '../../../ui-kit/src/components/CountryCodePicker';
import InputField from '../../../ui-kit/src/components/InputField';
import ConfirmationCodeInput from '../../../ui-kit/src/components/ConfirmationCodeInput';
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import useUserStore from '../../store/useUserStore';

type VerifyPinBottomSheetProps = {
  isVisible: boolean;
  closeModal: () => void;
  onLogin: () => void;
};
const VerifyPinBottomSheet = ({
  isVisible,
  closeModal,
  onLogin,
}: VerifyPinBottomSheetProps) => {
  const [countryCode, setCountryCode] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [smsCodeError, setSmsCodeError] = useState('');

  const handelSmsCodeChange = (text: string) => {
    if (smsCodeError) setSmsCodeError('');
    setSmsCode(text);
  };

  const renderModalContent = () => (
    <TouchableComponent
      onPress={Keyboard.dismiss}
      containerStyle={{alignItems: 'flex-start', marginBottom: 20}}>
      <Image
        source={images.signinLoginBottomSheet}
        style={{height: 80, width: 100, marginBottom: 10}}
      />
      <Text style={{fontSize: 16, fontWeight: 'bold'}}>
        {'Pin has been send to the given phone number'}
      </Text>
      <View
        style={{
          width: '100%',
          alignItems: 'flex-start',
          marginTop: dimensions.margin.medium,
        }}>
        <View
          style={[
            styles.row,
            {justifyContent: 'center', alignContent: 'center', width: '100%'},
          ]}>
          <ConfirmationCodeInput
            cellStyle={{
              width: 45,
              height: 50,
              fontSize: 24,
            }}
            errorMessage={smsCodeError}
            cellCount={4}
            value={smsCode}
            setValue={handelSmsCodeChange}
          />
        </View>

        <Button
          containerStyle={{width: '100%', marginTop: dimensions.margin.medium}}
          type={'primary'}
          title={AppStrings.VerifyOtp}
          onPress={() => {
            onLogin();
          }}
        />
      </View>
    </TouchableComponent>
  );

  return (
    <BottomSheetDialog
      showCrossIcon={true}
      onBackDropPress={() => {}}
      isVisible={isVisible}
      closeModal={closeModal}>
      {renderModalContent()}
    </BottomSheetDialog>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default VerifyPinBottomSheet;
