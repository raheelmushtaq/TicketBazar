import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {styles} from './styles';
import {images} from '../../assets/images';
import {colors} from '../../../ui-kit';

type SplashScreenProps = {
  onConfigSuccess: () => void;
};

const SplashScreen = ({onConfigSuccess}: SplashScreenProps) => {
  const getConfigInfo = async () => {};

  useEffect(() => {
    getConfigInfo().then();
    setTimeout(() => {
      onConfigSuccess();
    }, 5000);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.centerView}>
        <Image style={styles.logo} source={images.SPLASH_APP_LOGO_3} />
        <ActivityIndicator
          style={{marginTop: 20}}
          color={colors.white}
          size={'large'}
        />
      </View>
    </View>
  );
};
export default SplashScreen;
