import React from 'react';
import './MainInfo.scss';
import { Grid, Typography, Button } from '@mui/material';

import { Link } from 'react-router-dom';

const MainInfo = () => {
  return (
    <Grid container className='container' style={{ width: '80%' }}>
      <Typography flex={2} variant='h4' className='title'>
        새소식
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Grid item className='box' flex={2} style={{ backgroundColor: 'pink' }}>
          <div className='ntitle'>제목테스트1</div>
          <div className='ncontent'>내용테스트1</div>
        </Grid>
        <Grid item className='box' flex={2} style={{ backgroundColor: 'pink' }}>
          <div className='ntitle'>제목테스트1</div>
          <div className='ncontent'>내용테스트1</div>
        </Grid>
        <Grid item className='box' flex={2} style={{ backgroundColor: 'pink' }}>
          <div className='ntitle'>제목테스트1</div>
          <div className='ncontent'>내용테스트1</div>
        </Grid>
        <Grid item className='box' flex={2} style={{ backgroundColor: 'pink' }}>
          <div className='ntitle'>제목테스트1</div>
          <div className='ncontent'>내용테스트1</div>
        </Grid>
      </div>
      <Button
        component={Link}
        to='/newInfo'
        variant='outlined'
        style={{ color: 'black' }}
      >
        더보기
      </Button>
    </Grid>
  );
};

export default MainInfo;
