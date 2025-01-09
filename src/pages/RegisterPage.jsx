import React, {useState, useContext, useEffect} from 'react'
import { useForm } from 'react-hook-form';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

function RegisterPage() {
    const {register, handleSubmit, formState:{errors}} = useForm();
    
    const {signup, isAuthenticated} = useAuth();

    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/my-tasks')
        }
    },[isAuthenticated])
    const onSubmit = handleSubmit(async(values) =>{
        signup(values)
    });


    return (
        <div className='bg-zinc-800 max-w-md p-10 rounded-md'>
            <h1>Bienvenido</h1>
            <form onSubmit={(onSubmit)}>
                <label>
                    Correo Electronico
                    {errors.email && <p className='text-red-500'> El correo electronico es requerido</p>}
                </label>
                <input
                    title='Correo Electronico.'
                    placeholder='example@mail.com'
                    type='email'
                    {...register('email',{required:true})}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'

                />
                <label>
                    Nombre de Usario
                    {errors.username && <p className='text-red-500'> El nombre de usuario es requerido</p>}    
                </label>
                <input
                    title='Usuario'
                    placeholder='User'
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
                    type='password'
                    {...register('password',{required:true})}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                <label>Confirme su contrasenia {errors.username && <p className='text-red-500'> Confirmacion de contrasenia requerida</p>}    
                </label>
                <input
                    title='Confirmar Contrasenia'
                    placeholder='••••••••••'
                    type='password'
                    {...register('confirmPassword',{required:true})}
                    className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
                />
                <button type='submit'>Registrar</button>
            </form>
        </div>

    )
}

export default RegisterPage
