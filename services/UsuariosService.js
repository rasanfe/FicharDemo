import ApiManager from './ApiManagerService';

const controller = "Usuarios";

class UsuariosService {
  async getEmpresaUsuario(usuario) {
    const method = "EmpresaUsuario";
    const url = ApiManager.getUrl(controller, method);
    const endpoint = `${url}/${usuario}`;
     try {
      const response = await ApiManager.sendGetRequest(endpoint);
      return response.data.empresaUsuario;
    } catch (error) {
      throw error;
    }
  }

  async getGrupoUsuario(usuario) {
    const method = "GrupoUsuario";
    const url = ApiManager.getUrl(controller, method);
    const endpoint = `${url}/${usuario}`;
    try {
      const response = await ApiManager.sendGetRequest(endpoint);
      return response.data.grupoUsuario;
    } catch (error) {
      throw error;
    }
  }

  async getEmpleadoUsuario(usuario) {
    const method = "EmpleadoUsuario";
    const url = ApiManager.getUrl(controller, method);
    const endpoint = `${url}/${usuario}`;
     try {
      const response = await ApiManager.sendGetRequest(endpoint);
      return response.data.empleadoUsuario;
    } catch (error) {
      throw error;
    }
  }

  async getUsuarioEmpleado(empresa, empleado) {
    const method = "UsuarioEmpleado";
    const url = ApiManager.getUrl(controller, method);
    const endpoint = `${url}/${empresa}/${empleado}`;
    try {
      const response = await ApiManager.sendGetRequest(endpoint);
      return response.data.usuarioEmpleado;
    } catch (error) {
      throw error;
    }
  }

  
}

export default new UsuariosService(); 

