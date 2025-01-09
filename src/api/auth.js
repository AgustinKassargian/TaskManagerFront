import axios from "./axios";

export const registerRequest = async (user) => await axios.post(`/register`,user);

export const loginRequest = async (data) =>{
    try {
        return await axios.post(`/login`,data);
    } catch (error) {
        console.log(error)
    }
}
export const logoutRequest = async(user)=>{
    return await axios.put(`/logout`)
}

export const verifyTokenRequest = async()=>{
    return await axios.get('/auth/verify')
}
