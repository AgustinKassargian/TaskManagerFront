import React, { useEffect, useState } from "react";
import { DragDropContext } from "@hello-pangea/dnd";
import { Column } from "../components/TaskColumn";
import { myTaksRequest } from "../api/getMyTasks";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import updateTaskStatus from "../api/updateMyTasks";
import Cookies from "js-cookie";
import NavBar from "../components/NavBar";

function MyTasksPage() {
  const { user, toDoTasks, setToDoTasks, doneTasks, setDoneTasks, logout } =
    useAuth();

  const navigate = useNavigate();
  

  const saveUserTasks = async (user) => {
    try {
      const mytasks = await myTaksRequest(user);
      if (mytasks) {
        setToDoTasks(mytasks.filter((element) => !element.completed));
        setDoneTasks(mytasks.filter((element) => element.completed));
      }
    } catch (error) {
      console.log("FALLE ACA:", error.message);
    }
  };

  useEffect(() => {
    if (user) saveUserTasks(user);
  }, [user]);

  const handleLogout = async () => {
    await logout();
    Cookies.remove("authToken");
    navigate("/");
  };
  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }
    const sourceTasks = source.droppableId === "todo" ? toDoTasks : doneTasks;

    const destinationTasks =
      destination.droppableId === "todo" ? toDoTasks : doneTasks;

    const sourceClone = Array.from(sourceTasks);
    const destClone = Array.from(destinationTasks);

    const [movedTask] = sourceClone.splice(source.index, 1);

    movedTask.completed = destination.droppableId === "done";

    destClone.splice(destination.index, 0, movedTask);

    if (source.droppableId === "todo") {
      setToDoTasks(sourceClone);
      setDoneTasks(destClone);
    } else {
      setDoneTasks(sourceClone);
      setToDoTasks(destClone);
    }

    updateTaskStatus(user, movedTask._id, movedTask.completed).catch((err) => {
      console.error("Error al actualizar la tarea:", err);
    });
  };

  return (
    <div className="flex flex-col h-screen items-center w-full ">
      <NavBar handleLogout={handleLogout} />
      <div className="row-auto mb-10">
        <div>
          <h1 className="text-center mb-4">{`Bienvenid@ a tus tareas ${
            user && user?.username
          }!`}</h1>
        </div>
        <p className="text-center">
          TaskManager es una aplicacion para gestionar tus propias tareas
        </p>
        <p>
          Tus tareas en la columna <b>ToDo</b> son aquellas que tienes
          pendientes. Aquellas que se encuentren en la columna <b>Done</b> ya se
          encuentran realizadas
        </p>
      </div>
      <div className="row-auto bg-zinc-800 h-3/4 w-full flex justify-center">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="row-auto flex justify-center gap-4 p-4 h-full w-full">
            <Column title="To Do" tasks={toDoTasks} droppableId="todo" />
            <Column title="Done" tasks={doneTasks} droppableId="done" />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
}

export default MyTasksPage;
