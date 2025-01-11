import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../components/AuthContext";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "../components/ErrorMessage";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const { signup, authError } = useAuth();

  const navigate = useNavigate();
  const password = watch("password");

  const onSubmit = handleSubmit(async (values) => {
    try {
      await signup(values).then(() => {
        navigate("/my-tasks").catch((error) => console.log(error));
      });
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div className="flex items-center flex-col justify-center h-screen w-full ">
      <div className="max-w-md bg-zinc-800 p-10 rounded-md flex flex-col gap-3">
        <h1 className="text-center">Bienvenido a TaskManager</h1>
        <ErrorMessage message={authError} />
        <form onSubmit={onSubmit}>
          <label>
            Correo Electronico
            {errors.email && (
              <p className="text-red-500">
                {" "}
                El correo electronico es requerido
              </p>
            )}
          </label>
          <input
            title="Correo Electronico."
            placeholder="example@mail.com"
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <label>
            Nombre de Usario
            {errors.username && (
              <p className="text-red-500"> El nombre de usuario es requerido</p>
            )}
          </label>
          <input
            title="Usuario"
            placeholder="User"
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <label>
            Contrasenia
            {errors.password && (
              <p className="text-red-500"> El contrasenia requerida</p>
            )}
          </label>
          <input
            title="Contrasenia"
            placeholder="••••••••••"
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <label>
            Confirme su contrasenia{" "}
            {errors.confirmPassword && (
              <p className="text-red-500"> {errors.confirmPassword.message}</p>
            )}
          </label>
          <input
            title="Confirmar Contraseña"
            placeholder="••••••••••"
            type="password"
            {...register("confirmPassword", {
              required: "La confirmación de contraseña es obligatoria",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <button type="submit">Registrarse</button>
        </form>
        <div className="flex gap-1">
          <label>¿Ya tienes una cuenta?</label>
          <b
            className="hover:underline hover:cursor-pointer"
            onClick={() => navigate("/")}
          >
            Inicia sesión
          </b>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
