import React, {useState} from 'react';
import {Keyboard, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {Button} from '../../../ui-kit';
import InputField from '../../../ui-kit/src/components/InputField';
import CountryCodePicker from '../../../ui-kit/src/components/CountryCodePicker';
import AppStrings from '../../constants/constants.strings';
import AppBackground from '../../../ui-kit/src/components/RootView/AppBackground';

type ContactSupportScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContactSupport'
>;

type ContactSupportScreenProps = {
  navigation: ContactSupportScreenNavigationProp;
};

const ContactSupportScreen: React.FC<ContactSupportScreenProps> = ({
  navigation,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [orderId, setOrderId] = useState('');

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [orderIdError, setOrderIdError] = useState('');

  const handleNameChange = (text: string) => {
    if (emailError) setNameError('');
    setName(text);
  };
  const handleEmaiChange = (text: string) => {
    if (nameError) setEmailError('');
    setEmail(text);
  };
  const handlePhoneChange = (text: string) => {
    if (phoneNumberError) setPhoneNumberError('');
    setPhoneNumber(text);
  };
  const handleCountryCodeChange = (text: string) => {
    setCountryCode(text);
  };
  const handleOrderIdChange = (text: string) => {
    if (orderIdError) setOrderIdError('');
    setOrderId(text);
  };

  // const navigationOptions = () => {
  //   return {
  //     headerTitle: 'Contact Support',
  //     headerStyle: {},
  //     headerTintColor: colors.textPrimary,
  //   };
  // };
  // useLayoutEffect(() => {
  //   navigation.setOptions(navigationOptions());
  // }, []);
  return (
    <AppBackground navigation={navigation} title="Contact Support">
      <InputField
        error={nameError}
        value={name}
        label="Name"
        placeholder="Name"
        blurOnSubmit={false}
        onChangeText={handleNameChange}
        onSubmitEditing={Keyboard.dismiss}
      />
      <InputField
        error={emailError}
        label="Email"
        placeholder="Email"
        value={email}
        blurOnSubmit={false}
        onChangeText={handleEmaiChange}
        onSubmitEditing={Keyboard.dismiss}
      />
      <View
        style={[
          {
            justifyContent: 'center',
            alignContent: 'center',
            flexDirection: 'row',
          },
        ]}>
        <CountryCodePicker
          codeStyle={{flex: 1.2}}
          onValueSelected={handleCountryCodeChange}
        />
        <View style={{flex: 3, marginStart: 5}}>
          <InputField
            maxLength={16}
            label={AppStrings.phoneNumber}
            placeholder={'326xxxxxxx'}
            blurOnSubmit={false}
            value={phoneNumber}
            onChangeText={handlePhoneChange}
            error={phoneNumberError}
            onSubmitEditing={Keyboard.dismiss}
          />
        </View>
      </View>
      <InputField
        error={orderIdError}
        value={orderId}
        label="OrderId"
        placeholder="OrderId"
        blurOnSubmit={false}
        onChangeText={handleOrderIdChange}
        onSubmitEditing={Keyboard.dismiss}
      />
      <Button title="Start Chat" onPress={() => {}} type={'primary'} />
    </AppBackground>
  );
};
export default ContactSupportScreen;
