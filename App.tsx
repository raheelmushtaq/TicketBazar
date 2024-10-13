import {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import SplashScreen from './src/screens/feat_splash/SplashScreen';
import RootContainer from './src/navigation/RootContainer';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading ? (
        <SplashScreen onConfigSuccess={() => setIsLoading(false)} />
      ) : (
        <>
          <RootNavigator />
          <RootContainer />
        </>
      )}
    </SafeAreaView>
  );
}
