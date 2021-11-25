import React from 'react';
import {View, Modal, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {COLORS} from '../../constants/AppConstants';

const Loader = props => {
  return (
    <Modal transparent={true} animationType="none" visible={props.showLoader}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.TRANSPARENT_BLACK,
        }}>
        <View
          style={{
            padding: 13,
            backgroundColor: COLORS.WHITE,
            borderRadius: 13,
          }}>
          <ActivityIndicator
            animating={props.showLoader}
            color={COLORS.APP_COLOR}
            size="large"
          />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.REGALIA,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.REGALIA,
  },
});
