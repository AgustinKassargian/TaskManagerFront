import axios from "./axios";


export const myTaksRequest = async(user) =>{
    console.log("SOY USUARIO", user)
    try {
        const res = await axios.get(`/my-tasks`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
              }
        })
        console.log('SOY LA DATA', res.data)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
