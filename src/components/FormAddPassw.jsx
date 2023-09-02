import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { usePassContext } from '../context/PasswordContext';
import Swal from 'sweetalert2';

const FormAddPassw = ({cerrarForm}) => {
    const classInputs = 'w-full  inputForm px-4 py-2 rounded-md my-2';
    const botonesForm = 'my-2 mx-10 bg-pink-800 text-white text-xl py-2 px-4  rounded-full'
    const {register, handleSubmit, reset,formState:{errors}} = useForm()
    
    const generarContraseña=()=> {
      const inputPassword = document.getElementById('password');
      const caracteres = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:,.<>?';
      let contrasena = '';
    
      for (let i = 0; i < 12; i++) {
        const caracterAleatorio = caracteres[Math.floor(Math.random() * caracteres.length)];
        contrasena += caracterAleatorio;
      }
    
      inputPassword.value=contrasena;
    }

    const {createNewObjPass,cargando}= usePassContext()
    const cerrarFormulario = () =>{
        cerrarForm(false);
        reset({
          user:"",
          site:"",
          nameApp:"",
          email:"",
          password:""
      })
    }
    useEffect(() => {
      if(cargando){
        Swal.fire({
            title: 'Espere!',
            html: 'Cargando datos',
            allowOutsideClick:false,
            didOpen: () => {
              Swal.showLoading()
              const b = Swal.getHtmlContainer().querySelector('b')
              timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft()
              }, 100)
            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
      }
    }, [cargando])
    
    const onSubmit = handleSubmit(async(values)=>{
        createNewObjPass(values)
        reset({
            user:"",
            site:"",
            nameApp:"",
            email:"",
            password:""
        })
      })
  return (
    <div className='p-3'>
        <form  
            onSubmit={onSubmit} 
            >
            
        
            <label htmlFor="user">Usuario:</label>
            <input type="text" {...register('user',{required:false})} className={classInputs} placeholder='Nombre de usuario'/>
            
            <label htmlFor="site">URL:</label>
            <input type="text" {...register('site',{required:false})} className={classInputs} placeholder='Url de la pagina'/>
            
             <label htmlFor="Aplicacion">Nombre de la pagina o aplicacion:</label>
            <input type="text" {...register('Aplicacion',{required:true})} className={classInputs} placeholder='Nombre de la pagina o aplicacion'/>
            <div className="boxMessage">
            {errors.nameApp && <p>Nombre de aplicacion requerido</p> }
            </div>

            <label htmlFor="email">Corre electronico:</label>
            <input type="email" {...register('email',{required:false})} className={classInputs} placeholder='Correo electronico'/>
   
            
            <label htmlFor="password">Contraseña:</label>
            <div className="flex flex-row">
              <input type="text" {...register('password',{required:true})} id='password' className={classInputs} placeholder='Contraseña'/>
              <button type='button' className='duration-200 bg-white text-pink-700 font-bold my-auto p-2 ml-4 border-2 border-pink-700 rounded-xl 
              hover:bg-pink-700 hover:text-white' onClick={generarContraseña}>Generar</button>
            </div>
            
            <div className="boxMessage">
            {errors.password && <p>Contraseña es requerido</p> }
            </div>
            <div className='flex justify-center'>
                <button className={botonesForm} type="submit">Agregar</button>
                <button className={botonesForm} type="button" onClick={cerrarFormulario}>Cerrar</button>
            </div>
        </form>
        <hr className=" h-1 rounded-full my-3  bg-gray-200 border-0 dark:bg-pink-900"/>
    </div>
  )
}

export default FormAddPassw