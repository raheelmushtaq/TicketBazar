import {StyleSheet} from 'react-native';
import Layout from '../../utils/dimenUtils';
import {colors} from '../../../ui-kit';
const width = Layout.SCREEN_WIDTH;
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  itemContainer: {
    width: width,
    height: Layout.SCREEN_HEIGHT / 3,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: width * 0.8,
    height: width * 0.8,
    marginBottom: 30,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  pagination: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: 20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#000',
  },
  inactiveDot: {
    backgroundColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  skipButton: {
    padding: 10,
  },
  nextButton: {
    padding: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
});
