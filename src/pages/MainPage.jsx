import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PopularPosts } from '../components/PopularPosts'
import { PostItem } from '../components/PostItem'
import { getAllPosts } from '../redux/features/post/postSlice'



export const MainPage = () => {
    const dispatch = useDispatch()
    const { posts, } = useSelector((state) => state.post)
    const { popularPosts } = useSelector((state) => state.post)//забыл дописать s +_- popularPosts !=== popularPost
    const {loading} = useSelector(state => state.post) 
    
    console.log(popularPosts)
   
    useEffect(() => {
        dispatch(getAllPosts())
    }, [dispatch])


    const LoadingSpinner = () => {
      return <span > <div className="loading-spinner-container"></div></span>
    }

    
   console.log(loading,'Загрузка главной')
    if(loading===true) {
      return  <LoadingSpinner />
    }


    if(!posts || !posts.length){


      return (
          <div className='text-xl text-center text-white py-10'>
              Постов не существует.
          </div>
      )
  }
    return (
      
        <div className='max-w-[900px] mx-auto py-10'>
          
            <div className='flex justify-center gap-8'>
                <div className=' post   flex flex-col gap-10  basis-8/12    lg:basis-3/6' >
                    {posts?.map((post, idx) => (
                        <PostItem key={idx} post={post} />
                    ))}
                </div>
             
            </div>
              {/*}  <div className='basis-1/5'>
                    <div className='text-xs uppercase text-white'>
                        Популярное:
                    </div>

                    {popularPosts?.map((post, idx) => (
                        <PopularPosts key={idx} post={post} />
                    ))}
                </div>
                */}
        </div>

        
    )
    
}