import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import './CarList.scss';
import CarListItem from './carListItem/CarListItem';
import axios from 'axios';
import PageButton from '../pageButton/PageButton';
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom';

const CarList = () => {
  // 버튼 동작 확인용
  const handleDetailClick = () => {
    window.location.href = 'https://www.naver.com';
  };

  const handleSearchClick = () => {
    alert('검색버튼 클릭 확인용');
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;

  const [pageMaker, setPageMaker] = useState({});
  const [carInfoList, setCarInfoList] = useState([]);
  const [pageButtonCount, setPageButtonCount] = useState(0);
  const [pageNo, setPageNo] = useState(page);
  const location = useLocation();

  const pageButtonClickHandler = (no) => {
    setPageNo(no);
    if (location.pathname && pageNo !== no) {
      navigate(`/carList?page=${no}`, { state: no });
    }
  };

  useEffect(() => {
    const handleBackButton = (event) => {
      setPageNo(event.state);
    };

    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  const carListRendering = async () => {
    const url = `http://localhost:8181/carList?pageNo=${pageNo}`;
    const res = await axios.get(url);

    try {
      setCarInfoList(res.data.subsidyCarList);
      setPageMaker(res.data.pageMaker);
      setPageButtonCount(res.data.pageMaker.end);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carListRendering();
  }, [pageNo]);

  return (
    <Grid
      container
      className='carContainer'
      style={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Typography variant='h1' className='ecoCarTitle'>
        구매보조금 지원 차종
      </Typography>

      <Grid
        item
        className='carbox'
        style={{ width: '90%', marginTop: '20px', marginBottom: '100px' }}
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

          <Grid className='carListPageButtonBox'>
            <PageButton
              pageMaker={{ ...pageMaker, page: { pageNo } }}
              buttonCount={pageButtonCount}
              clickHandler={pageButtonClickHandler}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CarList;
