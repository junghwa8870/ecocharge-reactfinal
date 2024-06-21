import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import './CarList.scss';
import CarListItem from './carListItem/CarListItem';
import axios from 'axios';
import PageButton from '../pageButton/PageButton';
import {
  createSearchParams,
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
  const page = searchParams.get('page') || 1;
  const pageParam = createSearchParams(page).toString();

  const [pageMaker, setPageMaker] = useState({});

  const [carInfoList, setCarInfoList] = useState([]);

  const [pageButtoncount, setPageButtonCount] = useState();

  const [pageNo, setPageNo] = useState(0);

  const pageButtonClickHandler = (no) => {
    setPageNo(no);
    navigate(`/carList?page=${no}`, { search: pageParam });
  };
  const carListRendering = async () => {
    let url = `http://localhost:8181/carList?pageNo=${page}`;
    // console.log(url);
    const res = await axios.get(url);

    try {
      // console.log(res.data);
      setCarInfoList(res.data.subsidyCarList);
      setPageMaker(res.data.pageMaker);
      setPageButtonCount(res.data.pageMaker.end);
    } catch (error) {
      console.log(error);
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
        height: '2300px',
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
        style={{
          width: '90%',
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

          <PageButton
            pageMaker={pageMaker}
            buttonCount={pageButtoncount}
            clickHandler={pageButtonClickHandler}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CarList;
