import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {colors} from '../../theme/colors';
import {dimensions} from '../../theme/dimensions';

type BottomSheetDialogProps = {
  isVisible: boolean;
  closeModal: () => void;
  header?: string;
  showTopBar?: boolean;
  children: React.ReactNode;
};
const BottomSheetDialog = ({
  isVisible,
  closeModal,
  header,
  showTopBar = true,
  children,
}: BottomSheetDialogProps) => {
  const renderModalContent = () => (
    <>
      <View style={[styles.modalContent, {backgroundColor: colors.white}]}>
        {showTopBar && (
          <View
            style={{
              width: 50,
              height: 10,
              borderRadius: dimensions.borderRadiusLarge,
              alignSelf: 'center',
              backgroundColor: colors.black,
              marginVertical: 20,
            }}></View>
        )}
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
        onBackdropPress={closeModal}
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
