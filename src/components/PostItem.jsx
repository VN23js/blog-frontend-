import React from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import Moment from 'react-moment';
import {User} from "@nextui-org/user";
import {Card, CardHeader, CardBody, CardFooter, Image, Button} from "@nextui-org/react";
import {NextUIProvider} from "@nextui-org/react";
import { Link } from 'react-router-dom';
export const PostItem = ({ post }) => {
  if (!post) {
      return (
          <div className='text-xl text-center text-white py-10'>
              Постов не существует.
          </div>
      );
  }

  return (
    <Link to={`/${post._id}`}>
    <div className=' box  flex flex-col bg-gray-800 rounded-md shadow-md  space-y-4' >
        <div className='relative flex justify-center'>
            {post.imgUrl && (
              
                
              <Card className="">
             
              
                <Image
                  isBlurred
                  alt="NextUI Album Cover"
                  className="object-cover  rounded-xl"
                  src={`https://lwr1vjxm-3003.euw.devtunnels.ms/${post.imgUrl}`} 
                  width="100%"
                />
            
            </Card>
            

            )}
        </div>
        <div className='p-5'>
        <div className='text-base name2  text-gray-400'>@{post.username}
        </div>
        <div className='text-sm text-white'>{post.title}</div>
        <p className='text-gray-300 text-xs  line-clamp-[7]'>{post.text}</p>
        <div className='flex justify-between items-center'>
            <div className='text-xs text-gray-400'>
                <Moment date={post.createdAt} format='D MMM YYYY' />
            </div>
            <button className='flex items-center gap-1 text-xs pt-1 text-gray-400'>
                <AiOutlineMessage className='inline' /> {post.comments?.length || 0}
                <div className='bottom-2 right-2 bg-gray-900 bg-opacity-50 w-fit p-1 rounded-md text-white text-xs'>
                    <AiFillEye className='inline' /> {post.views}
                </div>
            </button>
        </div>
        </div>
    
    </div>
    </Link>
  );
}

export default PostItem;

