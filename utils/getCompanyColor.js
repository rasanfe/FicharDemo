const getCompanyColor = (empresa) => {

    if (!empresa) return '#0080FF'; 
    
    switch (empresa) {
      case '1':
        return '#0080FF';
      case '2':
        return '#009B66';
      case '3':
        return '#000080';
      case '4':
        return '#FF6200';
      default:
        return '#0080FF'; // color por defecto si no coincide con ninguna empresa
    }
  };
  
  export default getCompanyColor;
  