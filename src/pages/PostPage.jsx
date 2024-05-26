import React, { useCallback,useEffect, useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux'
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiFillDelete } from 'react-icons/ai';
import CreateIcon from '@mui/icons-material/Create';
import Moment from 'react-moment';
import  axios from '../utils/axios'
import {Link, useParams } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { getByIdPost } from '../redux/features/post/postSlice'
import {deleteByIdPost} from '../redux/features/post/postSlice'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { FaPenToSquare } from "react-icons/fa6";
import { createComment } from '../redux/features/post/postSlice';
import { getComment } from '../redux/features/post/postSlice'
import {CommentItem} from '../components/commetItem'
import {CommentSkeletons} from '../components/Skeleton'
export const PostPage = () => {

  const { idrt } = useParams()// <Route path=":idrt" element={<PostPage />} />
  const dispatch = useDispatch()
  const {posts} = useSelector((state) => state.post)
  const {author} = useSelector((state) => state.post)
  const {_id} = useSelector((state) => state.auth)
  const {username} = useSelector((state) => state.post)
  const {imgUrl} = useSelector((state) => state.post)
  const {title} = useSelector((state) => state.post)
  const {text} = useSelector((state) => state.post)
  const comments = useSelector((state) => state.post.comments);
  const {loading2} = useSelector(state => state.post)
  const [loadingComments, setLoadingComments] = useState(true);
  const {createdAt} = useSelector((state) => state.post)
  const {views} = useSelector((state) => state.post)
  const {loading} = useSelector(state => state.post)
  const {status} = useSelector(state => state.post)

const [comment, SetComment] = useState('')
  const navigate=useNavigate()
  const  removePostHandler =()=>{
    try {
      dispatch(deleteByIdPost(idrt))
     
    } catch (error) {
      console.error(error)
    }
  }
  const hundleSubmit = ()=>{
    if (!comment.trim()) {
      toast.error('Комментарий не может быть пустым');
      return;
    }
try {
  
  const postId = idrt
  dispatch(createComment({postId, comment}))
  SetComment('')
  
} catch (error) {
  
}
  }

  useEffect(() => {
    if(status==='Пост успешно удален'){
      toast.success('Пост успешно удален')
      navigate('/')
    }else if(status==='Такого поста не существует'||status==='Что-то не так!'){
      toast.error('Что-то не так!')
    }
  })

console.log('Пользователь авторизованный:',_id,"id автора:",author)
  useEffect(() => {
      dispatch(getByIdPost(idrt))
  }, [dispatch,idrt])

const LoadingSpinner = () => {
  return <span > <div className="loading-spinner-container"></div></span>
}
const Error404 = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ fontSize: '50px', color: 'red' }}>404</h1>
      <h2 className='text-white'>Page Not Found</h2>
      <p className='text-white' >Sorry, the page you are looking for does not exist.</p>
    </div>
  );
};
useEffect(() => {
  console.log(idrt,'idrt')
}, [idrt])

 useEffect(() => {
  dispatch(getComment(idrt)).then(() => setLoadingComments(false));
  }, [dispatch, idrt]);


console.log(idrt,'idrt')
console.log(loading,'Загрузка поста по id')
if(loading===true) {
  return  <LoadingSpinner />
}

if(status==='Post not found'||status==='Что-то не так!') {
  return <Error404 />
}
  return (
    <div className='   flex flex-col  rounded-md   space-y-4' >
      <div className=' media-800 flex justify-around     gap-10 py-8 '>
        <div className=' basis w-2/6'>
          <div className='flex flex-col basis1/4 flex-grow'>
          <div className='relative flex justify-center'>
            {imgUrl && (
              
                
              <Card className="">
  
                <Image
                  isZoomed
                 
                  isBlurred
                  alt="NextUI Album Cover"
                  className="object-cover  "
                  src={`https://lwr1vjxm-3003.euw.devtunnels.ms/${imgUrl}`} 
                  width={800}
                />
            
            </Card>
            

            )}
        </div>
          </div>
          <div className=' pt-5'>
        <div className='text-base name2 flex  items-center justify-between text-gray-400'>@{username}
        {_id=== author && (    <div className=' w-100'>
        <div className='flex items-center gap-1 text-xs text-gray-400'>
         
                <Tooltip   title="Edit">
                <Link to={`/${idrt}/edit`}>
                <CreateIcon    className='inline size-5 cursor-pointer' /> 
                </Link>
                 </Tooltip>
               
                <div className='bottom-2 right-2  w-fit p-1 rounded-md text-white text-xs'>
                     <Tooltip title="Delete">
                   
                      <DeleteIcon 
                      onClick={removePostHandler}
                      className=  ' cursor-pointer size-5 text-red'  />
                     
                       </Tooltip>
                </div>
            </div>
            </div>)}
        </div>
        <div className='text-sm text-white'>{title}</div>
        <p className='text-gray-300 text-xs'>{text}</p>
        <div className='flex justify-between items-center'>
            <div className='text-xs text-gray-400'>
                <Moment date={createdAt} format='D MMM YYYY' />
            </div>

            <button className='flex items-center gap-1 text-xs text-gray-400'>
              <div>
            
              </div>
             
                <AiOutlineMessage className='inline' /> {comments?.length || 0}
                <div className='bottom-2 right-2 bg-gray-900 bg-opacity-50 w-fit p-1 rounded-md text-white text-xs'>
                    <AiFillEye className='inline' /> {views}
                </div>
            </button>
   
          
        </div>
      
        </div>
        </div>
         <div className='min-height text-white w-full lg:w-1/3 p-5 bg-gray-700 flex flex-col gap-2 rounded-xl'>
          <form  className='flex gap-2' onSubmit={(e)=>e.preventDefault()}>
            <input
            type= "text"
            value={comment}
            onChange={(e)=> SetComment(e.target.value)}
            placeholder='Comment'
            className='w-full bg-gray-400 text-black text-xs p-2 rounded-md outline-none placeholder:text-gray-700'
            >
            </input><Button onClick={hundleSubmit} color="success"   className=" flex justify-center items-center texT text-black  py-2 px-4">Добавить</Button>
            </form>
            {loadingComments  ? (
            <div>
              <CommentSkeletons />
              <CommentSkeletons />
              <CommentSkeletons />
            </div>
          ) : (
            comments?.map((cmt) => <CommentItem key={cmt._id} cmt={cmt} />)
          )}
            </div>

    </div>

  </div>

  )
}
