import * as React from 'react';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
export const CommentSkeletons = ()=> {
  return (
    <Box  sx={{ fontSize: '2rem' }}>
      <Skeleton />
      <Skeleton animation="wave" />
      <Skeleton animation={false} />
    </Box>
);

}
