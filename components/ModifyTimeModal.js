import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Modal, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { formatTime } from '../utils/DateUtils';

const ModifyTimeModal = ({ companyColor, isVisible, initialTime, onClose }) => {
  const [selectedTime, setSelectedTime] = useState(formatTime(new Date(initialTime)));
  const [editingTime, setEditingTime] = useState(false);
  const inputRef = useRef(null); // Crear una referencia para el TextInput

  useEffect(() => {
    setSelectedTime(formatTime(new Date(initialTime)));
  }, [initialTime]);

  useEffect(() => {
    if (isVisible) {
      setEditingTime(true);
      // Esperar un pequeño tiempo antes de enfocar el TextInput
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 100); // 100ms de espera para asegurarse de que el TextInput esté listo
    }
  }, [isVisible]);

  const handleTimeChange = (text) => {
    // Reemplaza cualquier carácter no numérico ni ":" y controla el formato HH:MM
    let formattedText = text.replace(/[^0-9]/g, '');

    if (formattedText.length >= 3) {
      formattedText = `${formattedText.slice(0, 2)}:${formattedText.slice(2, 4)}`;
    }

    setSelectedTime(formattedText);
  };

  const handleSave = () => {
    const [hours, minutes] = selectedTime.split(':').map(Number);

    // Validar si la hora está en el rango 00-23 y los minutos en el rango 00-59
    if (
      !isNaN(hours) &&
      !isNaN(minutes) &&
      hours >= 0 &&
      hours <= 23 &&
      minutes >= 0 &&
      minutes <= 59
    ) {
      const newTime = new Date(initialTime);
      newTime.setHours(hours);
      newTime.setMinutes(minutes);

      onClose(newTime);
    } else {
      Alert.alert('Hora no válida', 'Por favor, ingresa una hora válida entre 00:00 y 23:59');
    }
  };

  const handleCancel = () => {
    onClose(null); // No hacer nada y cerrar el modal
  };

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onClose(null)}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setEditingTime(true)}>
            <Text allowFontScaling={false} style={styles.title}>Seleccionar Hora</Text>
            <TextInput
              ref={inputRef} // Asignar la referencia al TextInput
              style={[styles.timeInput, { borderColor: companyColor }]}
              value={selectedTime}
              onChangeText={handleTimeChange}
              keyboardType="number-pad"
              maxLength={5} // Limitar a formato HH:MM
              editable={editingTime}
              selectTextOnFocus={true} // Seleccionar todo el texto al enfocar
              onBlur={() => setEditingTime(false)}
              placeholder="HH:MM"
              returnKeyType="done"
              allowFontScaling={false}
            />
          </TouchableOpacity>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
              <Text allowFontScaling={false} style={styles.buttonText}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
              <Text allowFontScaling={false} style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
  },
  timeInput: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    borderBottomWidth: 1,
    padding: 5,
    width: 100,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    margin: 5,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  cancelButton: {
    backgroundColor: '#F44336',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ModifyTimeModal;
