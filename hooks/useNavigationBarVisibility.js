import { useEffect } from 'react';
import * as NavigationBar from 'expo-navigation-bar';

const useNavigationBarVisibility = (isVisible) => {
  useEffect(() => {
    const setNavigationBarVisibility = async () => {
      if (isVisible) {
        await NavigationBar.setVisibilityAsync('visible');
      } else {
        await NavigationBar.setVisibilityAsync('hidden');
      }
    };

    setNavigationBarVisibility();
  }, [isVisible]);
};

export default useNavigationBarVisibility;
