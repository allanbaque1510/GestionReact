import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { usePassContext } from '../context/PasswordContext';
import Swal from 'sweetalert2';

const FormRecordatorio = ({cerrarForm}) => {
    const [imgF, setImgF] = useState({imagen:'', color:''})

    const classInputs = 'w-full  inputForm px-4 py-2 rounded-md my-2';
    const botonesForm = 'my-2 mx-10 bg-pink-800 text-white text-xl py-2 px-4  rounded-full'
    const {register, handleSubmit, reset,formState:{errors}} = useForm()
    const imagenesGatos = [
      {color:"#fee1c6",imagen:"gatito1.jpg"},
      {color:"#fff4e9",imagen:"gatito2.jpg"},
      {color:"#fbddc4",imagen:"gatito3.jpg"},
      {color:"#ffffff",imagen:"gatito4.jpg"},
      {color:"#fff4e9",imagen:"gatito5.jpg"},
    ]
    const asignarImg = (img, color)=>{
      setImgF({
        imagen:img,
        color:color
      })
    }
    const {createNewRecord,cargando}= usePassContext()
    const cerrarFormulario = () =>{
        cerrarForm(false);
        reset({
          descripcion:"",
          fecha:"",
          tipo:"0",
          titulo:""
      })
      setImgF({
        imagen:'',
        color:''
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

            },
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log('I was closed by the timer')
            }
          })
      }
    }, [cargando])
    
    const onSubmit = handleSubmit(async(values)=>{
      if(imgF.color=='' && imgF.imagen=='' ){
        return Swal.fire({
          position: 'top-end',
          icon: 'error',
          width:200,
          text: "Seleccione una imagen antes de continuar",
          showConfirmButton: false,
          timer: 1700,
          backdrop:false
      })
      }
      const newVal = {
        descripcion:values.descripcion,
        fecha:values.fecha,
        tipo:values.tipo,
        titulo:values.titulo,
        fondo:imgF.imagen,
        color:imgF.color
      }
      createNewRecord(newVal)
        reset({
          descripcion:"",
          fecha:"",
          tipo:"0",
          titulo:""
      })
      setImgF({
        imagen:'',
        color:''
      })
      })
  return (
    <div className='p-3'>
        <form  
            onSubmit={onSubmit} 
            >
            <table className=' w-full'>
              <tbody>
                <tr>
                  <td><label htmlFor="tipo">Tiempo (Cada que tiempo se debe recordar):</label></td>
                  <td><label htmlFor="fecha">Fecha de referencia:</label></td>
                </tr>
                <tr>
                  <td className=' pr-4 w-1/2'> 
                    <select className={classInputs} {...register('tipo',{required:false})}>
                      <option value="0">No recordar</option>
                      <option value="1">Diariamente</option>
                      <option value="2">Semanalmente</option>
                      <option value="3">Mensualmente</option>
                      <option value="4">Anualmente</option>
                    </select>
                  </td>
                  <td className=' pl-4 w-1/2'>
                    <input type="date" className={classInputs} {...register('fecha',{required:false})} />
                  </td>
                </tr>
              </tbody>
            </table>
            <label htmlFor="titulo">Titulo:</label>
            <input type="text" {...register('titulo',{required:true})} className={classInputs} placeholder='Nombre de usuario'/>
            <div className="boxMessage">
            {errors.titulo && <p>Titulo es requerido</p> }
            </div>
        

            <label htmlFor="descripcion">Descripcion:</label>
            <textarea {...register('descripcion',{required:true})} className={classInputs} rows="3"></textarea>
            <div className="boxMessage">
            {errors.descripcion && <p>Descripcion es requerido</p> }
            </div>
            <label className=' font-semibold italic'>Seleccione un fondo</label>
            <div className="flex justify-between w-full">
              {imagenesGatos.map((gato,index)=>(
                  <img className={`w-1/6 rounded-3xl border-8 ${imgF.imagen === gato.imagen?'border-green-500':null}`}  
                    src={`./src/img/gatitos/${gato.imagen}`} 
                    alt={gato.imagen} 
                    key={index} 
                    onClick={()=>asignarImg(gato.imagen,gato.color)}
                  />
              ))}
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

export default FormRecordatorio