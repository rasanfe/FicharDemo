import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Text } from 'react-native';
import useAuth from './hooks/useAuth';
import useNavigationBarVisibility from './hooks/useNavigationBarVisibility';



const HomeScreen = ({ navigation }) => {
  const { isLogin, handleAutoLogin } = useAuth(navigation);
  const [isConfigChecked, setIsConfigChecked] = useState(false);
  const [timerExpired, setTimerExpired] = useState(false);
  
  useNavigationBarVisibility(false);

  useEffect(() => {
    const checkConfig = async () => {
      const apiEndpoint = 'https://www.rsrsystem.com/ficharapidemo/api';

      if (!apiEndpoint) {
        // Navegar a la pantalla de Configuración si no existe la configuración
        navigation.replace('Config');
      } else {
        // Continuar con el flujo normal
        setIsConfigChecked(true);
      }
    };

    checkConfig();
  }, [navigation]);

  useEffect(() => {
    if (isConfigChecked) {
      // Configura un temporizador para ejecutar handleAutoLogin después de 3 segundos
      const timer = setTimeout(() => {
        handleAutoLogin();
        setTimerExpired(true);
      }, 1500); // 1500 milisegundos = 1,5 segundos

      // Limpieza del temporizador cuando el componente se desmonte
      return () => clearTimeout(timer);
    }
  }, [isConfigChecked, handleAutoLogin]);

  return (
    <View style={styles.container}>
      <Image source={require('./assets/splash.png')} style={styles.image} />
      {!timerExpired && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  image: {
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
});

export default HomeScreen;
