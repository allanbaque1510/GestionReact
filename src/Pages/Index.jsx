import React, { useState } from 'react'
import Inicio from '../components/Inicio'
import Gestionar from '../components/Gestionar';
import Configuracion from '../components/Configuracion';
import { useAuth } from '../context/AuthContext'
import { FiLogOut,FiSettings } from "react-icons/fi";
import { FaChartBar,FaCalendarAlt,FaBell} from "react-icons/fa";
import { FaHouseChimney} from "react-icons/fa6";
import menuIcon from '../img/menu.png'
import Recordatorios from '../components/Recordatorios';
import Fechas from '../components/Fechas';
const Index = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [indexMenu, setIndexMenu] = useState(0)
  const {user,logOut} = useAuth()

  const opciones = [
    {title: "Inicio", icon:FaHouseChimney, component:Inicio},
    {title: "Gestionar",icon:FaChartBar, component:Gestionar},
    {title: "Recordatorios",icon:FaCalendarAlt, component:Recordatorios},
    {title: "Configuracion",icon:FiSettings, component:Configuracion},
    {title: "Salir",icon:FiLogOut, action:logOut },
  ]
  return (
     <div className='flex'>
        <div className={`${isOpen? 'w-72':'w-14'} 
          duration-300 h-screen bg-pink-900 relative
          p-2 pt-8`}>
          <img 
            src={menuIcon}  
            alt="" 
            className={`absolute cursor-pointer 
              rounded-full border-pink-900 
              border-2 -right-3 top-9 w-7
              ${!isOpen && 'rotate-180'}`}
            onClick={()=>setIsOpen(!isOpen)}
          />
          <div className='flex gap-x-4 items-center'>
            <img src='./src/img/user_icon.jpg' alt=""
              className={`cursor-pointer w-10 h-10 rounded-full duration-500`}
            />
            <h1 className={`text-white duration-300 font-medium text-xl origin-left ${!isOpen && "scale-0"}`}>{user.username}</h1>
          </div>
          <ul className='pt-6'>
            {opciones.map((menu,index)=>(
              <li key={index} 
                onClick={()=>{setIndexMenu(index)}}              
                className={`text-pink-200 text-sm  rounded-xl flex items-center
               gap-x-4 cursor-pointer p-2 mb-4 hover:bg-pink-700 ${indexMenu === index?'bg-pink-600':null}` }>
                <div>{React.createElement(menu?.icon, { size: "20" })}</div>
                <span className={`${!isOpen && 'hidden'} font-semibold origin-left duration-200`}>{menu.title}</span>
              </li>
            ))}
          </ul>
        </div>


        <div className=" px-5 flex-1 h-screen">
            {opciones.map((menu,index)=>(
              index === indexMenu?menu.component? React.createElement(menu?.component, {key:index}):menu.action?menu.action():null :null
            ))}
        </div>

    </div>
  )
}

export default Index