import { useEffect } from 'react';
import { Alert } from 'react-native';
import UsuariosService from '../services/UsuariosService';

const useFetchUsuarioEmpleado = (selectedEmpresaUsuario, selectedEmpleado, setSelectedUser) => {
  useEffect(() => {
    const fetchUsuarioEmpleado = async () => {
      if (!selectedEmpresaUsuario || !selectedEmpleado) return; 
      try {
        const usuario = await UsuariosService.getUsuarioEmpleado(selectedEmpresaUsuario, selectedEmpleado);
        setSelectedUser(usuario);
       } catch (error) {
        console.error('Error al obtener el código de empleado del usuario:', error);
        Alert.alert('Error', '¡No puedo obtener el código de empleado del usuario!');
      }
    };
    if (selectedEmpleado && selectedEmpleado) {
      fetchUsuarioEmpleado();
    }
  }, [selectedEmpresaUsuario, selectedEmpleado]);
};

export default useFetchUsuarioEmpleado;



