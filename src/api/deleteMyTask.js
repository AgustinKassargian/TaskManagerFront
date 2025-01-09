import { updateTasks } from "./updateMyTasks";
import axios from "./axios";


export const deleteMyTask = async (user, taskId, setToDoTasks, setDoneTasks) => {
    try {
        const deletedTask = await axios.delete(`/tasks/${taskId}`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
              }
            });

        await updateTasks(user, setToDoTasks, setDoneTasks);
    } catch (error) {
        console.log(error.message)
    }
}

export const cleanDoneTasks = async (user, setToDoTasks, setDoneTasks) => {
    try {
            await axios.delete(`/clean-my-tasks`,{
            headers: {
                'Authorization': `Bearer ${user.token}`
              }
            });

        await updateTasks(user, setToDoTasks, setDoneTasks);
    } catch (error) {
        console.log(error.message)
    }
}