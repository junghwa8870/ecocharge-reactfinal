import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import './CarList.scss';
import { Badge } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand } from '@fortawesome/free-solid-svg-icons';

const CarList = () => {
  // 버튼 동작 확인용
  const handleDetailClick = () => {
    window.location.href = 'https://www.naver.com';
  };

  const handleSearchClick = () => {
    alert('검색버튼 클릭 확인용');
  };

  const handleCarInfoBoxClick = () => {
    window.location.href = 'https://www.kia.com';
  };

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
        <div className='carInfoBox' onClick={handleCarInfoBoxClick}>
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className='carInfo'
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant='h6' className='carName'>
                자동차이름
              </Typography>
              <Badge
                color='dark'
                pill
                style={{ width: '100px', margin: '0 10px' }}
              >
                KIA
              </Badge>
              <div className='imageContainer'>
                <img src='carA.png' alt='CarA' style={{ width: '100%' }} />
              </div>
              <Typography variant='body2' className='carStat'>
                자동차설명1
              </Typography>
              <Typography variant='body2' className='carStat'>
                자동차설명2
              </Typography>
              <Typography variant='body2' className='carStat'>
                자동차설명3
              </Typography>
              <Typography variant='body2' className='carStat'>
                자동차설명4
              </Typography>
              <div style={{ marginTop: 'auto', marginLeft: 'auto' }}>
                <FontAwesomeIcon icon={faExpand} className='expandIcon' />
              </div>
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default CarList;
