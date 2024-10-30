import React, {Component} from 'react';
import {StyleSheet, View, Platform, ActivityIndicator} from 'react-native';

import Modal from 'react-native-modal';
import {colors} from '../../theme/colors';

type ScreenLoaderProps = {
  isVisible: boolean;
};
const ScreenLoader = ({isVisible}: ScreenLoaderProps) => {
  return (
    <Modal isVisible={isVisible}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <View>
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="large" color={colors.white} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  activityIndicatorWrapper: {
    // backgroundColor: '#FFFFFF',
    height: 150,
    width: 150,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default ScreenLoader;
