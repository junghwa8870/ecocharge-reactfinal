import React from 'react';
import './MainQnA.scss';
import { Grid, Typography, Button } from '@mui/material';

import { Link } from 'react-router-dom';

const MainQnA = () => {
  return (
    <Grid
      container
      className='container'
      style={{ width: '80%', marginTop: '50px', marginBottom: '200px' }}
    >
      <Typography flex={2} variant='h4' className='title'>
        Q & A
      </Typography>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Grid item className='box' flex={2} style={{ backgroundColor: 'pink' }}>
          <div className='qtitle'>제목테스트1</div>
          <div className='qcontent'>내용테스트1</div>
        </Grid>
        <Grid item className='box' flex={2} style={{ backgroundColor: 'pink' }}>
          <div className='qtitle'>제목테스트1</div>
          <div className='qcontent'>내용테스트1</div>
        </Grid>
        <Grid item className='box' flex={2} style={{ backgroundColor: 'pink' }}>
          <div className='qtitle'>제목테스트1</div>
          <div className='qcontent'>내용테스트1</div>
        </Grid>
        <Grid item className='box' flex={2} style={{ backgroundColor: 'pink' }}>
          <div className='qtitle'>제목테스트1</div>
          <div className='qcontent'>내용테스트1</div>
        </Grid>
      </div>
      <Button
        component={Link}
        to='/qnaInfo'
        variant='outlined'
        style={{ color: 'black' }}
      >
        더보기
      </Button>
    </Grid>
  );
};

export default MainQnA;
