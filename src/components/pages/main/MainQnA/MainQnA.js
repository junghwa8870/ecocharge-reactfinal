import React, { useEffect, useState } from 'react';
import './MainQnA.scss';
import { Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import MainQnAItem from './mainQnAItem/MainQnAItem';
import axios from 'axios';

const MainQnA = () => {
  const [qnaList, setQnaList] = useState([]);

  useEffect(() => {
    const MainQnARendering = async () => {
      const res = await axios.get('http://localhost:8181/main/qna');
      setQnaList(res.data);
    };

    MainQnARendering();
  }, []);
  return (
    <div className='main-qna-container'>
      <Typography variant='h4' className='qtitle'>
        Q & A
      </Typography>
      <Grid
        container
        className='qcontainer'
        style={{ width: '80%', height: '450px', marginTop: '20px' }}
      >
        {qnaList.map((qna) => (
          <MainQnAItem key={qna.qnaNo} data={qna} />
        ))}
        <Grid
          item
          xs={12}
          style={{
            textAlign: 'center',
            marginTop: '-30px',
            marginBottom: '-20px',
          }}
        >
          <Button
            className='qnaBtn'
            component={Link}
            to='/qna'
            variant='contained'
            style={{
              backgroundColor: 'rgb(13, 110, 253)',
              // backgroundColor: 'white',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '12px 24px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s, color 0.3s, transform 0.2s',
              // '&:hover': {
              //   backgroundColor: '#1a751d',
              //   transform: 'scale(1.05)',
              //   boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              // },
            }}
          >
            더보기
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainQnA;
