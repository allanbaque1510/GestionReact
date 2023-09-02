import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import imgCerdito from '../img/cerdito.gif'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
const Login = () => {
  const classInputs = 'w-full  inputForm px-4 py-2 rounded-md my-2';
  const {register, handleSubmit, formState:{errors}} = useForm()
  const {signin,isAuthenticated, errors:AuthErrors}=useAuth();
  const navigate = useNavigate()
  const onSubmit = handleSubmit(async(values)=>{
    signin(values);
  })
  
  useEffect(()=>{
    if(isAuthenticated) navigate('/')
  },[isAuthenticated])

  return (
    <div className='flex h-screen items-center justify-center'>
      <div className=' bg-pink-200 max-w-md p-10 rounded-md'>

      <h1 className='text-2xl font-bold text-center'>Iniciar Sesion</h1>
      <div className="contImg">
        <img src={imgCerdito} className='imgCerdito'/>
      </div>
      {AuthErrors.map((error,i)=>(
        <div className="boxMessageError" key={i}>
          {error}
        </div>
      ))}
      <form  
        onSubmit={onSubmit} 
        >
        
       
        <label htmlFor="email">Corre electronico:</label>
        <input type="email" {...register('email',{required:true})} className={classInputs} placeholder='Correo electronico'/>
        
        <div className="boxMessage">
          {errors.email && <p>Email es requerido</p> }
        </div>
        
        <label htmlFor="password">Contraseña:</label>
        <input type="password" {...register('password',{required:true})} className={classInputs} placeholder='Contraseña'/>
        
        <div className="boxMessage">
          {errors.password && <p>Contraseña es requerido</p> }
        </div>
       <div className="flex justify-center my-2">
        <button type="submit" className='py-1 px-10 font-bold text-lg text-white  rounded-xl  bg-pink-900'>Entrar</button>
       </div>
      </form>
      <p className='flex gap-x-2 justify-center'>
        ¿No tienes una cuenta? <Link to='/registro' className='underline' >Crea una aqui</Link>
      </p>
      </div>

    </div>
  )
}

export default Login