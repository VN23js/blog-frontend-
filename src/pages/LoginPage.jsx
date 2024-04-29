
import { Link,useNavigate, } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import React, {useState,useEffect} from 'react'
import { toast } from 'react-toastify'
import {checkIsAuth, loginUser,} from "../redux/features/auth/authSlice"


export const LoginPage = () => {
  const {isLoading} = useSelector((state)=>state.auth)
  const [username,setUsername] =useState('')
  const [password,setPassword] =useState('')
  const {status} = useSelector((state)=>state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const  isAuth =useSelector(checkIsAuth)
  const LoadingSpinner = () => {
    return <span > <div className="loading-spinner-container">Loading...</div></span>
}

  console.log(status)
 console.log(isLoading)
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
 
      
    }else if(status ==='Пользователь не найден'||status ==='Неверный пароль.'||status ==='Пароль или имя не может быть пустыми' ||status ==='Ошибка при Авторизации'){
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
  return (
    
    <form
    
            onSubmit={(e) => e.preventDefault()}
            className='mx-auto mt-30 xl:w-1/3   lg:w-1/2 p-10'
        >
            <h1 className='text-lg text-white text-center'>Авторизация</h1>
            <label className='text-xs text-gray-400'>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder='Username'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-4 px-8 outline-none placeholder:text-gray-700' />
                
            </label>

            <label className='text-xs text-gray-400'>
                Password:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-4 px-8 outline-none placeholder:text-gray-700' />
            </label>

            <div className='flex gap-8 justify-center mt-4'>
                <button
                    type='submit'
                    onClick={handleSubmit}
                    className='flex justify-center items-center text-xs bg-gray-600 text-white rounded-sm py-2 px-4'
                >
                    Войти
                </button>
                <Link
                    to='/register'
                    
                    className='flex justify-center items-center text-xs text-white'
                >
                    Нет аккаунта ?
                </Link>
            </div>
             
        </form>
        
    )
}