import React, {useMemo} from 'react';
import {Text, TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import styles from './styles';
import TouchableComponent from '../Touchable';

type ButtonProps = {
  containerStyle?: ViewStyle;
  title: string;
  disabled?: boolean;
  loading?: boolean;
  onPress: () => void;
  type: 'primary' | 'secondary' | 'danger';
  textStyle?: TextStyle | undefined;
  buttonStyle?: ViewStyle | undefined;
};
const Button = ({
  title,
  disabled = false,
  loading = false,
  onPress,
  type = 'primary',
  textStyle,
  buttonStyle,
  containerStyle,
}: ButtonProps) => {
  const style: {
    [type: string]: {
      viewstyle: ViewStyle;
      textStyle: TextStyle;
    };
  } = useMemo(() => {
    return {
      primary: {
        textStyle: styles.primaryText,
        viewstyle: styles.primaryButton,
      },
      secondary: {
        textStyle: styles.secondaryText,
        viewstyle: styles.secondaryButton,
      },
      danger: {
        textStyle: styles.dangerText,
        viewstyle: styles.dangerButton,
      },
      disable: {
        textStyle: styles.disabledText,
        viewstyle: styles.disabledButton,
      },
    };
  }, []);
  const isDisabled = disabled || loading;

  const bStyle = isDisabled
    ? style['disable'].viewstyle
    : style[type].viewstyle;
  const tStyle = isDisabled
    ? style['disable'].textStyle
    : style[type].textStyle;

  return (
    <TouchableComponent
      containerStyle={containerStyle}
      isDisabled={isDisabled}
      onPress={onPress}>
      <View style={[styles.button, bStyle, buttonStyle && buttonStyle]}>
        <Text style={[styles.defaultText, tStyle, textStyle && textStyle]}>
          {title}
        </Text>
      </View>
    </TouchableComponent>
  );
};

export default Button;
