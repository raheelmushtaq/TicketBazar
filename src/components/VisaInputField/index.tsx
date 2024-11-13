import React, {useEffect, useState} from 'react';
import {FlatList, Image, Text, View, ViewStyle} from 'react-native';
import Modal from 'react-native-modal';
import {Button, colors, dimensions} from '../../../ui-kit';
import {images} from '../../../ui-kit/src/assets/images';
import InputField from '../../../ui-kit/src/components/InputField';
import NoDataComponent from '../../../ui-kit/src/components/NoDataComponent';
import SearchBar from '../../../ui-kit/src/components/SearchBarComponent';
import TouchableComponent from '../../../ui-kit/src/components/Touchable';
import {VisasList} from './contants';
import {styles} from './styles';
import {FlightButton} from '../FlightInputField/FlightButton';

type VisaInputFieldProps = {
  codeStyle?: ViewStyle;
  value: string;
  label: string;
  error?: string;
  onValueSelected: (text: string) => void;
  placeholder: string;
};
const VisaInputField = ({
  codeStyle,
  value,
  label,
  error,
  onValueSelected,
  placeholder,
}: VisaInputFieldProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBus, setSelectedBus] = useState(value);
  const [listOfProperties, setListOfProperties] = useState([...VisasList]);
  const [searchPropertyText, setSearchPropertyText] = useState('');
  const [filterListOfProperties, setFilteredListOfProperties] = useState<
    string[]
  >([]);

  useEffect(() => {
    setSelectedBus(value);
  }, [value]);

  const onClose = () => {
    setIsVisible(false);
  };

  useEffect(() => {
    if (!isVisible) {
      setSearchPropertyText('');
    }
  }, [isVisible]);
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
            {'Flight'}
          </Text>
          <TouchableComponent onPress={onClose}>
            <Image
              source={images.cross}
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

  const renderSearchBar = () => {
    return (
      <SearchBar
        containerStyle={{marginVertical: 10}}
        showClearButton={!!searchPropertyText}
        onClearText={() => setSearchPropertyText('')}
        placeHolder={`Flight ${label}`}
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
          return item.toLowerCase().includes(searchPropertyText.toLowerCase());
        })
      : listOfProperties;
    setFilteredListOfProperties([...array]);
  };

  const renderCountryItem = ({item, index}: any) => {
    return (
      <FlightButton
        item={item}
        type={item === value ? 'primary' : 'secondary'}
        onPress={() => {
          setSelectedBus(item);
          onValueSelected(item);
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

  const renderVisaInputField = () => {
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
        value={value}
        label={label}
        placeholder={placeholder}
        editable={false}
        blurOnSubmit={false}
        onPress={() => {
          setIsVisible(true);
        }}
        onChangeText={onValueSelected}
      />
      {renderVisaInputField()}
    </View>
  );
};

export default VisaInputField;
