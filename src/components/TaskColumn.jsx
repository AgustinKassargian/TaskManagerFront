import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { IoMdAdd } from "react-icons/io";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { GiBroom } from "react-icons/gi";

import { cleanDoneTasks, deleteMyTask } from "../api/deleteMyTask";

import ModalCreateTask from "./ModalCreateTask";
import ModalEditTask from "./ModalEditTask";
import { useAuth } from "./AuthContext";

const Task = ({ task, index }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const { user, setToDoTasks, setDoneTasks } = useAuth();

  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  const handleDeleteTask = async (user, task, setToDoTasks, setDoneTasks) => {
    await deleteMyTask(user, task._id, setToDoTasks, setDoneTasks);
  };
  const returnAccion = (task) => {
    if (task.completed) {
      return (
        <MdDelete
          className="text-lg hover:scale-110"
          onClick={() =>
            handleDeleteTask(user, task, setToDoTasks, setDoneTasks)
          }
        />
      );
    } else {
      return (
        <FaEdit className="text-lg hover:scale-110" onClick={handleModal} />
      );
    }
  };

  const formatDate = (data) => {
    console.log(data);
    if (data) {
      let date = new Date(data);

      let formatedDate = date.toLocaleString("es-AR", {
        timeZone: "America/Argentina/Buenos_Aires",
        dateStyle: "short",
      });
      return formatedDate;
    }
  };

  return (
    <div>
      <Draggable draggableId={task._id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={
              "p-4 bg-zinc-600 rounded shadow-md hover:bg-zinc-500 w-full flex flex-col justify-center gap-3"
            }
          >
            <div className="flex justify-between items-center">
              <label className="text-start">{task.title}</label>
              {returnAccion(task)}
            </div>
            <hr />
            {task?.description ? (
              <p>{task?.description}</p>
            ) : (
              <i>Sin descripcion...</i>
            )}
            <hr />
            <div className="flex justify-between">
              <label>Fecha de creacion: {formatDate(task?.createdAt)}</label>
              <label>Ultima actualizacion: {formatDate(task?.updatedAt)}</label>
            </div>
          </div>
        )}
      </Draggable>
      {modalOpen && <ModalEditTask onClose={handleModal} task={task} />}
    </div>
  );
};

export const Column = ({ title, droppableId, tasks }) => {
  const [modalCreateTaskOpen, setModalCreateTaskOpen] = useState(false);
  const { user, setToDoTasks, setDoneTasks } = useAuth();

  const toggleModal = () => {
    setModalCreateTaskOpen((prevState) => !prevState);
  };

  const cleanDoneTasksHandler = () => {
    cleanDoneTasks(user, setToDoTasks, setDoneTasks); // Esta función solo se ejecutará cuando se haga clic
  };

  const returnAcccionColumn = () => {
    if (droppableId === "todo") {
      return (
        <IoMdAdd
          onClick={toggleModal}
          className="cursor-pointer hover:animate-wheelShake hover:scale-110 text-xl transition-transform"
        />
      );
    }
    if (droppableId === "done") {
      return (
        <GiBroom
          onClick={cleanDoneTasksHandler}
          className="cursor-pointer hover:scale-110 text-xl hover:animate-wheelShake transition-transform"
        />
      );
    }
    return null;
  };

  return (
    <div className="flex-1 bg-zinc-700 p-4 rounded shadow-md h-full w-1/2">
      <h2 className="text-lg font-bold mb-4 w-full border-b-2 flex flex-row justify-between items-center">
        {title}
        {returnAcccionColumn()}
      </h2>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`space-y-4 h-5/6 ${
              droppableId === "done" && "line-through"
            }`}
          >
            {tasks.map((task, index) => (
              <Task key={task._id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {modalCreateTaskOpen && <ModalCreateTask onClose={toggleModal} />}
    </div>
  );
};
