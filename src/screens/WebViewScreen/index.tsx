import {StackNavigationProp} from '@react-navigation/stack';
import React, {useLayoutEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import {colors} from '../../../ui-kit';
import {RootStackParamList} from '../../types/RootStackParamList';
import {CustomerLoader} from '../../../ui-kit/src/components/Loader/CustomLoader';
import AppBackground from '../../../ui-kit/src/components/RootView/AppBackground';

type WebViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'WebViewScreen'
>;

type WebViewScreenProps = {
  route: any;
  navigation: WebViewScreenNavigationProp;
};

const WebViewScreen: React.FC<WebViewScreenProps> = ({route, navigation}) => {
  const {title, url} = route?.params || {};

  const [isLoading, setIsLoading] = useState(true);
  return (
    <AppBackground title={title} navigation={navigation} showLoader={isLoading}>
      <WebView
        source={{uri: url}}
        style={{flex: 1}}
        // source={{ uri: this.state.path }}
        scrollEnabled={true}
        scalesPageToFit={true}
        onLoad={() => {
          setIsLoading(false);
        }}
        onError={error => {
          console.log(error);
          setIsLoading(false);
        }}
      />
    </AppBackground>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
