import React, {useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import Cookies from 'js-cookie';



function LoginPage() {
    const {register,handleSubmit, formState:errors} = useForm();
    const navigate = useNavigate();
    const {signin, isAuthenticated, user,setUser} = useAuth();    

    
    const onSubmit = handleSubmit(async(values) =>{
        signin(values)
        navigate('/my-tasks')
    });

    return (
        <div className='flex items-center flex-col justify-center h-screen w-full '>
            <div className='max-w-md bg-zinc-800 p-10 rounded-md'>
                <h1 className='text-center'>Bienvenido a TaskManager</h1>
                <form className='p-4' onSubmit={(onSubmit)}>
                    <label>
                        Correo electronico o nombre de usuario.
                        {errors.usuario && <p className='text-red-500'> Este campo es requerido</p>}
                    </label>
                    <input
                        title='Correo Electronico.'
                        placeholder='example@mail.com'
                        type='text'
                        {...register('username',{required:true})}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    <label>Contrasenia
                        {errors.username && <p className='text-red-500'> El contrasenia requerida</p>}    
                    </label>
                    <input
                        title='Contrasenia'
                        placeholder='••••••••••'
                        autoComplete='on'
                        type='password'
                        {...register('password',{required:true})}
                        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                    />
                    <button type='submit'>Iniciar Sesion</button>
                </form>
                <label>No tienes una cuenta? Registrate aqui</label>
            </div>
        </div>
    )
}

export default LoginPage;
