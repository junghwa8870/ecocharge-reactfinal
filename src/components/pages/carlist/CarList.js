import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import './CarList.scss';
import CarListItem from './carListItem/CarListItem';
import axios from 'axios';

const CarList = () => {
  // 버튼 동작 확인용
  const handleDetailClick = () => {
    window.location.href = 'https://www.naver.com';
  };

  const handleSearchClick = () => {
    alert('검색버튼 클릭 확인용');
  };

  const [carInfoList, setCarInfoList] = useState([]);

  useEffect(() => {
    const carListRendering = async () => {
      const res = await axios.get('http://localhost:8181/carList');

      try {
        // console.log(res.data);
        setCarInfoList(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    carListRendering();
  }, []);

  return (
    <Grid
      container
      className='carContainer'
      style={{
        width: '80%',
        height: '1700px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '200px auto',
      }}
    >
      <Typography variant='h1' className='ecoCarTitle'>
        구매보조금 지원 차종
      </Typography>

      <Grid
        item
        className='carbox'
        style={{
          width: '90%',
          flex: 1,
          marginTop: '20px',
          marginBottom: '100px',
        }}
      >
        <div className='searchBox'>
          <input
            type='text'
            placeholder='차량을 검색하세요.'
            className='search'
          />
          <Button
            className='searchBtn'
            variant='contained'
            // color='primary'
            onClick={handleSearchClick}
          >
            검색
          </Button>
        </div>
        <Grid
          container
          className='carInfoBox'
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '50px',
          }}
        >
          {carInfoList.map((carInfo) => (
            <CarListItem key={carInfo.id} info={carInfo} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CarList;
