import React, {useEffect, useState} from 'react';
import {Image, Keyboard, Pressable, StyleSheet, Text, View} from 'react-native';
import AppStrings from '../../constants/constants.strings';
import {images} from '../../assets/images';
import {BottomSheetDialog, Button, colors, dimensions} from '../../../ui-kit';
import CountryCodePicker from '../../../ui-kit/src/components/CountryCodePicker';
import InputField from '../../../ui-kit/src/components/InputField';
import VerifyPinBottomSheet from '../VerifyPinBottomSheet';
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import useUserStore from '../../store/useUserStore';

type LoginBottomSheetProps = {
  isVisible: boolean;
  closeModal: () => void;
  onLogin: () => void;
};
const LoginBottomSheet = ({
  isVisible,
  closeModal,
  onLogin,
}: LoginBottomSheetProps) => {
  const {updateUserLoginStatus} = useUserStore();
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');
  const [isPinViewVisible, setIsPinViewVisible] = useState(false);
  useEffect(() => {
    if (!isVisible) {
      setCountryCode('+92');
      setPhoneNoError('');
      setPhoneNumber('');
      setIsPinViewVisible(false);
    }
  }, [isVisible]);

  const handlePhoneNumberChange = (text: string) => {
    if (phoneNoError) setPhoneNoError('');
    setPhoneNumber(text);
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
        {AppStrings.signInOrCreateAccount}
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
            {justifyContent: 'center', alignContent: 'center'},
          ]}>
          <CountryCodePicker
            codeStyle={{flex: 1.2}}
            onValueSelected={(code: string) => {
              setCountryCode(code);
            }}
          />
          <View style={{flex: 3, marginStart: 5}}>
            <InputField
              maxLength={16}
              label={AppStrings.phoneNumber}
              placeholder={'326xxxxxxx'}
              value={phoneNumber}
              onChangeText={handlePhoneNumberChange}
              blurOnSubmit={false}
              error={phoneNoError}
              onSubmitEditing={Keyboard.dismiss}
            />
          </View>
        </View>

        <Button
          containerStyle={{width: '100%', marginTop: dimensions.margin.medium}}
          type={'primary'}
          title={AppStrings.continue}
          onPress={() => {
            setIsPinViewVisible(true);
          }}
        />
      </View>
    </TouchableComponent>
  );

  const renderOtpPinBottomSheetDialog = () => {
    if (isPinViewVisible)
      return (
        <VerifyPinBottomSheet
          isVisible={isPinViewVisible}
          closeModal={closeModal}
          onLogin={() => {
            updateUserLoginStatus(true, 'user');
            onLogin();
            closeModal();
          }}
        />
      );
    return null;
  };

  return (
    <BottomSheetDialog
      isVisible={isVisible}
      showCrossIcon={true}
      showTopBar={false}
      closeModal={closeModal}
      onBackDropPress={() => {}}>
      {renderModalContent()}
      {renderOtpPinBottomSheetDialog()}
    </BottomSheetDialog>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default LoginBottomSheet;
