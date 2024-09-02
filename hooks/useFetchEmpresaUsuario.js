import { useEffect } from 'react';
import { Alert } from 'react-native';
import UsuariosService from '../services/UsuariosService';

const useFetchEmpresaUsuario = (userName, setEmpresaUsuario) => {
  useEffect(() => {
    const fetchEmpresaUsuario = async () => {
      if (!userName) return; // Salir si userName es inválido

      try {
        const empresa = await UsuariosService.getEmpresaUsuario(userName);
        setEmpresaUsuario(empresa);
      } catch (error) {
        console.error('Error al obtener empresa del usuario:', error);
        Alert.alert('Error', '¡No se pudo obtener la empresa del usuario!');
      }
    };

    fetchEmpresaUsuario();
  }, [userName]);
};

export default useFetchEmpresaUsuario;
