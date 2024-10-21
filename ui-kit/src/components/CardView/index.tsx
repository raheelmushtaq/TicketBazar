import {TouchableOpacity, View, ViewStyle} from 'react-native';
import styles from './styles';
import React from 'react';

type CardViewProps = {
  onPress?: () => void;
  containerStyle?: (ViewStyle | undefined)[];
  childerStyle?: ViewStyle;
  children: React.ReactNode;
};
const CardView = ({
  children,
  onPress = () => {},
  containerStyle,
  childerStyle,
}: CardViewProps) => {
  return (
    <View style={containerStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onPress}
        style={[styles.card, childerStyle]}>
        {children}
      </TouchableOpacity>
    </View>
  );
};
export default CardView;
