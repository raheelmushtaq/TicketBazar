import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import CardView from '../CardView';
import {typography} from '../../theme/fonts';
import {dimensions} from '../../theme/dimensions';
import {images} from '../../assets/images';
import {colors} from '../../theme/colors';

type NextActionItemProps = {
  onPress?: () => void;
  containerStyle?:
    | undefined
    | ViewStyle
    | ViewStyle[]
    | (ViewStyle | undefined)[];
  leftIcon?: ImageSourcePropType;
  title: string;
  description?: string;
};
const NextActionItem = ({
  onPress,
  containerStyle,
  leftIcon,
  title,
  description,
}: NextActionItemProps) => {
  const renderLeftIcon = () => {
    if (leftIcon) {
      return (
        <Image
          source={leftIcon}
          style={{
            height: dimensions.icon.small,
            width: dimensions.icon.small,
            marginEnd: dimensions.margin.medium,
          }}
        />
      );
    }

    return null;
  };

  const renderCenterView = () => {
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <Text
          style={{
            fontSize: typography.fontSizes.sm,
            color: colors.black,
          }}
          numberOfLines={1}>
          {title}
        </Text>
        {!!description && (
          <Text
            style={{
              fontSize: typography.fontSizes.sm,
              marginTop: dimensions.margin.smallest,
            }}
            numberOfLines={2}>
            {description}
          </Text>
        )}
      </View>
    );
  };
  const renderRightView = () => {
    if (!!onPress) {
      return (
        <Image
          source={images.next}
          style={{
            marginHorizontal: dimensions.margin.small,
            height: dimensions.icon.small,
            width: dimensions.icon.small,
          }}
        />
      );
    } else return null;
  };
  const renderView = () => {
    return (
      <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
        {renderLeftIcon()}
        {renderCenterView()}
        {renderRightView()}
      </View>
    );
  };
  return (
    <CardView containerStyle={containerStyle} onPress={onPress}>
      {renderView()}
    </CardView>
  );
};

export default NextActionItem;
