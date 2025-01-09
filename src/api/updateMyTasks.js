import { myTaksRequest } from "./getMyTasks";
import axios from "./axios";


const updateTaskStatus = async (user, taskId, completed) => {
    try {
      return await axios.put(`/tasks/${taskId}`, {completed},
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
      }}
    )}catch(error) {
      console.log(error.message)
    }

  };

export default updateTaskStatus;

export const updateTaskInfo = async(user, taskId, data, setToDoTasks, setDoneTasks) => {

  try {
    await axios.put(`/tasks/${taskId}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    });
    await updateTasks(user, setToDoTasks, setDoneTasks)
  } catch (error) {
    console.log("ERROR ERRROR", error.message)
  }
};

export const updateTasks = async(user, setToDoTasks, setDoneTasks)=>{
  const updatedTasks = await myTaksRequest(user)
  setToDoTasks(updatedTasks.filter(element => !element.completed));
  setDoneTasks(updatedTasks.filter(element => element.completed))
}