import React, { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiManager from '../services/ApiManagerService';

const useAuth = (navigation) => {
  const [loading, setLoading] = useState(false);

  const handleLogin = useCallback(async (userName, password, rememberMe) => {
    setLoading(true);
    try {
      const success = await ApiManager.login(userName, password);
      if (success) {
        if (rememberMe) {
          await AsyncStorage.setItem('userName', userName);
          await AsyncStorage.setItem('password', password);
          await AsyncStorage.setItem('rememberMe', 'true');
        } else {
          await AsyncStorage.removeItem('userName');
          await AsyncStorage.removeItem('password');
          await AsyncStorage.removeItem('rememberMe');
        }

        navigation.navigate('Fichar', { userName });
        return true;
      } else {
        Alert.alert('Error', ApiManager.getLastError());
           navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        return false;
      }
    } catch (error) {
      console.error('Error during login:', error);
      return false;
    } finally {
      setLoading(false);
    }
  }, [navigation]);

  const handleAutoLogin = useCallback(async () => {
    setLoading(true);
    try {
      const storeduserName = await AsyncStorage.getItem('userName');
      const storedPassword = await AsyncStorage.getItem('password');
      const storedRememberMe = await AsyncStorage.getItem('rememberMe');

      if (storeduserName && storedPassword && storedRememberMe === 'true') {
            await handleLogin(storeduserName, storedPassword, true);
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
      }
    }  catch (error) {
      console.error('Failed to load stored data', error);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }],
      });
    } finally {
      setLoading(false);
    }
  }, [handleLogin, navigation]);

  return {
    loading,
    handleLogin,
    handleAutoLogin,
  };
};

export default useAuth;

