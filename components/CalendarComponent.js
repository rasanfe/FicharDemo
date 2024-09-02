import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';


// Configura moment para usar el idioma español
LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ],
  monthNamesShort: [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
  ],
  dayNames: [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
  ],
  dayNamesShort: [
    'Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'
  ],
  today: 'Hoy',
};

// Establece el idioma por defecto en español
LocaleConfig.defaultLocale = 'es';

const CalendarComponent = ({ onDayPress }) => {
  
  return (
    <View style={styles.calendarContainer}>
      <Calendar 
        onDayPress={onDayPress}
        firstDay={1}
        locale = {'es'}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  calendarContainer: {
    marginBottom: 20,
    width: '75%',
    height: '40%', 
  },
});

export default CalendarComponent;