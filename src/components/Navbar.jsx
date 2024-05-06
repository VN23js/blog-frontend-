//import React from 'react'
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from 'react-redux'
import { Link,NavLink } from 'react-router-dom'
import {checkIsAuth, logout} from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'
import {Button} from "@nextui-org/react";
import { MdLogout } from "react-icons/md";
import {Image} from "@nextui-org/react";
import { BiLogoMagento } from "react-icons/bi";
export const Navbar1 = () => {
 
    const {user} = useSelector((state)=>state.auth)
    console.log(user)
    const isAuth =useSelector(checkIsAuth)

const dispatch = useDispatch()
    const activeStyles ={
        color:'white'
    }

    const logoutHandler=()=>{
        dispatch(logout())
        window.localStorage.removeItem('token')
        toast.info("Вы вышли из аккаунта!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }


    
  return (
   
    <div className='flex py-4 justify-between items-center'>
    <span   className=' flex justify-center  items-center w-10% h-10 text-xl text-center text-white rounded-sm '>{isAuth ?(
 <NavLink to={''} href="/" className=' text-navlink text-medium  sm:text-base text-gray-400 hover:text-white' style={({isActive})=> isActive ? activeStyles:undefined}>
               
 <p className="font-bold text-white text-inherit"><BiLogoMagento className="    font  text-5xl"/></p>

 </NavLink >
       )
        :(
    <div className=''>
    <div>
    <NavLink to={''} href="/" className=' text-navlink text-medium  sm:text-base text-gray-400 hover:text-white' style={({isActive})=> isActive ? activeStyles:undefined}>
               
               <p className="font-bold text-white text-inherit"><BiLogoMagento className="    font  text-5xl"/></p>
              
               </NavLink >
    </div>
    </div>
    )}</span>
    <div className='m-auto  flex py-4 justify-between items-center'> 
       {
        isAuth&&( <ul className=' title-navbar flex gap-4'>
        <li >
            <NavLink to={''} href="/" className=' name  text-navlink text-medium  sm:text-base text-gray-400 hover:text-white' style={({isActive})=> isActive ? activeStyles:undefined}>
               
            <p className="">Главная</p>

            </NavLink >
            </li>
            <li >
            <NavLink to={'/posts'}   href="/" className=' text-navlink text-medium  sm:text-base text-gray-400 hover:text-white'style={({isActive})=> isActive ? activeStyles:undefined} >
                Мои посты
            </NavLink>
            </li>
            <li >
            <NavLink to={'/new'}  href="/" className=' text-navlink   text-medium  sm:text-base text-gray-400 hover:text-white' style={({isActive})=> isActive ? activeStyles:undefined}>
                Добавить пост
            </NavLink>
            </li>
        </ul>)
       }
</div>
    
        <div className='flex justify-center  items-center text-xs text-white  py-2'>
        <Button className='bg-gray-600 px-0 text-white '>
            {
            isAuth?<Button className='bg-gray-600   text-white px-0 hover:text-white'onClick={logoutHandler}  >Выйти<MdLogout/></Button>
            : <Link  className='flex  items-center ' to={'/login'}>Войти </Link>
            
            }
           </Button>
          
           
           
        </div>
       
    </div>

   
  )
}
