import React from 'react';
import { Pressable, StyleSheet, Text, View, Dimensions  } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

const MyCheckbox = ({ checked, onChange, label, disabled }) => {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.checkboxBase, checked && styles.checkboxChecked]}
        onPress={onChange}
        disabled={disabled}
      >
        {checked && <Ionicons name="checkmark" size={24} color="white" />}
      </Pressable>
      {label && (
        <Pressable onPress={onChange} disabled={disabled}>
          <Text allowFontScaling={false} style={[styles.label, disabled && styles.labelDisabled]}>{label}</Text>
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxBase: {
    width: height * 0.028,
    height: height * 0.028,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#0080FF',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: '#0080FF',
  },
  label: {
    marginLeft: 8,
    fontSize: 16,
    color: '#0080FF',
    fontWeight: '500',
  },
});

export default MyCheckbox;
