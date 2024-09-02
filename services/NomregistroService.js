import ApiManager from './ApiManagerService';

const controller = "Nomregistro";

class NomregistroService {

  async retrieve(empresa, empleado, fecha) {
    const method = "Retrieve";
    const url = ApiManager.getUrl(controller, method);
    const endpoint = `${url}/${empresa}/${empleado}/${fecha}`;
    try {
      const response = await ApiManager.sendGetRequest(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async fichar(empresa, empleado, latitud, longitud) {
    const method = "Fichar";
    const url = ApiManager.getUrl(controller, method);
    const request = {
      Empresa: empresa,
      Empleado: empleado,
      Latitud: latitud,
      Longitud: longitud
    };
    try {
      const response = await ApiManager.sendPostRequest(url, request);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async cambiarHora(id, nuevaHora) {
    const method = "CambiarHora";
    const url = ApiManager.getUrl(controller, method);
    const request = {
      Id: id,
      NuevaHora: nuevaHora
    };
    try {
      const response = await ApiManager.sendPostRequest(url, request);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async borrarFichaje(id) {
    const method = "BorrarFichaje";
    const url = ApiManager.getUrl(controller, method);
    const request = {
      Id: id
    };
    try {
      const response = await ApiManager.sendPostRequest(url, request);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new NomregistroService();
