
import React, {useState,useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { createPost } from "../redux/features/post/postSlice";
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'//import свойства 
import { clear} from '../redux/features/post/postSlice';
import {Textarea} from "@nextui-org/react";
import {Button} from "@nextui-org/react";
import { FaPenToSquare } from "react-icons/fa6";
import {useParams } from 'react-router-dom'
import { selectPostId } from '../redux/features/post/postSlice'
import { getByIdPost } from '../redux/features/post/postSlice'
import { updatePost } from "../redux/features/post/postSlice";

import axios from "../utils/axios";

export const EditPostPage = () => {
    const[title,setTitle]=useState("")
    const[text,setText]=useState("")
    const[oldImage,setOldImage]=useState("")
    const[newImage,setNewImage]=useState("")
    
    const dispatch=useDispatch() 
    
    const navigate=useNavigate()
    const {_id} = useSelector((state) => state.auth)
    const { idrt } = useParams()//   <Route path=":idrt/edit" element={<EditPostPage />} />
    const { status } = useSelector((state) => state.post)
    const postId = useSelector((state) => state.post.postId);
    const {loading} = useSelector(state => state.post)
    const LoadingSpinner = () => {
    const [setLoding,setLoding2] = useState(false)
      return <span > <div className="loading-spinner-container"></div></span>
    }
    console.log(`EditPostPage`,status)
    console.log(`EditPostPageLoding`,loading)
    const [posts,setPosts] = useState([]);
    console.log('author',posts.author)
    
    useEffect(()=>{
      if(status==="Пост успешно обновлен"){
        toast.success("Пост успешно обновлен")
        
          setTimeout(() => {
            if(status){
              dispatch(clear()) 
          } 
          navigate(`/${idrt}`)
          }, 2000);
      
      }else if(status==="Вы не являетесь автором этого поста"){
        toast.error(status)
      }
    },[status,dispatch,idrt,navigate,posts.author])
    
    
    const fetchMyPosts = useCallback( async () =>{
   
      try {
        const {data} = await axios.get(`/posts/${idrt}/edit`)
        setTitle(data.title)
        setText(data.text)
        setOldImage(data.imgUrl)
        setPosts(data)
       
      } catch (error) {
        console.error(error)
       
      }
    },[idrt,])
    useEffect(()=>{
      fetchMyPosts()
  
  
    },[fetchMyPosts])
    console.log(posts,'posts')
     console.log("Post _id from Redux store:", postId);
    const submitHandler=()=>{

        if (!title || !text) {
            toast.error("Заполните все поля!");
        } else {
            try {
                const data = new FormData();
                data.append('title', title);
                data.append('text', text);
                if (newImage) {
                    data.append('image', newImage);
                }
                data.append('author',posts.author)
                data.append('id', idrt);
               
                dispatch(updatePost(data));

                
            } catch (error) {
                // обработка ошибки
            }
        }
    }
    const clearFormHandler =()=>{
    
        setTitle('')
        setText('')
       
    }
 console.log(idrt,'idrt Post id')
 if(loading===true) {
  return  <LoadingSpinner />
}


  return(
    <form 
    className=" mx-auto mt-30 xl:w-1/3   lg:w-1/2 p-10"  
    onSubmit={e=> e.preventDefault()}
    style={{ maxWidth: '450px' }}
    >
     <label className="text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center  text-center  justify-center border-2 border-dotted cursor-pointer">
        Прикрепить изображение:
        <input type="file" className="hidden" 
        onChange={(e)=>{setNewImage(e.target.files[0])
          setOldImage('')
        }} name="image" />
     </label>
     <div className="flex object-cover py-2  ">
        {oldImage && 
            <img src={`https://lwr1vjxm-3003.euw.devtunnels.ms/${oldImage}`} alt={oldImage.name}/>
        }
         {newImage && 
            <img src={URL.createObjectURL(newImage)} alt={newImage.name}/>
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
     <Button  color="success"  onClick={submitHandler} className=" flex justify-center items-center  text-black  py-2 px-4">Обновить<FaPenToSquare/></Button>
     <Button  onClick={clearFormHandler} className=" flex justify-center items-center bg-red-500  text-white  py-2 px-4">Отменить </Button>
     </div>
    </form>
)
}
