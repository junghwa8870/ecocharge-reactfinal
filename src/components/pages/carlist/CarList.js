import React from 'react';
import { Button, Grid, Typography } from '@mui/material';
import './CarList.scss';
import { orange } from '@mui/material/colors';

const CarList = () => {
  // 버튼 동작 확인용
  const handleDetailClick = () => {
    window.location.href = 'https://www.naver.com';
  };

  const handleSearchClick = () => {
    alert('검색버튼 클릭 확인용');
  };

  return (
    <Grid
      container
      className='carContainer'
      style={{
        width: '80%',
        height: '1700px',
        backgroundColor: 'pink',
        display: 'flex',
        flexDirection: 'column', // Flexbox direction을 column으로 설정
        alignItems: 'center', // 수평 가운데 정렬
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
          backgroundColor: 'purple',
          width: '90%', // 가로 전체 길이 차지
          flex: 1, // flex-grow를 사용하여 남은 공간 채우기
          marginTop: '20px', // 상단 여백 추가
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
            color='primary'
            onClick={handleSearchClick}
          >
            검색
          </Button>
        </div>
        <div className='carInfoBox'>
          {[...Array(9)].map((_, index) => (
            <div
              key={index}
              className='carInfo'
              style={{
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant='h6'>자동차이름</Typography>
              <Typography variant='body1'>자동차브랜드</Typography>
              <div className='imageContainer'>
                <img src='carA.png' alt='CarA' style={{ width: '100%' }} />
              </div>
              <Typography variant='body2' style={{ backgroundColor: 'orange' }}>
                자동차설명
              </Typography>
              <div style={{ marginTop: 'auto', marginLeft: 'auto' }}>
                <Button
                  className='moreBtn'
                  variant='contained'
                  color='primary'
                  onClick={handleDetailClick}
                >
                  상세보기
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Grid>
    </Grid>
  );
};

export default CarList;
