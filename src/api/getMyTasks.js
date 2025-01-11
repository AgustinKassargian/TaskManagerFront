import axios from "./axios";


export const myTaksRequest = async(user) =>{
    try {
        const res = await axios.get(`/my-tasks`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
              }
        })
        return res.data
    } catch (error) {
        console.log(error)
    }
}
