import React, { useEffect, useState } from 'react'
import { usePassContext } from '../context/PasswordContext'
import { useAuth } from '../context/AuthContext';
import { BsFillBookmarkPlusFill } from "react-icons/bs";
import { FaEye,FaEyeSlash ,FaCopy} from "react-icons/fa6";
import FormAddPassw from './FormAddPassw';
import Swal from 'sweetalert2'

const Inicio = () => {
  const [openForm, setOpenForm] = useState(false)
  const [items, setItems] = useState([]);
  const [valSearch, setValSearch] = useState('');
  
    const {viewAllPass,objPasswords,objPassword}= usePassContext();   
    const {user} = useAuth()

    const cerrarForm=(valor)=>{
      setOpenForm(valor)
    }
    const mostrarContraseña = (value,boton) =>{
      const tipo = document.getElementById(value);
      if(tipo.type == "password"){
        setItems([...items, boton]); 
        tipo.type = "text";
      }else{
        const nuevaLista = items.filter(item => item !== boton);
        setItems(nuevaLista);
        tipo.type = "password";
      }
    }

    const copiarCredencial  = (value) =>{
      navigator.clipboard.writeText(value)
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        width:200,
        text: 'Credenciales copiadas',
        showConfirmButton: false,
        timer: 1500,
        backdrop:false
      })
    }
    useEffect(() => {
      viewAllPass()
    }, [objPassword])

    const filteredData = objPasswords.filter(item =>
        Object.values(item).some(value =>
          typeof value === 'string' && value.includes(valSearch)
        )
      );
    
   
    return (
        <div className=' scrollBar bg-pink-100 h-screen rounded-xl py-3 overflow-auto'>
            <h1 className=' text-center text-4xl font-bold'>Panel de credenciales de {user.username}</h1>
            <div className='flex  justify-between'>
          
              <input type="search" 
                  className='h-9  mx-4 text-lg border-pink-500 border-2 rounded outline-none' 
                  name="" 
                  id="" 
                  value={valSearch}
                  placeholder='  Buscar contenido'
                  onChange={(e)=>setValSearch(e.target.value)}
              />

              <button 
                type="button" 
                className='mx-10 bg-pink-700 font-semibold flex items-center
                gap-x-2 cursor-pointer text-white p-2 rounded-xl hover:bg-pink-500 duration-150'
                onClick={()=>{setOpenForm(true)}}
               >
              <BsFillBookmarkPlusFill/> <span className='origin-left'>Añadir contraseña</span>
              </button>
            </div>
            <hr className=" h-1 rounded-full my-3 mx-2 bg-gray-200 border-0 dark:bg-pink-900"/>
            
            <div className=" m-3 rounded-xl">
            <div className={` duration-300 ${!openForm && "scale-0 h-0"}`}>
              <FormAddPassw cerrarForm={cerrarForm}/>
            </div>
             <div className="duration-300">
              {objPasswords.length > 0 && filteredData.length>0? 
               
               <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {(valSearch.length>0?filteredData:objPasswords).map((pass,index)=>(
                  <li className=' scrollBar bg-white mx-2 my-4 rounded-xl max-w-lg flex flex-col ' key={index}>
                      <div className="bg-pink-700 flex flex-col items-center rounded-t-xl">
                        <img className=' bg-white p-1 rounded-full w-16 h-16 -mt-4 border-4 border-pink-700' src={pass.imagen} alt="" />
                        <span className='text-white font-bold'>
                          {pass.nameApp}

                        </span>
                      </div>
                      <div className="fondoStitch">

                    <div className=" overflow-auto scrollBar">

                    <table className='table-fixed mb-2 m-2'>
                      <tbody>
                      {pass.email.length > 0?<tr className=''><td className='labelPass'>Correo: </td><td className='break-words font-bold sombraBlanca'>{pass.email}</td></tr>: null } 
                      {pass.user.length > 0?<tr className=''><td className='labelPass'>Usuario: </td><td className='break-words font-bold sombraBlanca'>{pass.user}</td></tr>: null } 
                      {pass.site.length > 0?<tr className=''><td className='labelPass'>URL: </td><td><a href={pass.site.includes('https')?pass.site:"https://"+pass.site}  rel="noopener noreferrer" className=' px-1 p-0.5 font-bold text-pink-500 rounded underline' target='_blank'>Visitar pagina</a></td></tr>: null } 
                      <tr className=''> 
                        <td className='labelPass'>Contraseña:</td> 
                        <td>
                        <input type="password" className='font-bold backdrop-blur-sm rounded-full px-1' name="password-input" id={`password-input${index}`} value={pass.password} disabled />
                        </td>
                      </tr> 
                   
                        </tbody>
                      </table>
                      </div>

                      <span className=' flex-1 flex justify-center flex-row'>
                        <button 
                          type="button" 
                          className=' flex items-center h-10  gap-x-2 mt-auto bg-pink-800 text-white p-2 mx-2 
                            rounded-xl hover:bg-pink-500 duration-150' 
                          onClick={()=>copiarCredencial(pass.password)}>
                          <FaCopy/> Copiar
                        </button>
                        <button 
                          type="button"
                          id={`btnMostrar_${index}`} 
                          className=' bg-pink-800 text-white h-10 p-2 mt-auto mx-2 rounded-xl hover:bg-pink-500 duration-150 flex items-center gap-x-2' 
                          onClick={()=>{mostrarContraseña(`password-input${index}`,`btnMostrar_${index}`)}}
                          >
                            {items.includes(`btnMostrar_${index}`) ? 
                          <>
                          <FaEyeSlash/>Ocultar
                          </>
                          :
                          <>
                          <FaEye/>Mostrar
                          </>
                            
                            }
                        </button>
                      </span>
                      </div>

                    
                   </li> 
                  ))}
                  </ul>
                  :
                  <div className='text-center text-xl italic'>No hay contraseñas registradas</div>
                }
             </div>

            </div>


        </div>
    )
}

export default Inicio