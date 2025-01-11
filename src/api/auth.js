import axios from "./axios";

export const registerRequest = async (user) => await axios.post(`/register`,user);

export const loginRequest = async (data) => {
    try {
      const response = await axios.post('/login', data); // Ajusta la ruta según sea necesario
      return response;
    } catch (error) {
      if (error.response) {
        // Error de respuesta del backend
        throw new Error(error.response.data.message || "Error desconocido del servidor");
      }
      // Error de red u otros problemas
      throw new Error(error.message || "Error desconocido");
    }
  };
  
export const logoutRequest = async(user)=>{
    return await axios.put(`/logout`)
}

export const verifyTokenRequest = async()=>{
    return await axios.get('/auth/verify')
}
