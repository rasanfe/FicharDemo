import axios from 'axios';

class ApiManagerService {
  constructor() {
    this.apiUrl = ''; // Inicialmente vacío
    this.jwtToken = '';
    this.errorText = '';
    this.axiosInstance = null; // Lo inicializaremos después de cargar el `apiUrl`

    this.initialize();
  }

  async initialize() {
    try {
          
      this.apiUrl = 'https://www.rsrsystem.com/ficharapidemo/api';
      //this.apiUrl = 'http://10.0.2.2:5950/api'; 
    
      this.axiosInstance = axios.create({
        baseURL: this.apiUrl
      });
    } catch (error) {
      console.error('Error:', error);
    } 
  }

  getLastError() {
    return this.errorText;
  }

  getUrl(controller, method) {
    return `${this.apiUrl}/${controller}/${method}`;
  }

  async sendGetRequest(url) {
    try {
      const response = await this.axiosInstance.get(url, this.getAuthHeaders());
      return response;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

 
  async sendPostRequest(url, data) {
    try {
      const response = await this.axiosInstance.post(url, data, this.getAuthHeaders());
      return response;
    } catch (error) {
      this.handleError(error);
      return null;
    }
  }

  async login(user, pin) {
    
    const url = this.getUrl('Auth', 'Login');
    
    const authUser = { Username: user, Password: pin };

    console.log(url);
    console.log(authUser);

    try {
      const response = await this.sendPostRequest(url, authUser);
      console.log(response.data);
           if (response.data == true ) {
              return true;
      } else {
        this.errorText = 'Usuario o Contraseña Incorrecta';
        return false;
      }
    } catch (error) {
      return false;
    }
  }


  handleError(error) {
    if (error.response) {
      this.errorText = `Error ${error.response.status}: ${error.response.data}`;
    } else if (error.request) {
      this.errorText = 'No response received from server';
    } else {
      this.errorText = `Error in request setup: ${error.message}`;
    }
  }

  getAuthHeaders() {
    const headers = {
      'Content-Type': 'application/json;charset=UTF-8',
      'Accept': 'application/json',
      'Accept-Encoding': 'gzip'
    };

    return { headers: headers };
  }
}

export default new ApiManagerService();
