import React, { useEffect, useState } from 'react';
import './MainInfo.scss';
import { Button, Grid, Typography } from '@mui/material';
import MainInfoItem from './mainInfoItem/MainInfoItem.js';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MainInfo = () => {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    const mainInfoRendering = async () => {
      const res = await axios.get('http://localhost:8181/main/news');
      setNewsList(res.data);
    };

    mainInfoRendering();
  }, []);

  return (
    <div className='main-info-container'>
      <Typography variant='h4' className='title'>
        새소식
      </Typography>
      <Grid
        container
        className='icontainer'
        style={{ width: '80%', height: '450px', marginTop: '20px' }}
      >
        {newsList.map((news) => (
          <MainInfoItem key={news.newsNo} data={news} />
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
            className='mainInfoDetailBtn'
            component={Link}
            to='/newInfo'
            variant='contained'
            style={{
              backgroundColor: '#228b22',
              // backgroundColor: 'white',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '12px 24px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s, color 0.3s, transform 0.2s',
              '&:hover': {
                backgroundColor: '#1a751d',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            더보기
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainInfo;
