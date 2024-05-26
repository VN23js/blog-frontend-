import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
export const CommentItem = ({ cmt }) => {
    return (
        <div className='flex items-center   gap-3'>
            <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm'>
            <AccountCircleIcon/>
           
            </div>
           
          
            <div className='contents'>
         
            <div className='flex flex-col text-gray-300 text-[10px] comment-text'><span className='name2 text-lg '>{cmt.username}</span>{cmt.comment} </div>
            </div>
         
   
            </div>
           
        
    );
};
