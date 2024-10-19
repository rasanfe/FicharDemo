import React, { useEffect, useState } from 'react';
import { View, Image, ActivityIndicator, StyleSheet, Text } from 'react-native';
import useNavigationBarVisibility from './hooks/useNavigationBarVisibility';
import useAuth from './hooks/useAuth';

const HomeScreen = ({ navigation }) => {
  const { isLogin, handleAutoLogin } = useAuth(navigation);
  const [timerExpired, setTimerExpired] = useState(false);
  useNavigationBarVisibility(false);

  useEffect(() => {
      // Configura un temporizador para ejecutar handleAutoLogin después de 3 segundos
      const timer = setTimeout(() => {
        handleAutoLogin();
        setTimerExpired(true);
      }, 1500); // 1500 milisegundos = 1,5 segundos

      // Limpieza del temporizador cuando el componente se desmonte
      return () => clearTimeout(timer);

  },);

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
