import React, { useState, useEffect } from 'react';
import { View, Alert, BackHandler, Platform, StyleSheet, ActivityIndicator } from 'react-native';
import HeaderContainer from './components/HeaderContainer';
import CalendarComponent from './components/CalendarComponent';
import ButtonContainer from './components/ButtonContainer';
import NomregistroTable from './components/NomregistroTable';
import ModifyTimeModal from './components/ModifyTimeModal';
import { getLocalDate, getDateWithoutTimeString, formatTime, setDatetoLocal } from './utils/DateUtils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NomregistroService from './services/NomregistroService';
import useFetchEmpresaUsuario from './hooks/useFetchEmpresaUsuario';
import useFetchGrupoUsuario from './hooks/useFetchGrupoUsuario';
import useFetchEmpleadoUsuario from './hooks/useFetchEmpleadoUsuario';
import useFetchLocation from './hooks/useFetchLocation';
import getCompanyColor from './utils/getCompanyColor';
import useNavigationBarVisibility from './hooks/useNavigationBarVisibility';

const FicharScreen = ({ route, navigation }) => {
  const { userName } = route.params;
  const [empresaUsuario, setEmpresaUsuario] = useState('');
  const [grupoUsuario, setGrupoUsuario] = useState('');
  const [empleadoUsuario, setEmpleadoUsuario] = useState('');
  const [location, setLocation] = useState(null);
  const [shouldFetchLocation, setShouldFetchLocation] = useState(false);
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModifyModalVisible, setModifyModalVisible] = useState(false); 
  const [selectedItem, setSelectedItem] = useState(null); 
  const [isDataLoading, setIsDataLoading] = useState(false);
     
  useFetchEmpresaUsuario(userName, setEmpresaUsuario);
  useFetchGrupoUsuario(userName, setGrupoUsuario);
  useFetchEmpleadoUsuario(userName, setEmpleadoUsuario);
  useNavigationBarVisibility(false);
 
  const isLoading = useFetchLocation(shouldFetchLocation, setLocation);

 
  const companyColor = getCompanyColor(empresaUsuario);

  // Prevenir que el botón de retroceso haga algo
   useEffect(() => {
    const backAction = () => {
      return true; 
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);


  
  const fetchRetrieve = async (empresa = empresaUsuario, empleado = empleadoUsuario, date = new Date()) => {
    if (!empresa || !empleado) return; 
    setIsDataLoading(true); // Inicia la carga
    try {
      const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      const jsonData = await NomregistroService.retrieve(empresa, empleado, formattedDate);
      setData(jsonData); // Actualiza el estado con los datos del JSON
    } catch (error) {
      console.error('Error al obtener datos:', error);
      Alert.alert('Error', '¡Error al obtener datos!');
    } finally {
      setIsDataLoading(false); // Finaliza la carga
    } 
  };

  // Llama fetchRetrieve al entrar a la ventana con la fecha de hoy
  useEffect(() => {
    if (empresaUsuario && empleadoUsuario) {
      fetchRetrieve(empresaUsuario, empleadoUsuario, new Date()); // Llama con la fecha de hoy por defecto
    }
  }, [empresaUsuario, empleadoUsuario]);


  const handleDayPress = (day) => {
    fetchRetrieve(empresaUsuario, empleadoUsuario, new Date(day.dateString)); 
    const daySelected = setDatetoLocal(new Date(day.dateString))
    setSelectedDate(daySelected);
    };


  const handleFichar = async () => {
    try {
      const currentDate = getLocalDate();
      const currentDateWithoutTime = getDateWithoutTimeString(currentDate);
      const selectedDateWithoutTime = getDateWithoutTimeString(selectedDate);

      const now = new Date();

      // Controles solo para usuarios no administradores.
      if (grupoUsuario !== "1" ) {
        if (currentDateWithoutTime !== selectedDateWithoutTime) {
          Alert.alert('Fecha incorrecta', 'Solo puedes fichar en la fecha actual.');
          return;
        }
      } 

      // Activa la obtención de la ubicación
      setShouldFetchLocation(true);

    } catch (error) {
      console.error('Error al grabar Fichaje:', error);
      Alert.alert('Error', '¡Error al grabar Fichaje!');
    }
  };

  // useEffect para manejar la lógica de fichaje una vez que la ubicación se haya obtenido
  useEffect(() => {
    if (shouldFetchLocation && location) {
      const realizarFichaje = async () => {
        try {
          console.log("Cordenadas Fichaje: " + location.coords.latitude +" "+location.coords.longitude);
          await NomregistroService.fichar(empresaUsuario, empleadoUsuario, location.coords.latitude, location.coords.longitude);
          
          fetchRetrieve(empresaUsuario, empleadoUsuario, selectedDate); // Llama a fetchRetrieve para actualizar la tabla después de fichar
         
        } catch (error) {
          console.error('Error al grabar Fichaje:', error);
          Alert.alert('Error', '¡Error al grabar Fichaje!');
        } finally {
          // Desactiva la obtención de ubicación para el próximo fichaje
          setShouldFetchLocation(false);
        }
      };

      realizarFichaje();
    }
  }, [shouldFetchLocation, location]);

  const handleDelete = async (No) => {
    try {
      const currentDate = getLocalDate();
      const currentDateWithoutTime = getDateWithoutTimeString(currentDate);
      const selectedDateWithoutTime = getDateWithoutTimeString(selectedDate);
      if (currentDateWithoutTime !== selectedDateWithoutTime) {
        Alert.alert('Fecha incorrecta', 'Solo puedes borrar fichajes en la fecha actual.');
        return;
      }

      await NomregistroService.borrarFichaje(No);

      fetchRetrieve(empresaUsuario, empleadoUsuario, selectedDate); // Actualizar la tabla después de borrar

     } catch (error) {
      console.error('Error al borrar fichaje:', error);
      Alert.alert('Error', '¡Error al borrar fichaje!');
    }
  };

   // Función para abrir el modal de modificación de hora
   const handleOpenModifyModal = (item) => {
    setSelectedItem(item); 
    setModifyModalVisible(true); 
  };

  // Función para cerrar el modal de modificación de hora
  const handleCloseModifyModal = (newTime) => {
    setModifyModalVisible(false); 
    if (newTime) {
      handleModify(selectedItem.No, newTime); 
    }
  };

  const handleModify = async (No, newTime) => {
    try {
      const currentDate = getLocalDate();
      const currentDateWithoutTime = getDateWithoutTimeString(currentDate);
      const selectedDateWithoutTime = getDateWithoutTimeString(selectedDate);
      if (currentDateWithoutTime !== selectedDateWithoutTime) {
        Alert.alert('Fecha incorrecta', 'Solo puedes modificar fichajes en la fecha actual.');
        return;
      }
  
      // Obtener la fecha y hora actual del fichaje antes de modificar
      const currentRecord = data.find(item => item.No === No);
      const currentDateTime = new Date(currentRecord.Datetime);
  
      // Formatear las horas para el identificador
      const oldTimeFormatted = formatTime(currentDateTime);
      const newTimeFormatted = formatTime(newTime);
     
      if (oldTimeFormatted == newTimeFormatted){return;}
  
      await NomregistroService.cambiarHora(No, setDatetoLocal(newTime));
      fetchRetrieve(empresaUsuario, empleadoUsuario, selectedDate); 
  
       
    } catch (error) {
      console.error('Error al modificar fichaje:', error);
      Alert.alert('Error', '¡Error al modificar fichaje!');
    }
  };

  const handleLogout = async () => {
       // Eliminar datos almacenados localmente
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('password');
      await AsyncStorage.removeItem('rememberMe');
    
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
  };

  const handleExit = async () => {
            
       if (Platform.OS === 'android') {
         BackHandler.exitApp();
       }

       navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
   };


  return (
    <View style={styles.container}>
      <HeaderContainer 
        userName={userName} 
        onPress={handleLogout} 
      />
      <CalendarComponent onDayPress={handleDayPress} />
      <View style={styles.tableContainer}>
        <NomregistroTable data={data} headerColor={companyColor} onDelete={handleDelete} onModify={handleOpenModifyModal}  grupoUsuario={grupoUsuario}/>
      </View>
      <ModifyTimeModal
        isVisible={isModifyModalVisible}
        initialTime={selectedItem ? selectedItem.Datetime : new Date()} 
        onClose={handleCloseModifyModal} 
      />
      <ButtonContainer 
        titleYes={"Fichar"} 
        onPressYes={handleFichar} 
        titleNo="Salir" 
        onPressNo={handleExit} 
      />
      {(isLoading || isDataLoading) && (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
      )}
  </View>    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tableContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
  },  
  loadingOverlay: {
    position: 'absolute',
    bottom: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  }, 
});


export default FicharScreen;

