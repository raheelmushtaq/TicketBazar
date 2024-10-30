import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  StatusBar,
  Platform,
  Image,
  ImageProps,
} from 'react-native';
import styles from './styles';
import {colors} from '../../theme/colors';
import {dimensions} from '../../theme/dimensions';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../../../src/types/RootStackParamList';
import {CustomerLoader} from '../Loader/CustomLoader';
import TouchableComponent from '../Touchable';
import ScreenLoader from '../Loader/ScreenLoader';
import useUserStore from '../../../../src/store/useUserStore';
import {images} from '../../assets/images';
import {navigateToProfile} from '../../../../src/utils/navigationUtils';
import LoginBottomSheet from '../../../../src/components/LoginBottomSheet';

export type RightIconType = {
  icon: ImageProps;
  title: string;
  onPress: () => void;
};
type AppBackgroundProps = {
  navigation: StackNavigationProp<RootStackParamList>;
  children: React.ReactNode;
  showLoader?: boolean;
  showLoaderAsModal?: boolean;
  title: string;
  rightIcon?: RightIconType[];
  isKeyBoardAwareScrollView?: boolean;
  isSafeAreaView?: boolean;
  isWebView?: boolean;
  isScrollEnabled?: boolean;
  extraScrollHeight?: number;
  background?: string;
  showRightIcon?: boolean;
};
const AppBackground = ({
  navigation,
  children,
  showLoader,
  showLoaderAsModal = true,
  title,
  rightIcon = [],
  showRightIcon = true,
  isKeyBoardAwareScrollView = false,
  isSafeAreaView = true,
  isWebView = false,
  isScrollEnabled = true,
  background = colors.background,
}: AppBackgroundProps) => {
  const {isUserLoggedIn, userLoggedInAs} = useUserStore();
  const [isLoginDialogVisible, setIsLoginDialogVisible] = useState(false);
  const isGuestUser = userLoggedInAs === 'guest';
  const renderRightIcon = (onPress: () => void, icon: ImageProps) => {
    return (
      <TouchableComponent
        onPress={onPress}
        containerStyle={{
          width: 30,
          height: 30,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image source={icon} style={{width: 20, height: 20}} />
      </TouchableComponent>
    );
  };
  const handleUserActions = () => {
    if (isUserLoggedIn && isGuestUser) {
      setIsLoginDialogVisible(true);
    } else {
      navigateToProfile(navigation);
    }
  };

  const renderLoginDialogBottomSheet = () => {
    if (isLoginDialogVisible) {
      return (
        <LoginBottomSheet
          closeModal={() => {
            setIsLoginDialogVisible(false);
          }}
          isVisible={isLoginDialogVisible}
          onLogin={() => {
            setIsLoginDialogVisible(false);
          }}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: title,
      headerStyle: {
        borderBottomColor: colors.blackOverlay,
        borderBottomWidth: 0.5,
      },
      headerTintColor: colors.textPrimary,
      headerRight: () => {
        if (isUserLoggedIn && showRightIcon) {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                alignSelf: 'flex-end',
                paddingHorizontal: dimensions.padding.medium,
              }}>
              {renderRightIcon(handleUserActions, images.user)}
              {rightIcon.length > 0 &&
                rightIcon.map(item => renderRightIcon(item.onPress, item.icon))}
            </View>
          );
        } else {
          return null;
        }
      },
    });
  }, []);

  const isAndroid = Platform.OS !== 'android';
  const parentViewExtraScrollHeight = !isAndroid
    ? dimensions.SCREEN_HEIGHT * 0.15
    : 0;

  const getSafeAreaWrapper = (isSafeAreaView = false) => {
    if (isSafeAreaView) {
      return SafeAreaView;
    }
    return View;
  };

  const getScreenWrapper = (isKeyBoardAwareScrollView = false) => {
    // if (isKeyBoardAwareScrollView) {
    //     return KeyboardAwareScrollView;
    // }
    return View;
  };

  const getTouchableWrapper = (isWebView = false) => {
    if (isWebView) {
      return View;
    }
    return TouchableWithoutFeedback;
  };
  const ScreenWrapper = getScreenWrapper(isKeyBoardAwareScrollView);
  const TouchableWrapper = getTouchableWrapper(isWebView);

  return (
    <SafeAreaView style={styles.picture}>
      <StatusBar translucent={true} backgroundColor={background} />
      <TouchableWrapper
        style={isWebView && {flex: 1}}
        onPress={Keyboard.dismiss}
        accessible={false}>
        <ScreenWrapper
          enableOnAndroid={true}
          enableResetScrollToCoords={true}
          keyboardShouldPersistTaps="handled"
          extraHeight={parentViewExtraScrollHeight}
          extraScrollHeight={parentViewExtraScrollHeight}
          alwaysBounceVertical={false}
          showsVerticalScrollIndicator={false}
          // keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
          isScrollEnabled={isScrollEnabled}
          style={[
            styles.picture,
            !isKeyBoardAwareScrollView
              ? {
                  paddingBottom: isAndroid ? 20 : 0,
                }
              : {paddingBottom: isAndroid ? 20 : 0},
          ]}
          contentContainerStyle={[
            {flexGrow: 1, paddingBottom: isAndroid ? 20 : 0},
          ]}>
          {showLoader && !showLoaderAsModal && (
            <View
              style={{
                justifyContent: 'center',
                alignSelf: 'center',
                alignItems: 'center',
                alignContent: 'center',
              }}>
              <CustomerLoader />
            </View>
          )}
          {children}
        </ScreenWrapper>
      </TouchableWrapper>
      {showLoader && showLoaderAsModal && (
        <ScreenLoader isVisible={showLoader} />
      )}
      {renderLoginDialogBottomSheet()}
    </SafeAreaView>
  );
};
export default AppBackground;
