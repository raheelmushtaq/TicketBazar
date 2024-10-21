import React, {useState} from 'react';
import {Image, Keyboard, StyleSheet, Text, View} from 'react-native';
import AppStrings from '../../constants/constants.strings';
import {images} from '../../assets/images';
import {BottomSheetDialog, Button, colors, dimensions} from '../../../ui-kit';
import CountryCodePicker from '../../../ui-kit/src/components/CountryCodePicker';
import InputField from '../../../ui-kit/src/components/InputField';

type LoginBottomSheetProps = {
  isVisible: boolean;
  closeModal: () => void;
  onLogin: () => void;
};
const LoginBottomSheet = ({isVisible, closeModal}: LoginBottomSheetProps) => {
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNoError, setPhoneNoError] = useState('');

  const handlePhoneNumberChange = (text: string) => {
    if (phoneNoError) setPhoneNoError('');
    setPhoneNumber(text);
  };

  const renderModalContent = () => (
    <View style={{alignItems: 'flex-start', marginBottom: 20}}>
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
          marginTop: dimensions.marginMedium,
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
          containerStyle={{width: '100%', marginTop: dimensions.marginMedium}}
          type={'primary'}
          title={AppStrings.continue}
          onPress={() => {}}
        />
      </View>
    </View>
  );

  return (
    <BottomSheetDialog isVisible={isVisible} closeModal={closeModal}>
      {renderModalContent()}
    </BottomSheetDialog>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
});

export default LoginBottomSheet;
