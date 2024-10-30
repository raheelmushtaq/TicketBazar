import {
  Image,
  ImageProps,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../../theme/colors';
import TouchableComponent from '../Touchable';
import {dimensions} from '../../theme/dimensions';
type TabItemProps = {
  title: string;
  icon: ImageProps;
  selected: boolean;
  selectOrUnSelectItem: (selected: Boolean) => void;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle;
};
const TabItem = ({
  title,
  icon,
  selected,

  selectOrUnSelectItem,
  textStyle,
  containerStyle,
}: TabItemProps) => {
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);
  const onPress = () => {
    selectOrUnSelectItem(!isSelected);
  };
  const styleOverride = [styles.button, styles.default];
  return (
    <>
      <TouchableComponent onPress={onPress}>
        <View
          style={[
            styleOverride,
            !selected ? styles.secondaryButton : styles.primaryButton,
          ]}>
          <Image
            source={icon}
            style={{
              height: 15,
              width: 15,
              marginRight: dimensions.margin.small,
            }}
            tintColor={isSelected ? colors.black : colors.inactiveTabColor}
          />
          <Text
            numberOfLines={1}
            style={[
              {
                fontSize: 14,
                lineHeight: 24,
              },
              textStyle,
              {color: isSelected ? colors.black : colors.inactiveTabColor},
            ]}>
            {title}
          </Text>
        </View>
      </TouchableComponent>
    </>
  );
};
export default TabItem;

export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  uploadImageItemCrossSize: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  equipmentItemCrossContainer: {position: 'absolute', top: -3, right: 3},

  button: {
    flexDirection: 'row',
  },
  default: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    borderRadius: 15,
  },
  loader: {
    height: 25,
    width: 25,
    alignSelf: 'center',
  },
  secondaryButton: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 1,
    borderBottomColor: colors.transparent,
  },
  primaryButton: {
    backgroundColor: colors.transparent,
    borderBottomWidth: 1,
    borderBottomColor: colors.black,
  },
});
