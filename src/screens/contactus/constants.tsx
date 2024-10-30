import {ImageProps, Linking} from 'react-native';
import {images} from '../../assets/images';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../../types/RootStackParamList';
import {ScreenName} from '../../constants/constants.screens';

type ContactUsItemType = {
  icon: ImageProps;
  title?: string;
  type: 'image' | 'card';
  onPress: () => void;
};
export type ContactUsDataType = {
  icon?: ImageProps;
  title: string;
  items: ContactUsItemType[];
};

export const getContactUsData = (
  navigation: StackNavigationProp<RootStackParamList>,
): ContactUsDataType[] => [
  {
    icon: images.location,
    title: 'Our Office',
    items: [
      {
        icon: images.building,
        title: 'Islamabad',
        type: 'card',
        onPress: () => {
          Linking.openURL('https://map.google.com');
        },
      },
    ],
  },
  {
    title: 'Socials',
    items: [
      {
        icon: images.facebook,
        type: 'image',
        onPress: () => {
          Linking.openURL('https://www.facebook.com');
        },
      },
      {
        icon: images.twitter,
        type: 'image',
        onPress: () => {
          Linking.openURL('https://www.twitter.com');
        },
      },
      {
        icon: images.instagram,
        type: 'image',
        onPress: () => {
          Linking.openURL('https://www.instagram.com');
        },
      },
      {
        icon: images.linkedin,
        type: 'image',
        onPress: () => {
          Linking.openURL('https://www.linkedin.com');
        },
      },
    ],
  },
  {
    title: 'React us at',
    items: [
      {
        icon: images.whatsapp,
        type: 'image',
        onPress: () => {
          Linking.openURL('https://www.whatsapp.com');
        },
      },
      {
        icon: images.messenger,
        type: 'image',
        onPress: () => {
          Linking.openURL('https://www.facebook.com');
        },
      },
      {
        icon: images.mail,
        type: 'image',
        onPress: () => {
          Linking.openURL('mailto:');
        },
      },
    ],
  },
];
