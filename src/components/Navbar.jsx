//import React from 'react'
import React, { useEffect, useState } from "react";
import {useDispatch, useSelector } from 'react-redux'
import { Link,NavLink } from 'react-router-dom'
import {checkIsAuth, logout} from '../redux/features/auth/authSlice'
import {toast} from 'react-toastify'




export const Navbar = () => {
    
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

        
        <span   className=' name flex justify-center  items-center p-1 w-10% h-10 bg-gray-600 text-xs text-center text-white rounded-sm '> {isAuth ?(
 
         <p>Имя: {user}</p>
     )
    :(
  <div className=''>
    <div>
    <p>Имя:</p>
    </div>
    </div>
)}</span>
       
       {
        isAuth&&( <ul className=' title-navbar flex gap-4'>
        <li >
            <NavLink to={''} href="/" className=' text-navlink text-xs sm:text-base text-gray-400 hover:text-white' style={({isActive})=> isActive ? activeStyles:undefined}>
               
                Главная

            </NavLink >
            </li>
            <li >
            <NavLink to={'/posts'}   href="/" className=' text-navlink text-xs sm:text-base text-gray-400 hover:text-white'style={({isActive})=> isActive ? activeStyles:undefined} >
                Мои посты
            </NavLink>
            </li>
            <li >
            <NavLink to={'/new'}  href="/" className=' text-navlink  text-xs sm:text-base text-gray-400 hover:text-white' style={({isActive})=> isActive ? activeStyles:undefined}>
                Добавить пост
            </NavLink>
            </li>
        </ul>)
       }

    
        <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
            {
            isAuth?<button className='bg-gray-600   hover:text-white'onClick={logoutHandler}  >Выйти</button>
            : <Link to={'/login'}>Войти</Link>
            
            }
           
          
           
           
        </div>
       
    </div>

   
  )
}
