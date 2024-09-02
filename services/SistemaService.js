import ApiManager from './ApiManagerService';


const controller = "Sistema";

class SistemaService {
  
    async getNombreEmpresa(empresa) {
    const method = "NombreEmpresa";
    const url = ApiManager.getUrl(controller, method);
    const endpoint = `${url}/${empresa}`;
    try {
      const response = await ApiManager.sendGetRequest(endpoint);
      return response.data.nombreEmpresa;
    } catch (error) {
      throw error;
    }
  }
}

export default new SistemaService();


