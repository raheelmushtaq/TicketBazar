import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, View} from 'react-native';
import {styles} from './styles';
import {images} from '../../theme/images';
import {colors} from '../../theme/colors';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.centerView}>
        <Image style={styles.logo} source={images.SPLASH_APP_LOGO_3} />
      </View>
    </View>
  );
};
export default HomeScreen;
