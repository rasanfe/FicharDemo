import { useEffect } from 'react';
import { Alert } from 'react-native';
import SistemaService from '../services/SistemaService';

const useFetchNombreEmpresa = (empresaUsuario, setNombreEmpresa) => {
  useEffect(() => {
    const fetchNombreEmpresa = async () => {
      if (!empresaUsuario) return; // Salir si empresaUsuario es inválido

      try {
        const nombre = await SistemaService.getNombreEmpresa(empresaUsuario);
        setNombreEmpresa(nombre);
      } catch (error) {
        console.error('Error al obtener nombre de la empresa:', error);
        Alert.alert('Error', '¡No se pudo obtener el nombre de la empresa!');
      }
    };

    fetchNombreEmpresa();
  }, [empresaUsuario]);
};

export default useFetchNombreEmpresa;
