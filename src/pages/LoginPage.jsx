import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../components/AuthContext";
import ErrorMessage from "../components/ErrorMessage";

function LoginPage() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const { signin, authError } = useAuth();

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signin(values);
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex items-center flex-col justify-center h-screen w-full ">
      <div className="max-w-md bg-zinc-800 p-10 rounded-md flex flex-col gap-3">
        <h1 className="text-center">Bienvenido a TaskManager</h1>
        <ErrorMessage message={authError} />
        <form className="p-2 gap-1" onSubmit={onSubmit}>
          <label>Correo electrónico o nombre de usuario.</label>
          <input
            title="Correo Electronico."
            placeholder="example@mail.com"
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <label>Contraseña</label>
          <input
            title="Contraseña"
            placeholder="••••••••••"
            autoComplete="on"
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <button className="mt-2" type="submit">
            Iniciar Sesión
          </button>
        </form>
        <div className="flex gap-1">
          <label>¿Eres nuevo por aquí?</label>
          <b
            className="hover:underline hover:cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Regístrate
          </b>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
