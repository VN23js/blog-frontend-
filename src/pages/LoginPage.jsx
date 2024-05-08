
import { Link,useNavigate, } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import React, {useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import {checkIsAuth, loginUser,} from "../redux/features/auth/authSlice";
import {NextUIProvider} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import {Input} from "@nextui-org/react";


export const LoginPage = () => {
  const {isLoading} = useSelector((state)=>state.auth)
  const [username,setUsername] =useState('')
  const [password,setPassword] =useState('')
  const {status} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const  isAuth =useSelector(checkIsAuth)
  const LoadingSpinner = () => {
    return <span > <div className="loading-spinner-container"></div></span>
}

  console.log(status)
 console.log(isLoading, 'Загрузка и проверка авторизации')
  useEffect(()=>{
    if(status ==='Авторизация успешна') {
      toast.success(status,{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
 
      
    }else if(status ==='Пользователь не найден'||status ==='Неверный пароль.'||status ==='Заполните все поля!' ||status ==='Ошибка при Авторизации'){
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
 
  const handleSubmit = () => {
    try {
        dispatch(loginUser({ username, password }))
    } catch (error) {
        console.log(error)
    }
}
if(isLoading===true) {
  return  <LoadingSpinner />
}
const variants = [ "default"];
  return (
   
     <form 
  onSubmit={e => e.preventDefault()}
  className='mx-auto mt-30 xl:w-1/2 lg:w-1/2 p-2'
  style={{ maxWidth: '490px' }} // Set max-width to 400px
> <div className='bg-content '>
  <h1 className='text-2xl pb-6 text-white text-center'>Авторизация</h1>
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
                    className='flex justify-center items-center  bg-gray-600 text-white  py-2 px-4'
                >
                    Войти
                </Button>

               
                <Link
                    to='/register'
                    
                    className='flex justify-center items-center  text-white'
                >
                    Нет аккаунта ?
                </Link>
               
            </div>
            </div>
        </form>
       
    )
}
