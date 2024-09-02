import ApiManager from './ApiManagerService';

const controller = "Empleados";

class EmpleadosService {

  async getCompuestoEmpleado(empresa, empleado) {
    const method = "CompuestoEmpleado";
    const url = ApiManager.getUrl(controller, method);
    const endpoint = `${url}/${empresa}/${empleado}`;
    try {
      const response = await ApiManager.sendGetRequest(endpoint);
      return response.data.compuestoEmpleado;
    } catch (error) {
      throw error;
    }
  }

}

export default new EmpleadosService();
