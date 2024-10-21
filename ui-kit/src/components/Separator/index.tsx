import React from 'react';
import {
  DimensionValue,
  Pressable,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import {colors} from '../../theme/colors';

type SeparatorProps = {
  showTransparent: boolean;
  showVertical: boolean;
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
  color?: string;
};
const Separator = ({
  showTransparent,
  showVertical,
  height = 10,
  width,
  color,
}: SeparatorProps) => {
  const verticalStyle = [
    styles.verticalContainer,
    !!height && {height: height},
  ];
  const horizontalStyle = [
    styles.horizontalContainer,
    !!width && {width: width},
  ];
  return (
    <View
      style={[
        showVertical ? verticalStyle : horizontalStyle,
        color && {backgroundColor: color},
        showTransparent && {backgroundColor: colors.transparent},
      ]}></View>
  );
};

export default Separator;
