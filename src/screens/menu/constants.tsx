import {ImageProps, Linking} from 'react-native';
import {images} from '../../assets/images';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {ScreenName} from '../../constants/constants.screens';
import {
  navigateToContactUs,
  navigateToSupport,
  navigateToWebView,
} from '../../utils/navigationUtils';

export type MenuItemType = {
  icon: ImageProps;
  title: string;
  onPress: () => void;
};

export const getMenuData = (
  navigation: StackNavigationProp<RootStackParamList>,
): MenuItemType[] => [
  {
    icon: images.call,
    title: 'Contact us',
    onPress: () => {
      navigateToContactUs(navigation);
    },
  },
  {
    icon: images.support,
    title: 'Support',
    onPress: () => {
      navigateToSupport(navigation);
    },
  },
  {
    icon: images.info,
    title: 'About Ticket bazar',
    onPress: () => {
      const params = {
        title: 'About',
        url: 'https://www.google.com',
      };
      navigateToWebView(navigation, 'About', 'https://www.google.com');
    },
  },
  {
    icon: images.terms,
    title: 'Term & Condition',
    onPress: () => {
      navigateToWebView(
        navigation,
        'Term & Condition',
        'https://www.google.com',
      );
    },
  },
  {
    icon: images.privacy_policy,
    title: 'Privacy policy',
    onPress: () => {
      navigateToWebView(navigation, 'Privacy policy', 'https://www.google.com');
    },
  },
  {
    icon: images.star,
    title: 'Rate our App',
    onPress: () => {},
  },
  {
    icon: images.share,
    title: 'Share our App',
    onPress: () => {},
  },
];
