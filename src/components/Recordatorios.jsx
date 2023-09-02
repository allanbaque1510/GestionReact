import React, { useEffect, useState } from 'react'
import { BiSolidBellPlus } from "react-icons/bi";
import FormRecordatorio from './FormRecordatorio';
import { usePassContext } from '../context/PasswordContext';
import { FaRegEdit,FaRegTrashAlt} from "react-icons/fa";
import Swal from 'sweetalert2';
import gatito1 from '../img/gatitos/gatito1.jpg'
import gatito2 from '../img/gatitos/gatito2.jpg'
import gatito3 from '../img/gatitos/gatito3.jpg'
import gatito4 from '../img/gatitos/gatito4.jpg'
import gatito5 from '../img/gatitos/gatito5.jpg'
const Recordatorios = () => {
  const [openForm, setOpenForm] = useState(false)
  const [idEditRecord, setIdEditRecord] = useState('')
  const [formData, setFormData] = useState({
    _id:'',
    titulo: '',
    descripcion: '',
    tipo: '',
    fecha: '',
  });
  const {viewAllRecord,objRecords,objRecord,deleteRecordatorio,borrarRecord,updateRecord}= usePassContext();   
  const imagenesGatos = [
    {titulo:"gatito1" ,imagen:gatito1},
    {titulo:"gatito2" ,imagen:gatito2},
    {titulo:"gatito3" ,imagen:gatito3},
    {titulo:"gatito4" ,imagen:gatito4},
    {titulo:"gatito5" ,imagen:gatito5},
  ]
  const cerrarForm=(valor)=>{
    setOpenForm(valor)
  }
  useEffect(() => {
    viewAllRecord()
  }, [borrarRecord,objRecord])


  const formatearFecha = (valor) =>{
    const fechaMg = new Date(valor)
    const data ={
      dia:fechaMg.getDate(),
      mes:fechaMg.getMonth()+1,
      año:fechaMg.getFullYear(),
      hora:fechaMg.getHours(),
      minuto:fechaMg.getMinutes(),
      segundo:fechaMg.getSeconds(),

    }
    return data
  }
  const borrarRecordatorio = (id) =>{
    Swal.fire({
      title: 'Eliminar dato',
      text: "Estas seguro que deseas eliminar esta credencial",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si quiero!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRecordatorio(id)
      }
    }) 
  }
  const guardarDatos =()=>{
    updateRecord(formData)
    cancelarDatos()
  } 
  const cancelarDatos = () =>{
    setFormData({
      _id:'',
      titulo: '',
      descripcion: '',
      tipo: '',
      fecha: '',
    });
    setIdEditRecord('')
  }
  const cambiarValores = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const editarDatos = (valor) =>{
    setIdEditRecord(valor)
    const filtro = (objRecords.filter(item =>
      item._id.toString().includes(valor))[0]
      );
      if(filtro.fecha!== null && filtro.fecha.length>0){
        setFormData({
        _id:filtro._id,
        titulo: filtro.titulo,
        descripcion: filtro.descripcion,
        tipo: filtro.tipo,
        fecha: formatearFecha(filtro.fecha).año+"-"+formatearFecha(filtro.fecha).mes+"-"+formatearFecha(filtro.fecha).dia,
      })
    }else{
 
      setFormData({
        _id:filtro._id,
        titulo: filtro.titulo,
        descripcion: filtro.descripcion,
        tipo: filtro.tipo,
        fecha: ''
      })
    }
  }

  return (
    <div className=' h-screen scrollBar overflow-auto'>
      <h1 className='text-center m-4 text-3xl font-bold'>Recordatorios</h1>
      <button 
          type="button" 
          className='mx-10 bg-pink-700 font-semibold flex items-center
          gap-x-2 cursor-pointer text-white p-2 rounded-xl hover:bg-pink-500 duration-150'
          onClick={()=>{setOpenForm(true)}}
          >
            <BiSolidBellPlus/> 
            Agregar recordatorio
      </button>
      <hr className=" h-1 rounded-full my-3 mx-2 bg-gray-200 border-0 dark:bg-pink-900"/>
      <div className={` duration-300 ${!openForm && "scale-0 h-0"}`}>
          <FormRecordatorio cerrarForm={cerrarForm}/>
      </div>
      <div className=" flex justify-center">
      {objRecords.length >0?
        <section className="duration-300 w-11/12 ">
        {objRecords.map((record,index)=>(
          <article  style={(record.fondo?{
            backgroundImage:`url(${imagenesGatos.find((gato) => gato.titulo === record.fondo).imagen})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right bottom',
            backgroundSize:'contain',
            backgroundColor:`${record.color}`
              
          }:{backgroundColor:'#fff'})} 
              className={`my-2 relative   rounded-xl p-2 ${idEditRecord === record._id?'sombraCaja':null}`} 
              key={index}
              >
            {idEditRecord === record._id?
            <>
            <span className='flex justify-center'>
              <input type="text" className=' text-2xl font-bold w-3/4 bg-transparent' name='titulo' value={formData.titulo} onChange={cambiarValores} />
    
            <span className='flex w-1/4 duration-200 justify-center'>
                <button type="button" onClick={()=>guardarDatos()} className='duration-200 mx-1 py-1 bg-blue-600 text-white px-1 rounded-xl hover:bg-blue-800 hover:text-white'>Guardar </button>
                <button type="button" onClick={()=>cancelarDatos()} className='duration-200 mx-3 py-1 px-2 bg-red-700 text-white rounded-xl hover:bg-red-900 hover:text-white'>Cerrar </button>
            </span>
            </span>
            <input type="text" className='w-3/4 bg-transparent' name="descripcion" value={formData.descripcion} onChange={cambiarValores} />
       
            <p className=' mt-2'> 
                <b>Fecha asignada:</b>
                <input type="date" className='italic bg-transparent px-1' name="fecha" onChange={cambiarValores} value={formData.fecha} /> 
            </p>
              <p>
                <b>Recordar:</b> 
                <select name="tipo" value={formData.tipo} className=' bg-transparent' onChange={cambiarValores}>
                      <option value="0">No recordar</option>
                      <option value="1">Diariamente</option>
                      <option value="2">Semanalmente</option>
                      <option value="3">Mensualmente</option>
                      <option value="4">Anualmente</option>
                </select> 
              </p>
           
            <p className='absolute bottom-0 right-1  select-none text-gray-600 sombraBlanca font-bold  text-sm'>{formatearFecha(record.createdAt).dia+"/"+formatearFecha(record.createdAt).mes+'/'+formatearFecha(record.createdAt).año}</p>
            </>
            :
            <>
            <span className='flex justify-center'>
            <h5 className=' text-2xl font-bold w-3/4'>{record.titulo}</h5>
            <span className='flex w-1/4 duration-200 justify-center'>
                <button type="button" onClick={()=>editarDatos(record._id)} className='duration-200 mx-3 py-1 px-2 rounded-xl hover:bg-pink-600 hover:text-white'><FaRegEdit/> </button>
                <button type="button" onClick={()=>borrarRecordatorio(record._id)} className='duration-200 mx-3 py-1 px-2 rounded-xl hover:bg-red-700 hover:text-white'><FaRegTrashAlt/> </button>
            </span>
            </span>
            <p className=''>{record.descripcion}</p>
            {record.fecha !== null && record.fecha.length >0?
              <p className=' mt-2'> <b>Fecha asignada:</b> <span className=' italic'>{formatearFecha(record.fecha).dia+"/"+formatearFecha(record.fecha).mes+"/"+formatearFecha(record.fecha).año}</span></p>:null }
            {record.tipo === 0?null:(
              record.tipo === 1?<p><b>Recordar:</b> Diariamente</p>
              :
              (record.tipo === 2?<p><b>Recordar:</b> Semanalmente</p>
              :
              (record.tipo === 3?<p><b>Recordar:</b> Mensualmente</p>:
              (record.tipo === 4?<p><b>Recordar:</b> Diariamente</p>:null)))
              )}
            <p className='absolute bottom-0 right-1  select-none text-gray-600 sombraBlanca font-bold  text-sm'>{formatearFecha(record.createdAt).dia+"/"+formatearFecha(record.createdAt).mes+'/'+formatearFecha(record.createdAt).año}</p>
            </>
            }
            </article>
        ))} 
        
        </section>
      : 
      <p className='text-center text-xl italic'>No hay contraseñas registradas</p>
    }
    </div>
      
    </div>
  )
}

export default Recordatorios