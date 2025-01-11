import axios from "./axios";
import { updateTasks } from "./updateMyTasks";


const createTask = async(user, data, setTodoTasks, setDoneTasks)=>{
    try {
        const newTask = await axios.post(`/tasks`, data, {
            headers: {
                'Authorization': `Bearer ${user.token}`
              }
        })
        await updateTasks(user, setTodoTasks, setDoneTasks);
    } catch (error) {
        console.log(error);
    }
}

export default createTask
