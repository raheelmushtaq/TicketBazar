import {FlatList, Image, Pressable, Text, View, ViewStyle} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './styles';
import Modal from 'react-native-modal';
import SearchBar from '../SearchBarComponent';
import NoDataComponent from '../NoDataComponent';
import {CountryButton} from './CountryButton';
import {CountryCodesForPhone, CountryCodeType} from './contants';
import {colors} from '../../theme/colors';
import {images} from '../../assets/images';
import {dimensions} from '../../theme/dimensions';
import InputField from '../InputField';

type CountrCodePickerProps = {
  codeStyle?: ViewStyle;
  onValueSelected: (dial_code: string) => void;
};
const CountryCodePicker = ({
  codeStyle,
  onValueSelected = (dial_code: string) => {},
}: CountrCodePickerProps) => {
  const [isCountryCodePickerVisible, setIsCountryCodeVisible] = useState(false);
  const [countryCode, setCountryCode] = useState('+92');
  const [listOfProperties, setListOfProperties] = useState([
    ...CountryCodesForPhone,
  ]);
  const [searchPropertyText, setSearchPropertyText] = useState('');
  const [filterListOfProperties, setFilteredListOfProperties] = useState<
    CountryCodeType[]
  >([]);

  const onClose = () => {
    setIsCountryCodeVisible(false);
  };

  useEffect(() => {
    if (!isCountryCodePickerVisible) {
      setSearchPropertyText('');
    }
  }, [isCountryCodePickerVisible]);
  const renderModalContent = () => (
    <>
      <View style={[styles.modalContent, {backgroundColor: colors.white}]}>
        {renderHeader()}

        {renderSearchBar()}
        {renderPropertiesFlatList()}
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
            {'Country'}
          </Text>
          <Pressable onPress={onClose}>
            <Image
              source={images.cross}
              style={{
                width: 22,
                height: 22,
                resizeMode: 'contain',
              }}
            />
          </Pressable>
        </View>
      </>
    );
  };

  const renderSearchBar = () => {
    return (
      <SearchBar
        containerStyle={{marginVertical: 10}}
        showClearButton={!!searchPropertyText}
        onClearText={() => setSearchPropertyText('')}
        placeHolder={'Country'}
        onChangeText={(text: string) => {
          setSearchPropertyText(text);
        }}
        value={searchPropertyText}
      />
    );
  };
  useEffect(() => {
    applySearch();
  }, [searchPropertyText]);
  const applySearch = () => {
    var array = !!searchPropertyText
      ? listOfProperties.filter(item => {
          return (
            item.name.en
              .toLowerCase()
              .includes(searchPropertyText.toLowerCase()) ||
            item.dial_code
              .toLowerCase()
              .includes(searchPropertyText.toLowerCase()) ||
            item.code.toLowerCase().includes(searchPropertyText.toLowerCase())
          );
        })
      : listOfProperties;
    setFilteredListOfProperties([...array]);
  };

  const renderCountryItem = ({item, index}: any) => {
    const date = item as CountryCodeType;
    return (
      <CountryButton
        item={date}
        onPress={() => {
          setCountryCode(date.dial_code);
          onValueSelected(date.dial_code);
          onClose();
        }}
      />
    );
  };

  const renderEmptyListComponent = () => {
    return <NoDataComponent containerStyle={{marginTop: 30}} />;
  };
  const renderPropertiesFlatList = () => {
    return (
      <FlatList
        showsVerticalScrollIndicator={false}
        data={filterListOfProperties}
        renderItem={renderCountryItem}
        style={{height: 300}}
        horizontal={false}
        ListEmptyComponent={renderEmptyListComponent}
      />
    );
  };

  const renderCountryCodePicker = () => {
    return (
      <Modal
        isVisible={isCountryCodePickerVisible}
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
      <Pressable
        onPress={() => {
          setIsCountryCodeVisible(true);
        }}
        style={[styles.row, styles.inputBorder]}>
        <InputField
          onChangeText={() => {}}
          onPress={() => {
            setIsCountryCodeVisible(true);
          }}
          label="Code"
          value={countryCode}
          editable={false}
          rightIcon={images.iconArrowDown}
          numberOfLines={1}
        />
      </Pressable>
      {renderCountryCodePicker()}
    </View>
  );
};

export default CountryCodePicker;
