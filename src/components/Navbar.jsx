import React from 'react'
import { Link,NavLink } from 'react-router-dom'
export const Navbar = () => {
  return (
    <div className='flex py-4 justify-between items-center'>
        <span className=' flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm '>E</span>
        <ul className='flex gap-8'>
        <li >
            <NavLink to={''} href="/" className='text-xs text-gray-400 hover:text-white'>
                Главная
            </NavLink >
            </li>
            <li >
            <NavLink to={'/posts'}   href="/" className='text-xs text-gray-400 hover:text-white' >
                Мои посты
            </NavLink>
            </li>
            <li >
            <NavLink to={'/new'}  href="/" className='text-xs text-gray-400 hover:text-white' >
                Добавить пост
            </NavLink>
            </li>
        </ul>
    
        <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
            <button className='bg-gray-600   hover:text-white'  >Войти</button>
        </div>
    </div>
  )
}
