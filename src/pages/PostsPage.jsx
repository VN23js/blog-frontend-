import React, { useEffect, useState } from 'react'
import axios from "../utils/axios";
import PostItem from '../components/PostItem';
export const PostsPage = () => {
  const LoadingSpinner = () => {
    return <span > <div className="loading-spinner-container"></div></span>
  }
  const [setIsLoading,setIsLoading2] = useState(false);// uppdate state component
  const [posts,setPosts] = useState([]);
  const fetchMyPosts = async () =>{
   
    try {
      setIsLoading2(true)
      const {data} = await axios.get('/posts/user/me')
      setPosts(data)
      setIsLoading2(false)
    } catch (error) {
      console.error(error)
      setIsLoading2 (false)
    }
  }
  useEffect(()=>{
    fetchMyPosts()


  },[])
console.log(setIsLoading ,'Загрузка')
  if(setIsLoading===true){
    return <LoadingSpinner/>
  }
  if(!posts || !posts.length){
    return <div className='max-w-[900px] mx-auto py-10'>
    <div className='flex justify-center gap-8'>
        <div className=' post   flex flex-col gap-10  basis-8/12    sm:basis-3/6' >
      <h1 className='text-center text-white text-2xl font-bold'>No posts yet</h1>
    </div>
    </div>
    </div>
  }
  return (
    <div className='max-w-[900px] mx-auto py-10'>
          
    <div className='flex justify-center gap-8'>
        <div className=' post   flex flex-col gap-10  basis-8/12  sm:basis-3/6' >
      {posts?.map((post,indx) =><PostItem key={indx} post={post}/>)}
    </div>
    </div>
    </div>
  )
}
