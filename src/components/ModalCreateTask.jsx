import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from "../components/AuthContext";
import createTask from '../api/createTask';


function ModalCreateTask({ onClose}) {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const {user, setToDoTasks, setDoneTasks} = useAuth();
  
  const onSubmit = async(data) => {
    await createTask(user, data, setToDoTasks, setDoneTasks);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-zinc-800 rounded-lg shadow-lg w-96">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
          <h2 className="text-lg font-bold text-white">Nueva Tarea</h2>
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">
              Nombre de la Tarea
            </label>
            <input
                id="title"
                type="text"
                placeholder=''
              {...register("title", { required: "El nombre es obligatorio" })}
              className={`w-full text-white bg-zinc-600 px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.title ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <hr className="border-zinc-600" />
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">
              Descripción
            </label>
            <textarea
              id="description"
              {...register("description", {
                maxLength: {
                  value: 200,
                  message: "La descripción no puede superar los 200 caracteres",
                },
              })}
              placeholder="Aquí puedes describir tu tarea."
              className={`w-full text-white bg-zinc-600 px-3 py-2 mt-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 mr-2 text-gray-300 bg-zinc-600 rounded hover:bg-zinc-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalCreateTask;
