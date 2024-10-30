import {
  Image,
  ImageProps,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React, {useMemo} from 'react';
import {colors} from '../../theme/colors';
import styles from './styles';
import TouchableComponent from '../Touchable';
import {dimensions} from '../../theme/dimensions';

type ImageButtonProps = {
  title?: string;
  icon: ImageProps;
  iconLocation: 'left' | 'right';
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  type: 'primary' | 'secondary';
};
const ImageButton = ({
  title,
  icon,
  iconLocation,
  onPress,
  containerStyle,
  type,
}: ImageButtonProps) => {
  const style: {
    [type: string]: {
      viewstyle: ViewStyle;
      textStyle: TextStyle;
      iconTintColor: string;
    };
  } = useMemo(() => {
    return {
      primary: {
        textStyle: styles.primaryText,
        viewstyle: styles.primaryButton,
        iconTintColor: colors.textOnPrimary,
      },
      secondary: {
        textStyle: styles.secondaryText,
        viewstyle: styles.secondaryButton,
        iconTintColor: colors.textOnSecondary,
      },
      danger: {
        textStyle: styles.dangerText,
        viewstyle: styles.dangerButton,
        iconTintColor: colors.textOnError,
      },
      disable: {
        textStyle: styles.disabledText,
        viewstyle: styles.disabledButton,
        iconStyle: styles.primaryButton,
        iconTintColor: colors.textOnDisabled,
      },
    };
  }, []);

  const bStyle = style[type].viewstyle;
  const tStyle = style[type].textStyle;
  const iconTintColor = style[type].iconTintColor;

  const renderIcon = () => {
    const isLeft = iconLocation === 'left' && title;
    const isRight = iconLocation === 'right' && title;
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={isRight && {marginLeft: dimensions.margin.small}} />
        <Image
          source={icon}
          style={[{height: 20, width: 20}]}
          tintColor={iconTintColor}
          resizeMode={'contain'}
        />
        <View style={isLeft && {marginRight: dimensions.margin.small}} />
      </View>
    );
  };

  const renderIconView = (left: boolean) => {
    if (left && iconLocation === 'left') {
      return renderIcon();
    }
    if (!left && iconLocation === 'right') {
      return renderIcon();
    }
    return null;
  };

  const rendeTitle = () => {
    if (!!title)
      return <Text style={[styles.defaultText, tStyle]}>{title}</Text>;
    return null;
  };
  const renderView = () => {
    return (
      <View
        style={[
          styles.button,
          bStyle,
          !title && {paddingHorizontal: dimensions.padding.medium},
        ]}>
        {renderIconView(true)}
        {rendeTitle()}
        {renderIconView(false)}
      </View>
    );
  };
  if (onPress) {
    return (
      <TouchableComponent containerStyle={containerStyle} onPress={onPress}>
        {renderView()}
      </TouchableComponent>
    );
  } else {
    return <View style={containerStyle}>{renderView()}</View>;
  }
};

export default ImageButton;
