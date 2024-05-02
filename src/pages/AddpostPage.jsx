
import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { createPost } from "../redux/features/post/postSlice";
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'//import свойства 
import { clear} from '../redux/features/post/postSlice';
import {Textarea} from "@nextui-org/react";
export const AddPostPage=()=>{
    const[title,setTitle]=useState("")
    const[text,setText]=useState("")
    const[image,setImage]=useState("")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const { status } = useSelector((state) => state.post)
    const submitHandler=()=>{

        if (!title || !text) {
            toast.error("Заполните все поля");
        } else {
            try {
                const data = new FormData();
                data.append('title', title);
                data.append('text', text);
                if (image) {
                    data.append('image', image);
                }
                dispatch(createPost(data));

            
                
                
            } catch (error) {
                // обработка ошибки
            }
        }
    }
    const clearFormHandler =()=>{
    
        setTitle('')
        setText('')
       
    }
    console.log(status)
    useEffect(() => {
        if(status==='Пост успешно создан') {
          toast.success(status,{
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            
          })
        
          setTimeout(function(){
            navigate('/');
            }, 3000);
        }else if(status ==='Ошибка'||status ==='Поля не могут быть пустыми'||status ==='Нет доступа.'||status ==='User is not an admin'){
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
        
          if(status){
            dispatch(clear())
            
        } 
        }, [status]);
      
    const {loading} = useSelector((state)=>state.post)
    const LoadingSpinner = () => {
        return <span > <div className="loading-spinner-container"></div></span>
      }
     console.log(loading)
      if(loading===true) {
        return  <LoadingSpinner />
      }


    return(
        <form 
        className=" mx-auto mt-30 xl:w-1/3   lg:w-1/2 p-10"  
        onSubmit={e=> e.preventDefault()}
        
        >
         <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center  text-center  justify-center border-2 border-dotted cursor-pointer">
            Прикрепить изображение:
            <input type="file" className="hidden" 
            onChange={e=>setImage(e.target.files[0])} name="image" />
         </label>
         <div className="flex object-cover py-2  ">
            {image && 
                <img src={URL.createObjectURL(image)} alt={image.name}/>
            }
         </div>
         <label className="text-xs text-white opacity-70" >
            Заголовок поста:
            <input type="text" 
            value={title}
            onChange={e=>setTitle(e.target.value)}
            placeholder="Заголовок" name="title" className="w-full mx-auto py-2 px-2 text-gray-950 text-sm mt-2 flex  rounded placeholder:text-gray-700 text-center  justify-center  cursor-pointer" />
         </label>
         
         <label className="text-xs text-white opacity-70" >
            Текст поста:
         <Textarea
             onChange={(e) => setText(e.target.value)}
             value={text}
             isRequired
          
             labelPlacement="outside"
             placeholder="Текст поста"
             className="w-full cursor-pointer h-30" />
         </label>
         <div className=" flex gap-8 items-centr justify-center mt-4">
         <button onClick={submitHandler} className=" flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4">Добавить </button>
         <button onClick={clearFormHandler} className=" flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4">Отменить </button>
         </div>
        </form>
    )
}