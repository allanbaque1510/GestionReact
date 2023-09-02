import React, { useEffect ,useState} from 'react'
import { useForm } from 'react-hook-form'
import { useAuth } from '../context/AuthContext'
import { useNavigate,Link } from 'react-router-dom'
import imgCerdito from '../img/cerdito.gif'

const Register = () => {
  const classInputs = 'w-full inputForm px-4 py-2 rounded-md my-2';
  const {register, handleSubmit, formState:{errors}} = useForm()
  const {singup, isAuthenticated, errors:AuthErrors} = useAuth()
  const [passVerify, setPassVerify] = useState(true);
  const navigate = useNavigate()

  useEffect(()=>{
    if(isAuthenticated) navigate('/')
  },[isAuthenticated])

  const onSubmit = handleSubmit(async(values)=>{
    if(values.password == values.password1){
      setPassVerify(true)
      singup(values);
    }else{
      setPassVerify(false)
    }
  })
    return (
      <div className='flex h-screen items-center justify-center'>

    <div className='bg-pink-200 max-w-md p-10 rounded-md'>
    <h1 className='text-2xl font-bold text-center'>Registro</h1>
      <div className="contImg">

        <img src={imgCerdito} className='imgCerdito'/>
      </div>

      {passVerify?"":
        <div className="boxMessageError" >
          Las contraseñas no coinciden
        </div> 
      }
      {AuthErrors.map((error,i)=>(
        <div className="boxMessageError" key={i}>
          {error}
        </div>
      ))}

      <form  
        onSubmit={onSubmit} 
        >
        
        <label htmlFor="firstName">Nombre de usuario:</label>
        <input type="text" {...register('firstName',{required:true})} className={classInputs} placeholder='Nombre de usuario' autoComplete="off"/>
        
        <div className="boxMessage">
          {errors.username && <p>Nombre de usuario es requerido</p> }
        </div>

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
        
        <label htmlFor="password1">Repetir contraseña:</label>
        <input type="password" {...register('password1',{required:true})} className={classInputs} placeholder='Contraseña'/>
        
        <div className="boxMessage">
          {errors.password1 && <p>Repetir contraseña es requerido</p> }
        </div>
        <div className="flex justify-center my-2"> 
          <button type="submit" className='py-1 px-10 font-bold text-lg text-white  rounded-xl  bg-pink-900'>Registrar</button>
        </div>
      </form>
      <p className='flex gap-x-2 justify-center'>
        ¿Ya tienes una cuenta? <Link to='/login' className='underline' >Ingresa aqui</Link>
      </p>
    </div>
    </div>

  )
}

export default Register