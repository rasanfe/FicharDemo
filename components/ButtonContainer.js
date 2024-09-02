import React from 'react';
import { View, StyleSheet } from 'react-native';
import AcceptButton from './AcceptButton';
import CancelButton from './CancelButton';

const ButtonContainer = ({ titleYes, titleNo, onPressYes, onPressNo }) => {
  return (
    <View style={styles.buttonContainer}>
      <AcceptButton title={titleYes} onPress={onPressYes} buttonColor={"#7DC20E"} />
      <CancelButton title={titleNo} onPress={onPressNo} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingBottom: 20,}
  });

export default ButtonContainer;
