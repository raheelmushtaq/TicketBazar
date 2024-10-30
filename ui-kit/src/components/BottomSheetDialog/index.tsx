import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../theme/colors';
import {dimensions} from '../../theme/dimensions';
import {images} from '../../assets/images';
import TouchableComponent from '../Touchable';

type BottomSheetDialogProps = {
  isVisible: boolean;
  closeModal: () => void;
  onBackDropPress: () => void;
  header?: string;
  showTopBar?: boolean;
  showCrossIcon: boolean;
  children: React.ReactNode;
};
const BottomSheetDialog = ({
  isVisible,
  closeModal,
  onBackDropPress,
  header,
  showTopBar = true,
  showCrossIcon,
  children,
}: BottomSheetDialogProps) => {
  const renderTopRow = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center', // Center items vertically
          width: '90%',
          alignSelf: 'center',
          marginHorizontal: 10,
          marginVertical: 10,
          justifyContent: 'space-between', // Add space between elements
        }}>
        <View style={{flex: 1, alignItems: 'center'}}>
          {showTopBar && (
            <View
              style={{
                width: 50,
                height: 10,
                borderRadius: dimensions.border.large,
                backgroundColor: colors.black,
              }}
            />
          )}
        </View>
        {showCrossIcon && (
          <TouchableComponent
            onPress={closeModal}
            containerStyle={{
              width: 30,
              height: 30,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: dimensions.border.large,
            }}>
            <Image
              source={images.cross}
              style={{height: 15, width: 15}}
              tintColor={colors.black}
            />
          </TouchableComponent>
        )}
      </View>
    );
  };

  const renderHeader = () => {
    if (!!header) {
      return (
        <Text
          numberOfLines={2}
          style={{
            fontSize: 14,
            color: colors.textOnPrimary,
            paddingHorizontal: dimensions.padding.large,
          }}
        />
      );
    }
    return null;
  };
  const renderModalContent = () => (
    <View style={{backgroundColor: 'green'}}>
      <View style={styles.modalContent}>
        {renderTopRow()}
        {renderHeader()}
        <View
          style={{
            paddingHorizontal: dimensions.padding.large,
            paddingVertical: dimensions.padding.small,
          }}>
          {children}
        </View>
      </View>
    </View>
  );

  const renderPropertyDialogContent = () => {
    return (
      <Modal
        isVisible={isVisible}
        backdropColor={colors.blackOverlay}
        deviceWidth={dimensions.SCREEN_WIDTH}
        deviceHeight={dimensions.SCREEN_HEIGHT}
        onBackdropPress={onBackDropPress}
        animationOutTiming={300}
        animationInTiming={300}
        useNativeDriver
        useNativeDriverForBackdrop
        hideModalContentWhileAnimating
        style={styles.bottomModal}>
        {renderModalContent()}
      </Modal>
    );
  };

  return <>{renderPropertyDialogContent()}</>;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    backgroundColor: colors.white,
    borderTopRightRadius: dimensions.border.medium,
    borderTopLeftRadius: dimensions.border.medium,
  },

  bottomModal: {
    marginBottom: 0,
    marginHorizontal: 0,
    justifyContent: 'flex-end',
  },
});

export default BottomSheetDialog;
