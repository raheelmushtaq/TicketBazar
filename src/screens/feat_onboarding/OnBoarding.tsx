import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {images} from '../../theme/images';
import useGeneralStore from '../../store/useGeneralStore';
import {CrouselData} from '../../components/carousel';
import {styles} from './styles';

// OnboardingScreen.js
import {useRef} from 'react';
import {Text, FlatList, TouchableOpacity, Dimensions} from 'react-native';

const OnBoardingScreen = () => {
  const {updateOnBoarding} = useGeneralStore();
  useEffect(() => {
    return () => {
      handleOnCompleteAndSkip();
    };
  }, []);
  const handleOnCompleteAndSkip = () => {
    updateOnBoarding(true);
  };
  const onboardingData: CrouselData[] = [
    {
      id: 1,
      source: images.SPLASH_APP_LOGO_3,
      description: 'Book Flights, Buses & Visa with ease',
    },
    {
      id: 2,
      source: images.SPLASH_APP_LOGO_3,
      description: 'Cancel Your trip for free with Sasta Refund',
    },

    {
      id: 3,
      source: images.SPLASH_APP_LOGO_3,
      heading: '24/7 Customer Service',
      description: 'WhatsApp, Call, Live Chat, Email',
    },
  ];
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({index: currentIndex + 1});
    } else {
      handleOnCompleteAndSkip();
    }
  };

  const handleSkip = () => {
    handleOnCompleteAndSkip();
  };

  const keyExtractor = (item: any) => item.id;

  const onViewRef = useRef(({viewableItems}: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewConfigRef = useRef({viewAreaCoveragePercentThreshold: 50});

  return (
    <View style={styles.container}>
      <FlatList
        data={onboardingData}
        renderItem={data => {
          const {item} = data;
          return (
            <View style={styles.itemContainer}>
              <Image
                source={item.source}
                style={styles.image}
                resizeMode="contain"
              />
              {item.heading && (
                <Text style={styles.heading}>{item.heading}</Text>
              )}
              <Text style={styles.description}>{item.description}</Text>
            </View>
          );
        }}
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
      <View style={styles.buttonContainer}>
        {currentIndex !== onboardingData.length - 1 ? (
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.skipButton}></View>
        )}

        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.buttonText}>
            {currentIndex === onboardingData.length - 1 ? 'Done' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnBoardingScreen;
