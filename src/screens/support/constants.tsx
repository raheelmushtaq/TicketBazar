import {ImageProps, Linking} from 'react-native';
import {images} from '../../assets/images';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {ScreenName} from '../../constants/constants.screens';
import {
  navigateTo,
  navigateToContactSupport,
} from '../../utils/navigationUtils';

export type SupportListType = {
  icon: ImageProps;
  title: string;
  contactUs: string;
  onPress: () => void;
};

export const getSupportList = (
  navigation: StackNavigationProp<RootStackParamList>,
): SupportListType[] => [
  {
    icon: images.call,
    title: 'Call us now',
    contactUs: '+92-115-1155251',
    onPress: () => {
      Linking.openURL('tel:+92-115-1155251');
    },
  },
  {
    icon: images.whatsapp,
    title: 'Whatsapp support',
    contactUs: '+92-115-1155251',
    onPress: () => {
      Linking.openURL('whatsapp://send?phone=+92-115-1155251');
    },
  },
  {
    icon: images.chat,
    title: 'Chat Support',
    contactUs: 'Chat with Us',
    onPress: () => {
      navigateToContactSupport(navigation);
    },
  },
];
