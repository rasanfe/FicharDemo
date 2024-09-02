import { useEffect } from 'react';
import { Alert } from 'react-native';
import UsuariosService from '../services/UsuariosService';

const useFetchGrupoUsuario = (userName, setGrupoUsuario) => {
  useEffect(() => {
    const fetchGrupoUsuario = async () => {
      try {
        if (!userName) return; 
        const grupo = await UsuariosService.getGrupoUsuario(userName);
        setGrupoUsuario(grupo);
      } catch (error) {
        console.error('Error al obtener grupo del usuario:', error);
        Alert.alert('Error', '¡No se pudo obtener la grupo del usuario!');
      }
    };

    if (userName) {
      fetchGrupoUsuario();
    }
  }, [userName]);
};

export default useFetchGrupoUsuario;
