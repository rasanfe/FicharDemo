import React, { useEffect, useState } from 'react';
import { View, Image, Alert, BackHandler, Platform, StyleSheet, ActivityIndicator, Text } from 'react-native';
import ButtonContainer from './components/ButtonContainer';
import UserNameInput from './components/UserNameInput';
import PasswordInput from './components/PasswordInput';
import MyCheckbox from './components/MyCheckbox';
import useAuth from './hooks/useAuth';
import useNavigationBarVisibility from './hooks/useNavigationBarVisibility';
import Constants from 'expo-constants';
import {formatDateWithoutTime} from './utils/DateUtils';

const LoginScreen = ({ navigation }) => {
  const [userName, setuserName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { isLoading, handleLogin } = useAuth(navigation);

  useNavigationBarVisibility(false);

  // Prevenir que el botón de retroceso haga algo
  useEffect(() => {
    const backAction = () => {
      return true; 
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, []);
 
  const handleLoginPress = async () => {

    const success = await handleLogin(userName, password, rememberMe);
    
    if (success) {
      resetFields();
    }
  };

  const handleExit = () => {
     navigation.reset({
       index: 0,
       routes: [{ name: 'Home' }],
     });
    //navigation.navigate('Home');
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    } else {
      Alert.alert('Cerrar la aplicación no está permitido en iOS');
    }
  };

  const handleuserNameChange = (text) => {
    setuserName(text.toUpperCase());
  };

  const resetFields = () => {
    setuserName('');
    setPassword('');
    setRememberMe(false);
  };

  // Obtener y formatear la fecha de compilación
  const buildDate = formatDateWithoutTime(new Date(Constants.expoConfig.extra.buildDate));
  const appName = Constants.expoConfig.name;
  const version = Constants.expoConfig.version;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logo.jpg')} style={styles.logo} />
      </View>
      <View style={styles.content}>
        <UserNameInput
          value={userName}
          onChangeText={handleuserNameChange}
          editable={!isLoading}
        />
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          editable={!isLoading}
        />
        <View style={styles.checkboxContainer}>
          <MyCheckbox
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
            label="Recordar"
            disabled={isLoading}
          />
        </View>
         {/* <Text style={styles.text}>POWERBUILDER TALKS 2025</Text>*/}
      </View>
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <ButtonContainer titleYes="Aceptar" onPressYes={handleLoginPress} titleNo="Salir" onPressNo={handleExit} disabled={isLoading} />
      <View style={styles.versionContainer}>
        <Text allowFontScaling={false} style={styles.versionText}>{appName} v.{version} {buildDate}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  header: {
    marginTop: 20,
    width: '100%',
    height: 100,
    backgroundColor: '#0080FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 229,
    height: 72,
    resizeMode: 'contain',
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxContainer: {
    width: '80%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  versionContainer: {
    alignItems: 'flex-end',
    paddingRight: 10,
    paddingBottom: 20,
  },
  versionText: {
    color: 'blue',
    fontSize: 12,
  },
});

export default LoginScreen;
