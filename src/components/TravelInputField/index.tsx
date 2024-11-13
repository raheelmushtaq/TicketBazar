import React, {useEffect, useState} from 'react';
import {Image, Pressable, Text, View, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {colors, dimensions, typography} from '../../../ui-kit';
import {images as UIImages} from '../../../ui-kit/src/assets/images';
import InputField from '../../../ui-kit/src/components/InputField';
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import {images} from '../../assets/images';
import {styles} from './styles';

type TravelInputFieldProps = {
  codeStyle?: ViewStyle;
  adults: number;
  children: number;
  infants: number;
  label: string;
  error?: string;
  onValueSelected: (adults: number, children: number, infants: number) => void;
  placeholder: string;
};
const TravelInputField = ({
  codeStyle,
  adults,
  children,
  infants,
  label,
  error,
  onValueSelected,
  placeholder,
}: TravelInputFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [noOfAdults, setNoOfAdults] = useState(adults);
  const [noOfChildren, setNoOfChildren] = useState(children);
  const [noOfInfants, setNoOfInfants] = useState(infants);

  const onClose = () => {
    setIsVisible(false);
  };

  // useEffect(() => {
  //   if (isVisible) {
  //     setNoOfAdults(0);
  //     setNoOfChildren(0);
  //     setNoOfAdults(0);
  //   }
  // }, [isVisible]);
  useEffect(() => {
    setNoOfAdults(adults);
  }, [adults]);
  useEffect(() => {
    setNoOfChildren(children);
  }, [children]);
  useEffect(() => {
    setNoOfInfants(infants);
  }, [infants]);
  const renderTravelView = (
    text: string,
    descritption: string,
    value: number,
    onValueChange: (value: number) => void,
  ) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: dimensions.padding.medium,
        }}>
        <View style={{flex: 1}}>
          <Text
            style={{
              fontSize: typography.fontSizes.md,
              color: colors.primary,
            }}>
            {text}
          </Text>
          <Text
            style={{
              fontSize: typography.fontSizes.sm,
              color: colors.primary,
            }}>
            {descritption}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Pressable
            onPress={() => {
              onValueChange(value > 1 ? value - 1 : 0);
            }}>
            <Image source={images.minus} style={{height: 15, width: 15}} />
          </Pressable>

          <Text
            style={{
              fontSize: typography.fontSizes.sm,
              color: colors.primary,
              marginHorizontal: dimensions.margin.medium,
            }}>
            {value}
          </Text>
          <Pressable
            onPress={() => {
              onValueChange(value < 4 ? value + 1 : 4);
            }}>
            <Image source={images.plus} style={{height: 15, width: 15}} />
          </Pressable>
        </View>
      </View>
    );
  };
  const renderModalContent = () => (
    <>
      <View style={[styles.modalContent, {backgroundColor: colors.white}]}>
        {renderHeader()}
        {renderTravelView('Adult', '12 year or above', noOfAdults, value => {
          setNoOfAdults(value);
          onValueSelected(value, noOfChildren, noOfInfants);
        })}
        {renderTravelView(
          'Childrens',
          '2 year to 12 years',
          noOfChildren,
          value => {
            setNoOfChildren(value);
            onValueSelected(noOfAdults, value, noOfInfants);
          },
        )}
        {renderTravelView(
          'Inants',
          'new Born to 2 years',
          noOfInfants,
          value => {
            setNoOfInfants(value);
            onValueSelected(noOfAdults, noOfChildren, value);
          },
        )}
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
            {'Travellers'}
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

  const renderTravelInputField = () => {
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
  console.log(noOfAdults, noOfChildren, noOfInfants);
  const valueTOShow = `${noOfAdults > 0 ? noOfAdults + ' Adults, ' : ''}${
    noOfChildren > 0 ? noOfChildren + ' Children, ' : ''
  }${noOfInfants > 0 ? noOfInfants + ' Infants' : ''}`;
  console.log(valueTOShow);
  return (
    <View style={[codeStyle]}>
      <InputField
        error={error}
        value={valueTOShow}
        label={label}
        placeholder={placeholder}
        editable={false}
        blurOnSubmit={false}
        onPress={() => {
          setIsVisible(true);
        }}
        onChangeText={() => {}}
      />
      {renderTravelInputField()}
    </View>
  );
};

export default TravelInputField;
