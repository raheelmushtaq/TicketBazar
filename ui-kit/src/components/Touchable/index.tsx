import React, {useRef} from 'react';
import {TouchableOpacity, TouchableOpacityProps, ViewStyle} from 'react-native';

interface TouchableProps extends TouchableOpacityProps {
  onPress: () => void;
  children: React.ReactNode;
  containerStyle?:
    | undefined
    | ViewStyle
    | ViewStyle[]
    | (ViewStyle | undefined)[];
  isDisabled?: boolean;
}
const TouchableComponent = ({
  children,
  onPress,
  containerStyle,
  isDisabled,
}: TouchableProps) => {
  const lastPress = useRef(0);

  const handlePress = () => {
    const now = Date.now();
    if (now - lastPress.current < 1000) {
      return;
    }
    lastPress.current = now;
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={containerStyle}
      disabled={isDisabled}
      onPress={handlePress}>
      {children}
    </TouchableOpacity>
  );
};

export default TouchableComponent;
