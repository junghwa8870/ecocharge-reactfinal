import { Grid } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const MainInfoItem = ({ data }) => {
  const { title, content } = data;

  return (
    <Grid item className='ibox' flex={2}>
      <Link to={`/newInfo/detail`} className='box-link'>
        <div className='ntitle'>{title}</div>
        <div className='ncontent'>{content}</div>
      </Link>
    </Grid>
  );
};

export default MainInfoItem;
