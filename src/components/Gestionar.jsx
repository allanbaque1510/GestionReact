import React, { useEffect, useState } from 'react'
import { usePassContext } from '../context/PasswordContext';
import Swal from 'sweetalert2'
import { FaRegEdit,FaRegTrashAlt} from "react-icons/fa";
const Gestionar = () => {
  const [valSearch, setValSearch] = useState('')
  const [idPass, setIdPass] = useState('')
  const [formData, setFormData] = useState({
    _id:'',
    user: '',
    site: '',
    nameApp: '',
    password: '',
    email: ''
  });
  const cancelarMod = ()=>{
    setIdPass('')
    setFormData({
      _id:'',
      user: '',
      site: '',
      nameApp: '',
      password: '',
      email: ''
    })
  }
  const {viewAllPass,objPasswords,deleteObj,borrarPass,updateObj,objPassword,cargando}= usePassContext();   
  const borrarDato=(dato)=>{
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
        deleteObj(dato)
      }
    }) 
    
  } 
  useEffect(() => {
    if(cargando){
      Swal.fire({
          title: 'Espere!',
          html: 'Actualizando datos',
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

  useEffect(() => {
    viewAllPass()
  }, [borrarPass,objPassword])

  const editarDatos = (id) =>{
    setIdPass(id)
    const filtro = (objPasswords.filter(item =>
      item._id.toString().includes(id))[0]
    );
    
   setFormData({
    _id:filtro._id,
    user: filtro.user,
    site: filtro.site,
    nameApp: filtro.nameApp,
    password: filtro.password,
    email: filtro.email
   })

  }
  const cambiarValores = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };
  const enviarDatosMod = () =>{
    updateObj(formData)
    cancelarMod()
  }
  const filteredData = objPasswords.filter(item =>
    Object.values(item).some(value =>
      typeof value === 'string' && value.includes(valSearch)
    )
  );
  return (
    <div className='scrollBar bg-pink-100 h-screen rounded-xl py-3 overflow-hidden'>
      <h1 className='text-center m-4 text-3xl font-bold'>Gestionar credenciales</h1>
      <input type="search" placeholder=' Filtrar datos'
        className='h-9  mx-4 text-lg border-pink-500 border-2 rounded outline-none' 
        value={valSearch}
        onChange={(e)=>setValSearch(e.target.value)} 
        />
        <hr className=" h-1 rounded-full my-3 mx-2 bg-gray-200 border-0 dark:bg-pink-900"/>
      <div className="flex flex-col h-3/4 items-center scrollBar overflow-auto">
        <table className='border-collapse border mx-2   border-pink-900 '>
          <thead className='sticky top-0 z-10'>
            <tr>
              <th className='border-2 rounded-lg   text-white bg-pink-900'>App</th>
              <th className='border-2 rounded-lg  text-white bg-pink-900'>Usuario</th>
              <th className='border-2 rounded-lg  text-white bg-pink-900'>Email</th>
              <th className='border-2 rounded-lg  text-white bg-pink-900'>Url</th>
              <th className='border-2 rounded-lg  text-white bg-pink-900'>Contraseña</th>
              <th className='border-2 rounded-lg  text-white bg-pink-900'>Acciones</th>
              
            </tr>
          </thead>
          <tbody>
            {(objPasswords.length>0 && filteredData.length>0)?
            ((valSearch.length>0?filteredData:objPasswords).map((obj,index)=>(
              <tr key={index}>
                {obj._id === idPass? 
                <>
                <td className='  break-words border font-semibold border-pink-100 max-w-xs px-2 bg-white' >
                  <input className=' w-32 border-pink-400 border-2 rounded' type="text" name="nameApp"  value={formData.nameApp} onChange={cambiarValores} />
                </td>

                <td className='  break-words border border-pink-100 max-w-xs px-2 bg-white' >
                  <input className='w-32 border-pink-400 border-2 rounded' type="text" name="user" value={formData.user} onChange={cambiarValores} />
                </td>

                <td className='  break-words border border-pink-100 max-w-xs px-2 bg-white' >
                  <input className='w-auto border-pink-400 border-2 rounded' type="email" name="email" value={formData.email} onChange={cambiarValores} />
                </td>

                <td className='scrollBar border border-pink-100 max-w-xs px-2 bg-white overflow-auto '>
                  <textarea className='scrollBar border-pink-400 border-2 rounded' name="site"  cols="35" value={formData.site} onChange={cambiarValores} rows="5"></textarea>
                  
                </td>

                <td className='  break-words border border-pink-100 max-w-xs px-2 bg-white' >
                  <input className=' border-pink-400 border-2 rounded w-24' type="text" name='password' required='true'  value={formData.password} onChange={cambiarValores}/>
                </td>
                <td className='  break-words border border-pink-100 max-w-xs px-2 bg-white text-center' >
                  <button className='p-1 px-3 mx-2 rounded-xl my-1 bg-blue-600 border-blue-600 border-2 font-semibold hover:bg-blue-700 text-white' onClick={enviarDatosMod} >Guardar</button>
                  <button id={`miBotonDelete_${index}`} className='p-1 px-2 mx-2 rounded-xl my-1 bg-white text-red-600 font-bold border-red-600 border-2  hover:bg-slate-50 disabled:bg-red-200' onClick={cancelarMod} >Cancelar</button>
                </td>
                
                </>
                :
                <>
                <td className='  break-words border font-semibold text-pink-500 border-pink-100 max-w-xs px-2 bg-white' >{obj.nameApp}</td>
                <td className='  break-words border border-pink-100 max-w-xs px-2 bg-white' >{obj.user}</td>
                <td className='  break-words border border-pink-100 max-w-xs px-2 bg-white' >{obj.email}</td>
                <td className='scrollBar border border-pink-100 max-w-xs px-2 bg-white overflow-auto '>{obj.site}</td>
                <td className='  break-words border border-pink-100 max-w-xs px-2 bg-white' ><input type="password" disabled className='w-20' value={obj.password} /></td>
                <td className='  break-words border border-pink-100 max-w-xs px-2 bg-white text-center' >
                  <button className='p-1 px-3 mx-2 rounded-xl my-1 bg-white text-pink-600 font-bold border-pink-600 border-2  hover:bg-slate-50 disabled:bg-pink-200 flex items-center justify-center' onClick={()=>editarDatos(obj._id)} > <FaRegEdit/> Editar</button>
                  <button  className='p-1 px-3 mx-2 rounded-xl my-1 bg-pink-600 border-pink-600 border-2 font-semibold hover:bg-pink-500 text-white flex justify-center items-center' onClick={()=>borrarDato(obj._id)} ><FaRegTrashAlt />Borrar</button>
                </td>
                </>
                }
            </tr>
            )))
            :
            <tr>
              <td className='text-center text-xl italic p-3 w-screen' colSpan={6}>No hay contraseñas registradas</td>
            </tr>
          }

          </tbody>
        </table>
    </div>
    </div>
  )
}

export default Gestionar