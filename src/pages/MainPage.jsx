import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'

export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, popularPost } = useSelector((state) => state.post)
    const {loading} = useSelector(state => state.post)
    console.log(popularPost)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    const LoadingSpinner = () => {
      return <span > <div className="loading-spinner-container">Loading...</div></span>
    }

    
   console.log(loading)
    if(loading===true) {
      return  <LoadingSpinner />
    }

  
    if (!posts.length) {
      return (
          <div className='text-xl text-center text-white py-10'>
              Постов не существует.
          </div>
      )
  }
    return (
      
        <div className='max-w-[900px] mx-auto py-10'>
            <div className='flex justify-between gap-8'>
                <div className='flex flex-col gap-10 basis-4/5'>
                    {posts?.map((post, idx) => (
                        <PostItem key={idx} post={post} />
                    ))}
                </div>
                <div className='basis-1/5'>
                    <div className='text-xs uppercase text-white'>
                        Популярное:
                    </div>

                    {popularPost?.map((post, idx) => (
                        <PopularPosts key={idx} post={post} />
                    ))}
                </div>
            </div>
        </div>
    )
    
}