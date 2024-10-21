import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  TextInput,
  Pressable,
  TouchableOpacity,
  Text,
  TextInputProps,
  StyleProp,
  ViewStyle,
  TextStyle,
  Image,
  ImageProps,
} from 'react-native';
import styles from './styles';
import {colors} from '../../theme/colors';
import {images} from '../../assets/images';

interface InputFieldHandles {
  focus: () => void;
  clearError: () => void;
}

// Define the props for the InputField component
interface InputFieldProps extends TextInputProps {
  value: string;
  editable?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  blurOnSubmit?: boolean;
  keyboardType?: TextInputProps['keyboardType'];
  onSubmitEditing?: () => void;
  maxLength?: number;
  onChangeText: (text: string) => void;
  placeholder?: string;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  returnKeyType?: TextInputProps['returnKeyType'];
  label?: string;
  labelBackgroundColor?: string;
  placeholderTextColor?: string;
  onBlur?: () => void;
  mask?: any; // Add proper type if using a specific mask library
  error?: string;
  pointerEvents?: 'box-none' | 'none' | 'box-only' | 'auto';
  autoCapitalize?: TextInputProps['autoCapitalize'];
  rightIcon?: ImageProps;
  onRightIconPress?: () => void | undefined;
  isPasswordInput?: boolean;
  handlePassVisibility?: () => void;
  refInput?: React.Ref<TextInput>;
}

const InputField = forwardRef<InputFieldHandles, InputFieldProps>(
  (
    {
      value,
      editable = true,
      disabled = false,
      onPress,
      blurOnSubmit,
      keyboardType,
      onSubmitEditing,
      maxLength,
      onChangeText,
      placeholder,
      inputStyle,
      containerStyle,
      returnKeyType = 'next',
      label,
      labelBackgroundColor = colors.white,
      placeholderTextColor = colors.placeholder,
      onBlur,
      mask,
      error,
      pointerEvents,
      autoCapitalize,
      rightIcon,
      onRightIconPress,
      isPasswordInput,
      handlePassVisibility,
      refInput,
      ...rest
    },
    ref,
  ) => {
    const inputRef = useRef<TextInput>(null);
    const [borderStyle, setBorderStyle] = useState({
      borderWidth: 1,
      borderColor: colors.black,
      borderRadius: 10,
    });
    const [securePasswordTextEntry, setSecurePasswordTextEntry] =
      useState(isPasswordInput);
    const [inputError, setInputError] = useState(error);

    const handlePasswordVisibility = () =>
      setSecurePasswordTextEntry(prevState => !prevState);

    useEffect(() => {
      setInputError(error);
    }, [error]);

    const errorBorder = {
      borderColor: colors.error,
      borderWidth: 1,
    };

    const focus = () => {
      inputRef?.current?.focus?.();
    };

    const clearError = () => {
      setInputError('');
    };

    // Use useImperativeHandle to expose focus and clearError to the parent component
    useImperativeHandle(ref, () => ({
      focus,
      clearError,
    }));

    const handleFocus = () => {
      setBorderStyle(prevState => ({
        ...prevState,
        borderWidth: 2,
        borderColor: colors.activeBorder,
      }));
    };

    const handleBlur = () => {
      setBorderStyle(prevState => ({
        ...prevState,
        borderWidth: 1,
        borderColor: colors.border,
      }));
      onBlur?.();
    };

    const InputComponent = useMemo(() => TextInput, []);

    const handleTextChange = (text: string) => {
      onChangeText(text);
      clearError();
    };

    const Label: React.FC<{value: string}> = ({value}) => (
      <View style={styles.label}>
        <Text style={{color: inputError ? colors.error : colors.primary}}>
          {value}
        </Text>
      </View>
    );

    console.log({rightIcon});
    const renderRightIcon = () => {
      if (isPasswordInput) {
        return PasswordVisibilityComponent(
          images.iconEye,
          securePasswordTextEntry ? colors.black : colors.inactiveTabColor,
          handlePasswordVisibility,
        );
      } else if (!!rightIcon) {
        return PasswordVisibilityComponent(
          rightIcon,
          colors.black,
          onRightIconPress,
        );
      } else return null;
    };

    const PasswordVisibilityComponent = (
      icon: ImageProps,
      tint: string,
      onPress?: () => void | undefined,
    ) => (
      <TouchableOpacity
        accessible={true}
        accessibilityRole={'button'}
        accessibilityLabel={
          securePasswordTextEntry ? 'Show password' : 'Hide password'
        }
        style={styles.inputRightViewContainer}
        onPress={onPress}>
        <Image
          source={icon}
          style={[styles.inputRightImage, {tintColor: tint}]}
        />
      </TouchableOpacity>
    );

    const renderInputField = () => (
      <View>
        <View
          style={[
            styles.container,
            borderStyle,
            containerStyle,
            !!inputError && errorBorder,
            !editable && styles.containerNotEditable,
          ]}>
          {label ? <Label value={label} /> : null}
          {editable ? (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <InputComponent
                ref={inputRef}
                value={value}
                editable={editable}
                maxLength={maxLength}
                blurOnSubmit={blurOnSubmit}
                returnKeyType={returnKeyType}
                keyboardType={keyboardType}
                onChangeText={handleTextChange}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor}
                onFocus={handleFocus}
                onSubmitEditing={onSubmitEditing}
                onBlur={handleBlur}
                secureTextEntry={securePasswordTextEntry}
                style={[
                  styles.input,
                  !rightIcon && !isPasswordInput && {width: '100%'},
                  !editable && {color: colors.placeholder},
                  inputStyle,
                ]}
                pointerEvents={pointerEvents}
                autoCapitalize={autoCapitalize}
                {...rest}
              />
              {renderRightIcon()}
            </View>
          ) : (
            <Text
              style={[
                styles.input,
                !rightIcon && !isPasswordInput && {width: '100%'},
                !editable && {color: colors.placeholder},
                !editable && styles.inputNotEditAble,
                {
                  color: !!value ? colors.black : colors.placeholder,
                },
              ]}>
              {!!value ? value : placeholder}
            </Text>
          )}
        </View>
        {!!inputError && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );

    if (!editable) {
      return (
        <Pressable disabled={disabled} onPress={onPress}>
          {renderInputField()}
        </Pressable>
      );
    }

    return renderInputField();
  },
);

export default InputField;
