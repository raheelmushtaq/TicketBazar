import {Dimensions} from 'react-native';

const dimensions = Dimensions.get('window');
const SCREEN_WIDTH = dimensions.width;
const SCREEN_HEIGHT = dimensions.height;

export default {
  dimensions,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
};
