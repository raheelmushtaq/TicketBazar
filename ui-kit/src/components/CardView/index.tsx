import {TouchableOpacity, View, ViewStyle} from 'react-native';
import styles from './styles';
import React from 'react';
import TouchableComponent from '../Touchable';

type CardViewProps = {
  onPress?: () => void;
  containerStyle?:
    | undefined
    | ViewStyle
    | ViewStyle[]
    | (ViewStyle | undefined)[];
  childerStyle?: ViewStyle;
  children: React.ReactNode;
};
const CardView = ({
  children,
  onPress,
  containerStyle,
  childerStyle,
}: CardViewProps) => {
  if (!!onPress)
    return (
      <View style={containerStyle}>
        <TouchableComponent
          onPress={onPress}
          containerStyle={{...styles.card, ...childerStyle}}>
          {children}
        </TouchableComponent>
      </View>
    );
  return (
    <View style={containerStyle}>
      <View style={{...styles.card, ...childerStyle}}>{children}</View>
    </View>
  );
};
export default CardView;
