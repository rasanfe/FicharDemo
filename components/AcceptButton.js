import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');


const AcceptButton = ({ onPress, title, buttonColor }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: buttonColor }]} onPress={onPress}>
    <Text allowFontScaling={false} style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    //paddingVertical: 15,
    //paddingHorizontal: 50, // Aumenta el padding horizontal
    //marginHorizontal: 10,
    width: width * 0.45, // 40% del ancho de la pantalla  //width: 170, // Ancho fijo
    height: height * 0.055, // 6% de la altura de la pantall //height: 45, // Alto fijo
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AcceptButton;
