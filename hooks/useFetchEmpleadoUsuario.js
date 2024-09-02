import { useEffect } from 'react';
import { Alert } from 'react-native';
import UsuariosService from '../services/UsuariosService';

const useFetchEmpleadoUsuario = (userName, setEmpleadoUsuario) => {
  useEffect(() => {
    const fetchEmpleadoUsuario = async () => {
      if (!userName) return; 
      try {
        const empleado = await UsuariosService.getEmpleadoUsuario(userName);
        setEmpleadoUsuario(empleado);
      } catch (error) {
        console.error('Error al obtener el código de empleado del usuario:', error);
        Alert.alert('Error', '¡No puedo obtener el código de empleado del usuario!');
      }
    };
    if (userName) {
      fetchEmpleadoUsuario();
    }
  }, [userName]);
};

export default useFetchEmpleadoUsuario;
