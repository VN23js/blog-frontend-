import React, {useState,useEffect} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'//import свойства 
import {useDispatch, useSelector} from "react-redux"
import { toast } from 'react-toastify'
import {registerUser,checkIsAuth, logout} from "../redux/features/auth/authSlice"

import {Button,  Input, } from "@nextui-org/react";
export const RegisterPage = () => {

const [username,setUsername] =useState('')
const [password,setPassword] =useState('')
const {isLoading} = useSelector((state)=>state.auth)
const dispatch = useDispatch()
const navigate = useNavigate()
const {status} = useSelector((state)=>state.auth)
const LoadingSpinner = () => {
  return <span > <div className="loading-spinner-container"></div></span>
}

const  isAuth =useSelector(checkIsAuth)
console.log(status)
console.log(isLoading, 'Загрузка и проверка регистрации')
useEffect(() => {
  if(status ==='Пользователь успешно создан') {
    toast.success(status,{
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })
  
  }else if(status ==='Username занят'||status ==='Введите пароль'||status ==='Ошибка при создании пользователя'||status ==='Заполните все поля! '){
    toast.error(status,{
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    })

  }
 
  if(isAuth) navigate('/')
},[status,isAuth,navigate])


const  handleSubmit = () =>{
  try {
dispatch(registerUser({username,password}))
setPassword('')
setUsername('')
    
  } catch (error) {
    console.log(error)
  }
}
if(isLoading===true){
 return <LoadingSpinner />
}
const variants = [ "default"];
  return (
    <form 
  onSubmit={e => e.preventDefault()}
  className='mx-auto mt-30 xl:w-1/2 lg:w-1/2 p-2'
  style={{ maxWidth: '490px' }} // Set max-width to 400px
><div className='bg-content '>
  <h1 className='text-2xl pb-6 text-white text-center'>Регистрация</h1>
  
  <label className='text-xs text-gray-400'>
  {variants.map((variant) => (
    <Input
    isRequired
    key={variant}
    variant={variant}
     label="Name"
      type='text'
      
      value={username} 
      onChange={e => setUsername(e.target.value)}
      placeholder='Введите свое имя' 
      className='   text-black w-full   p-2 outline-none ' />
      
    ))}  
  </label>

  <label className='text-xs text-gray-400'>
  {variants.map((variant) => (
    <Input
  key={variant}
  variant={variant}
     label="Password"
      type='Password' 
      isRequired
      value={password}
      onChange={e => setPassword(e.target.value)}
      placeholder='Введите свой пароль' 
      className='  text-black w-full   p-2 outline-none ' 
      
     />
    ))}  
  </label>

  <div className='flex gap-7  justify-center mt-4'>
  
    <Button 
     radius="md"
      type='submit' 
      onClick={handleSubmit}
      className='flex justify-center items-center  bg-gray-600 text-white py-2 px-4'
    >
      Подтвердить
    </Button>
    
   
    <Link  color="primary" size="sm"  to='/login' className='flex  justify-center items-center  text-white'>
      Уже зарегистрирован
    </Link>
   
  </div>
  </div>
</form>
  )
}

///////
