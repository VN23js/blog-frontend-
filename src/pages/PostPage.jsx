import React, { useCallback,useEffect, useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/react";
import { useDispatch, useSelector } from 'react-redux'
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';
import  axios from '../utils/axios'
import {useParams } from 'react-router-dom'

import { getByIdPost } from '../redux/features/post/postSlice'
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
  const {comments} = useSelector((state) => state.post)
  const {createdAt} = useSelector((state) => state.post)
  const {views} = useSelector((state) => state.post)
  const {loading} = useSelector(state => state.post)
  const {status} = useSelector(state => state.post)
  
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

console.log(loading)
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
        <div className='text-base name2  text-gray-400'>@{username}
        </div>
        <div className='text-sm text-white'>{title}</div>
        <p className='text-gray-300 text-xs'>{text}</p>
        <div className='flex justify-between items-center'>
            <div className='text-xs text-gray-400'>
                <Moment date={createdAt} format='D MMM YYYY' />
            </div>

           {_id=== author && (  <button className='flex items-center gap-1 text-xs text-gray-400'>
              <div>
            
              </div>
             
                <AiOutlineMessage className='inline' /> {comments?.length || 0}
                <div className='bottom-2 right-2 bg-gray-900 bg-opacity-50 w-fit p-1 rounded-md text-white text-xs'>
                    <AiFillEye className='inline' /> {views}
                </div>
            </button>
          )}
        </div>
        </div>
        </div>
         <div className=' text-white -1/3'>COMENTS</div>

    </div>

  </div>

  )
}
