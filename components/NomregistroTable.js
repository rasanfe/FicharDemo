import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet, Dimensions } from 'react-native';
import { formatDate } from '../utils/DateUtils'; // Ajusta la ruta si es necesario

// Obtener las dimensiones de la pantalla
const { width, height } = Dimensions.get('window');

const NomregistroTable = ({ data, headerColor, onDelete, onModify, grupoUsuario }) => {
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Limpiar selectedItem cuando cambia el conjunto de datos
    setSelectedItem(null);
  }, [data]); // Dependencia data

  const getModeLabel = (mode) => {
    switch (mode) {
      case 34:
        return 'Fichador';
      case 37:
        return 'Movil';
      case 36:
        return 'Erp';
      case 35:
        return 'Modificado';
      case 32: 
        return 'Insertado';  
      case 33:
        return 'Erp';
      default:
        return 'Error';
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleSelectItem(item)} disabled={grupoUsuario !== '1' && grupoUsuario !== '9'} >
      <View style={[styles.tableRow, selectedItem === item && { backgroundColor: '#f0f0f0' }]}>
        <Text allowFontScaling={false} style={styles.tableCell}>{item.Enno}</Text>
        <Text allowFontScaling={false} style={styles.tableCell}>{item.Name}</Text>
        <Text allowFontScaling={false} style={styles.tableCell}>{formatDate(item.Datetime)}</Text>
        <Text allowFontScaling={false} style={styles.tableCell}>{getModeLabel(item.Mode)}</Text>
      </View>
    </TouchableOpacity>
  );

  const handleSelectItem = (item) => {
    setSelectedItem(item);
  };

  const handleDeleteItem = async () => {
    if (!selectedItem) {
      return;
    }

    try {
      const confirmDelete = await showConfirmation('borrar');

      if (confirmDelete) {
        onDelete(selectedItem.No);
      }
      setSelectedItem(null);
    } catch (error) {
      console.error('Error al borrar Fichaje:', error);
      Alert.alert('Error', '¡Error al borrar Fichaje!');
    }
  };
  const handleModifyItem = () => {
    if (!selectedItem) {
      return;
    }
    onModify(selectedItem);
    setSelectedItem(null);
  };

  const showConfirmation = (action) => {
    return new Promise((resolve, reject) => {
      Alert.alert(
        'Confirmar',
        `¿Estás seguro de que quieres ${action} el fichaje del ${formatDate(selectedItem.Datetime)}?`,
        [
          { text: 'Cancelar', onPress: () => resolve(false), style: 'cancel' },
          { text: 'Sí', onPress: () => resolve(true) },
        ],
        { cancelable: false }
      );
    });
  };

  return (
    <View style={styles.tableContainer}>
      <View style={[styles.tableHeader, { backgroundColor: headerColor }]}>
        <Text allowFontScaling={false} style={[styles.tableCell, styles.tableHeaderText]}>Codigo</Text>
        <Text allowFontScaling={false} style={[styles.tableCell, styles.tableHeaderText]}>Usuario</Text>
        <Text allowFontScaling={false} style={[styles.tableCell, styles.tableHeaderText]}>Fecha</Text>
        <Text allowFontScaling={false} style={[styles.tableCell, styles.tableHeaderText]}>Dispositivo</Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.No.toString()}
        style={styles.table}
        initialNumToRender={6}
      />
      {selectedItem && (grupoUsuario === '1' || grupoUsuario ==='9') && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.buttonFichar]} onPress={handleModifyItem}>
            <Text allowFontScaling={false} style={styles.buttonText}>Modificar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonSalir]} onPress={handleDeleteItem}>
            <Text allowFontScaling={false} style={styles.buttonText}>Borrar</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* Texto que muestra el número de registros */}
      <View style={styles.recordCountContainer}>
        {data.length > 0 && (
          <Text allowFontScaling={false} style={[styles.recordCountText, { color: headerColor }]}>
            {data.length} {data.length === 1 ? 'Registro' : 'Registros'}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tableContainer: {
    height: height *0.43,
  },
  table: {
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#0080FF',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableHeaderText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    fontSize: 12,
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableCell: {
    fontSize: 10,
    textAlign: 'center',
    flex: 1,
    paddingVertical: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  button: {
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
    width: 100,
  },
  buttonFichar: {
    backgroundColor: '#7DC20E',
  },
  buttonSalir: {
    backgroundColor: '#DD5044',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  recordCountContainer: {
    alignItems: 'center',
    marginTop: 10, // Espacio entre la tabla y el texto
  },
  recordCountText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
export default NomregistroTable;
