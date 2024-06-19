import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const MainQnAItem = ({ data }) => {
  return (
    <Grid item className='qbox' flex={2}>
      <Link to='/qna1' className='qbox-link'>
        <div className='qtitle'>{data.qtitle}</div>
        <div className='qcontent'>{data.qcontent}</div>
      </Link>
    </Grid>
  );
};

export default MainQnAItem;
