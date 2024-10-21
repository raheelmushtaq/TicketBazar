import {
  Image,
  ImageStyle,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {useEffect, useState} from 'react';
import {images} from '../../assets/images';
import {colors} from '../../theme/colors';

type CheckBoxProps = {
  checked: boolean;
  text: string;
  textStyle?: TextStyle;
  checkBoxStyle?: ImageStyle;
  containerStyle?: ViewStyle;
  onValueChange: (isChecked: boolean) => {};
};
const CheckBox = ({
  checked,
  text,
  textStyle,
  checkBoxStyle,
  onValueChange,
  containerStyle,
}: CheckBoxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const onChange = () => {
    setIsChecked(prevState => !prevState);
    onValueChange?.(!isChecked);
  };
  return (
    <TouchableOpacity
      onPress={onChange}
      activeOpacity={0.8}
      style={[{flexDirection: 'row', alignItems: 'center'}, containerStyle]}>
      <Image
        source={isChecked ? images.checkBoxChecked : images.checkBoxUnChecked}
        style={[{width: 24, height: 24, resizeMode: 'contain'}, checkBoxStyle]}
      />
      <Text
        style={[
          {
            fontSize: 14,
            lineHeight: 20,
            marginStart: 20,
            color: colors.black,
          },
          textStyle,
        ]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};
export default CheckBox;
