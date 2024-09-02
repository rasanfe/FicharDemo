import { useEffect } from 'react';
import { Alert } from 'react-native';
import EmpleadosService from '../services/EmpleadosService';

const useFetchCompuestoEmpleado = (empresaSelectedUsuario, selectedEmpleado, setCompuestoEmpleado) => {
  useEffect(() => {
    const fetchCompuestoEmpleado = async () => {
      if (!empresaSelectedUsuario || !selectedEmpleado) return; 
      try {
        const compuesto = await EmpleadosService.getCompuestoEmpleado(empresaSelectedUsuario, selectedEmpleado);
        setCompuestoEmpleado(compuesto);
       } catch (error) {
        console.error('Error al obtener el nombre completo del empleado:', error);
        Alert.alert('Error', '¡No puedo obtener el nombre completo del empleado!');
      }
    };
    if (selectedEmpleado && selectedEmpleado) {
      fetchCompuestoEmpleado();
    }
  }, [empresaSelectedUsuario, selectedEmpleado]);
};

export default useFetchCompuestoEmpleado;



