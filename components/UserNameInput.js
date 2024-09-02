import React from 'react';
import { TextInput, StyleSheet, Dimensions } from 'react-native';

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

const UserNameInput = ({ value, onChangeText, editable }) => {
  return (
    <TextInput
      placeholder="Usuario"
      value={value}
      onChangeText={onChangeText}
      onEndEditing={(e) => onChangeText(e.nativeEvent.text.trim())} // Limpiar los espacios en blanco al finalizar la edición
      returnKeyType="next"
      style={styles.input}
      editable={editable}
      allowFontScaling={false}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: height * 0.065,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
});

export default UserNameInput;
