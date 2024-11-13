import React, {useEffect, useState} from 'react';
import {Image, Text, View, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {colors, dimensions} from '../../../ui-kit';
import {images as UIImages} from '../../../ui-kit/src/assets/images';
import InputField from '../../../ui-kit/src/components/InputField';
import RadioButton from '../../../ui-kit/src/components/RadioButton';
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import {styles} from './styles';

type TravelClassInputFieldProps = {
  codeStyle?: ViewStyle;
  value: string;
  label: string;
  error?: string;
  onValueSelected: (travelClass: string) => void;
  placeholder: string;
};
const TravelClassInputField = ({
  codeStyle,
  value,
  label,
  error,
  onValueSelected,
  placeholder,
}: TravelClassInputFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [travelClass, setTravelClass] = useState<string>(value);

  const onClose = () => {
    setIsVisible(false);
  };
  const renderModalContent = () => (
    <>
      <View style={[styles.modalContent, {backgroundColor: colors.white}]}>
        {renderHeader()}
        <RadioButton
          options={['Economy', 'Premium Economy', 'Business', 'First']}
          selected={travelClass}
          onSelect={(option: string) => {
            setTravelClass(option);
            onValueSelected(option);
          }}
        />
      </View>
    </>
  );

  const renderHeader = () => {
    return (
      <>
        <View
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 20,
          }}>
          <Text
            numberOfLines={1}
            style={{
              fontSize: 20,
              textAlign: 'center',
              flex: 1,
              color: colors.black,
            }}>
            {'Class'}
          </Text>
          <TouchableComponent onPress={onClose}>
            <Image
              source={UIImages.cross}
              style={{
                width: 22,
                height: 22,
                resizeMode: 'contain',
              }}
            />
          </TouchableComponent>
        </View>
      </>
    );
  };

  const renderTravelClassInputField = () => {
    return (
      <Modal
        isVisible={isVisible}
        backdropColor={'#1789C9'}
        deviceWidth={dimensions.SCREEN_WIDTH}
        deviceHeight={dimensions.SCREEN_HEIGHT}
        onBackdropPress={onClose}
        animationOutTiming={300}
        animationInTiming={300}
        avoidKeyboard={true}
        useNativeDriver
        useNativeDriverForBackdrop
        hideModalContentWhileAnimating
        style={styles.bottomModal}>
        {renderModalContent()}
      </Modal>
    );
  };
  return (
    <View style={[codeStyle]}>
      <InputField
        error={error}
        value={travelClass}
        label={label}
        placeholder={placeholder}
        editable={false}
        blurOnSubmit={false}
        onPress={() => {
          setIsVisible(true);
        }}
        onChangeText={() => {}}
      />
      {renderTravelClassInputField()}
    </View>
  );
};

export default TravelClassInputField;
