import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../theme/colors';
import {dimensions} from '../../theme/dimensions';
import {images} from '../../assets/images';

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
  const renderModalContent = () => (
    <>
      <View style={[styles.modalContent, {backgroundColor: colors.white}]}>
        <View style={{flexDirection: 'row', flex: 1, marginVertical: 20}}>
          {showTopBar && (
            <View
              style={{
                width: 50,
                height: 10,
                borderRadius: dimensions.borderRadiusLarge,
                alignSelf: 'center',
                backgroundColor: colors.black,
              }}></View>
          )}
          {showCrossIcon && (
            <Pressable
              onPress={closeModal}
              style={{
                width: 50,
                height: 50,
                borderRadius: dimensions.borderRadiusLarge,
                alignSelf: 'flex-end',
                backgroundColor: colors.black,
                marginVertical: 20,
              }}>
              <Image
                source={images.cross}
                style={{height: 30, width: 30}}
                tintColor={colors.black}
              />
            </Pressable>
          )}
        </View>
        {!!header && (
          <Text
            numberOfLines={2}
            style={{
              fontSize: 14,
              color: colors.textOnPrimary,
              paddingHorizontal: dimensions.paddingLarge,
            }}
          />
        )}

        <View
          style={{
            paddingHorizontal: dimensions.paddingLarge,
            paddingVertical: dimensions.paddingSmall,
          }}>
          {children}
        </View>
      </View>
    </>
  );

  const renderPropertyDialogContent = () => {
    return (
      <Modal
        isVisible={isVisible}
        backdropColor={colors.background}
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
    borderTopRightRadius: dimensions.borderRadiusMedium,
    borderTopLeftRadius: dimensions.borderRadiusMedium,
  },

  bottomModal: {
    marginBottom: 0,
    marginHorizontal: 0,
    justifyContent: 'flex-end',
  },
});

export default BottomSheetDialog;
