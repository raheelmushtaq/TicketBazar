import React, {useState} from 'react';
import {Image, View} from 'react-native';
import {images} from '../../assets/images';
import useGeneralStore from '../../store/useGeneralStore';
import {styles} from './styles';

// OnboardingScreen.js
import {useRef} from 'react';
import {Text, FlatList} from 'react-native';
import AppStrings from '../../constants/constants.strings';
import {SafeAreaView} from 'react-native-safe-area-context';
import LoginBottomSheet from '../../components/LoginBottomSheet';
import {Button, Separator} from '../../../ui-kit';
import useUserStore from '../../store/useUserStore';
type CrouselData = {
  id: number;
  source: string;
  heading?: string;
  description?: string;
};

const OnBoardingScreen = () => {
  const {updateOnBoarding} = useGeneralStore();
  const {updateUserLoginStatus} = useUserStore();
  const [isLoginDialogVisible, sertIsLoginDialogVisible] = useState(false);

  const onCompleteAndSkip = () => {
    updateOnBoarding(true);
  };
  const onLoginButtonPressed = () => {
    sertIsLoginDialogVisible(true);
  };
  const onboardingData: CrouselData[] = [
    {
      id: 1,
      source: images.SPLASH_APP_LOGO_3,
      description: AppStrings.onboadringMessage1,
    },
    {
      id: 2,
      source: images.SPLASH_APP_LOGO_3,
      description: AppStrings.onboardingMessage2,
    },

    {
      id: 3,
      source: images.SPLASH_APP_LOGO_3,
      heading: AppStrings.onboardingHeading3,
      description: AppStrings.onboardingMessage3,
    },
  ];
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const onNextButtonPressed = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({index: currentIndex + 1});
    }
  };

  const onSkipButtonPressed = () => {
    updateUserLoginStatus(true, 'guest');
    onCompleteAndSkip();
  };

  const keyExtractor = (item: any) => item.id;

  const onViewRef = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  const isLastIndex = currentIndex === onboardingData.length - 1;

  const renderOnBoardingItem = ({item, index}: any) => {
    return (
      <View key={index} style={styles.itemContainer}>
        <Image source={item.source} style={styles.image} resizeMode="contain" />
        {item.heading && <Text style={styles.heading}>{item.heading}</Text>}
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };
  const renderBottomButton = () => {
    return (
      <View style={{flex: 1}}>
        <Button
          type="primary"
          title={AppStrings.loginOrSignup}
          onPress={onLoginButtonPressed}
        />
        <Separator showTransparent={true} showVertical={true} />
        <Button
          type="secondary"
          title={AppStrings.loginAsGuest}
          onPress={onSkipButtonPressed}
        />
      </View>
    );
  };
  const renderLoginDialogBottomSheet = () => {
    if (isLoginDialogVisible) {
      return (
        <LoginBottomSheet
          closeModal={() => {
            sertIsLoginDialogVisible(false);
          }}
          isVisible={isLoginDialogVisible}
          onLogin={() => {
            onCompleteAndSkip();
          }}
        />
      );
    }
    return null;
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.buttonContainer, {flex: 1}]}>
        {!isLastIndex && (
          <Button
            containerStyle={{marginTop: 20}}
            title={AppStrings.skip}
            onPress={onSkipButtonPressed}
            type="secondary"
          />
        )}
      </View>
      <FlatList
        data={onboardingData}
        renderItem={renderOnBoardingItem}
        keyExtractor={keyExtractor}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      {/* Pagination Dots */}
      <View style={styles.pagination}>
        {onboardingData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              currentIndex === index ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
      {/* Buttons */}
      <View style={[styles.buttonContainer, {flex: 1}]}>
        {!isLastIndex && (
          <Button
            type={'primary'}
            title={AppStrings.next}
            onPress={onNextButtonPressed}
          />
        )}
        {isLastIndex && renderBottomButton()}
      </View>
      {renderLoginDialogBottomSheet()}
    </SafeAreaView>
  );
};

export default OnBoardingScreen;
