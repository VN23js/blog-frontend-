import React from 'react';

export const CommentItem = ({ cmt }) => {
    return (
        <div className='flex items-center gap-3'>
            <div className='flex items-center justify-center shrink-0 rounded-full w-10 h-10 bg-blue-300 text-sm'>
                Avatar
            </div>
            <div className='flex text-gray-300 text-[10px] comment-text'>{cmt.comment}</div>
        </div>
    );
};
