import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import useFetchNombreEmpresa from '../hooks/useFetchNombreEmpresa';
import useFetchEmpresaUsuario from '../hooks/useFetchEmpresaUsuario';
import getCompanyColor from '../utils/getCompanyColor';

const { height } = Dimensions.get('window');

const HeaderContainer = ({ userName, onPress }) => {
  const [empresaUsuario, setEmpresaUsuario] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');

  useFetchEmpresaUsuario(userName, setEmpresaUsuario);
  const companyColor = getCompanyColor(empresaUsuario);
  useFetchNombreEmpresa(empresaUsuario, setNombreEmpresa);

  return (
    <View style={[styles.header, { backgroundColor: companyColor }]}>
      <Text allowFontScaling={false} style={styles.headerTitle}>
        {nombreEmpresa ? `${nombreEmpresa} - ${userName}` : 'Cargando nombre de la empresa...'}
      </Text>
      <TouchableOpacity style={styles.logoutIconButton} onPress={onPress} >
        <FontAwesomeIcon icon={faSignOutAlt} color={'#FF0000'} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 25,
    width: '100%',
    height: height * 0.055,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  headerTitle: {
    flex: 1, // Toma todo el espacio disponible entre la izquierda y el botón de logout
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center', // Centra el texto dentro del espacio disponible
  },
  logoutIconButton: {
    marginTop: 3,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    width: height * 0.045,
    height: height * 0.045,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HeaderContainer;
