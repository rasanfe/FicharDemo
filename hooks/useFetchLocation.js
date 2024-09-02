import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

const useFetchLocation = (shouldFetchLocation, setLocation) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLocation = async () => {
      if (shouldFetchLocation) {
        setIsLoading(true);
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Error', '¡Permisos para acceder a la localización denegados!');
          setIsLoading(false);
          return;
        }

        try {
          let location = await Location.getCurrentPositionAsync({});
          setLocation(location);
        } catch (error) {
          Alert.alert('Error', 'No se pudo obtener la localización');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchLocation();
  }, [shouldFetchLocation]);

  return isLoading;
};

export default useFetchLocation;
