import React, {useState} from 'react';
import {Keyboard, Text, View} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {Button, colors, dimensions, typography} from '../../../ui-kit';
import InputField from '../../../ui-kit/src/components/InputField';
import CountryCodePicker from '../../../ui-kit/src/components/CountryCodePicker';
import AppStrings from '../../constants/constants.strings';
import AppBackground from '../../../ui-kit/src/components/RootView/AppBackground';
import useUserStore from '../../store/useUserStore';

type BookingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Booking'
>;

type BookingScreenProps = {
  navigation: BookingScreenNavigationProp;
};

const BookingScreen: React.FC<BookingScreenProps> = ({navigation}) => {
  const {isUserLoggedIn, userLoggedInAs} = useUserStore();
  const isGuest = userLoggedInAs === 'guest';
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');

  const [emailError, setEmailError] = useState('');
  const [orderIdError, setOrderIdError] = useState('');

  const handleEmaiChange = (text: string) => {
    if (emailError) setEmailError('');
    setEmail(text);
  };
  const handleOrderIdChange = (text: string) => {
    if (orderIdError) setOrderIdError('');
    setOrderId(text);
  };

  const renderGuestUI = () => {
    return (
      <>
        <Text
          style={{
            fontSize: typography.fontSizes.xl,
            color: colors.textPrimary,
            marginBottom: dimensions.margin.large,
          }}>
          Search for you booking
        </Text>

        <InputField
          error={orderIdError}
          value={orderId}
          label="Order Id"
          placeholder="Order Id"
          blurOnSubmit={false}
          onChangeText={handleOrderIdChange}
          onSubmitEditing={Keyboard.dismiss}
        />

        <Text
          style={{
            fontSize: typography.fontSizes.sm,
            marginBottom: dimensions.margin.medium,
          }}>
          Your Order Id is emailed with the booking confirmation.
        </Text>

        <InputField
          error={emailError}
          label="Email"
          placeholder="Email"
          value={email}
          blurOnSubmit={false}
          onChangeText={handleEmaiChange}
          onSubmitEditing={Keyboard.dismiss}
        />

        <Text
          style={{
            fontSize: typography.fontSizes.sm,
            marginBottom: dimensions.margin.xLarge,
          }}>
          The email address entered during booking.
        </Text>
        <Button title="Search" onPress={() => {}} type={'primary'} />
      </>
    );
  };
  const renderLoggedInUserUI = () => {
    return <></>;
  };

  const renderComponent = () => {
    if (isGuest) return renderGuestUI();
    else return renderLoggedInUserUI();
  };
  return (
    <AppBackground navigation={navigation} title={'Booking'}>
      {renderComponent()}
    </AppBackground>
  );
};
export default BookingScreen;
