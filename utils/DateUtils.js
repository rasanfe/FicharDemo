// utils/DateUtils.js
export const getLocalDate = () => {
    const localDate = setDatetoLocal(new Date());
    return localDate;
  };

  export const setDatetoLocal = (utcDate) => {
    const offsetMinutes = utcDate.getTimezoneOffset();
    const localDate = new Date(utcDate.getTime() - offsetMinutes * 60 * 1000);
    return localDate;
  };
  
  export const formatDate = (datetime) => {
    const dateObj = new Date(datetime);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

  export const formatDateWithoutTime = (datetime) => {
    const dateObj = new Date(datetime);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year}`;
  };

  // export const formatTime = (date) => {
  //   const hours = date.getHours().toString().padStart(2, '0');
  //   const minutes = date.getMinutes().toString().padStart(2, '0');
  //   return `${hours}:${minutes}`;
  // };
  
  export const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  
  

  export const getDateWithoutTimeString = (datetime) => {
    const dateWithoutTimeString = datetime.toISOString().split('T')[0]; // Fecha actual sin hora
    return dateWithoutTimeString;
};
