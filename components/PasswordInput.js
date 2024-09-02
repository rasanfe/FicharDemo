import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

const PasswordInput = ({ value, onChangeText, showPassword, setShowPassword, editable }) => {
  return (
    <View style={styles.passwordContainer}>
      <TextInput
        placeholder="PIN"
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={!showPassword}
        returnKeyType="done"
        keyboardType="numeric"
        maxLength={4}
        style={styles.input}
        editable={editable}
        allowFontScaling={false}
      />
      <TouchableOpacity 
        style={styles.showButton} 
        onPress={() => setShowPassword(!showPassword)} 
        disabled={!editable}
      >
        <Ionicons 
          name={showPassword ? 'eye-off-outline' : 'eye-outline'} 
          size={24} 
          color="#0080FF" 
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  input: {
    flex: 1,
    height: height * 0.065,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  showButton: {
    marginLeft: 10, // Ajusta este valor según sea necesario
    justifyContent: 'center',
  },
});

export default PasswordInput;

