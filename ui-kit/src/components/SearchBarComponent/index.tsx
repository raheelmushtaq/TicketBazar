import React from 'react';
import {
  Image,
  ImageStyle,
  Keyboard,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {images} from '../../assets/images';
import {CustomerLoader} from '../Loader/CustomLoader';
import {colors} from '../../theme/colors';
import TouchableComponent from '../Touchable';

interface SearchBarProps extends TextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  onClearText: () => void;
  containerStyle?: ViewStyle;
  placeHolder?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  loading?: boolean;
  showClearButton?: boolean;
  clearViewStyles?: ViewStyle;
  inputStyle?: ViewStyle;
  editable?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onChangeText,
  value,
  onClearText,
  containerStyle,
  placeHolder,
  onBlur,
  onFocus,
  loading = false,
  showClearButton = false,
  clearViewStyles = {},
  inputStyle,
  editable = true,
  ...props
}: SearchBarProps) => {
  const renderCrossIcon = () => {
    if (!!value || showClearButton) {
      return (
        <TouchableComponent
          onPress={onClearText}
          style={[styles.crossIconContainer, clearViewStyles]}>
          <Image source={images.cross} style={styles.crossIconStyle} />
        </TouchableComponent>
      );
    }
    return null;
  };

  const renderActivityIndicator = () => {
    if (loading) return <CustomerLoader />;
    return null;
  };
  return (
    <>
      <View style={[styles.searchBarCard, containerStyle]}>
        <View style={styles.searchIconStyle}>
          <Image source={images.search} style={styles.searchIcon} />
        </View>
        <View style={styles.searchInputContainerStyle}>
          <TextInput
            editable={editable}
            onChangeText={onChangeText}
            style={[
              styles.searchInputStyle,
              styles.searchInputStyleSubContainer,
              inputStyle,
            ]}
            blurOnSubmit={false}
            placeholder={placeHolder}
            placeholderTextColor={colors.placeholder}
            onBlur={onBlur}
            onSubmitEditing={Keyboard.dismiss}
            returnKeyType={'search'}>
            {value}
          </TextInput>
        </View>
        <View style={styles.rightContainer}>
          {renderActivityIndicator()}
          {renderCrossIcon()}
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  searchBarCard: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    alignItems: 'center',
    height: 50,
    borderColor: '#1789C9',
    borderWidth: 1,
    borderRadius: 15,
  },
  searchInputContainerStyle: {
    flex: 1,
    marginLeft: 5,
  },
  searchInputStyle: {
    height: 50,
    backgroundColor: colors.transparent,
    fontSize: 16,
    color: colors.black,
  },
  searchInputStyleSubContainer: {
    backgroundColor: colors.transparent,
  },
  searchIconStyle: {
    marginLeft: 2,
  },
  searchIcon: {
    width: 15,
    height: 15,
    alignSelf: 'center',
  },
  crossIconStyle: {
    resizeMode: 'contain',
    width: 20,
    height: 20,
  },
  rightContainer: {
    flexDirection: 'row',
  },
  crossIconContainer: {
    alignSelf: 'flex-end',
  },
});

export default SearchBar;
