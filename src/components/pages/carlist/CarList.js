import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import './CarList.scss';
import CarListItem from './carListItem/CarListItem';
import axios from 'axios';
import PageButton from '../pageButton/PageButton';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const CarList = () => {
  // 버튼 동작 확인용
  const handleDetailClick = () => {
    window.location.href = 'https://www.naver.com';
  };

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page')) || 1;
  const search = searchParams.get('search') || '';

  const [pageMaker, setPageMaker] = useState({});
  const [carInfoList, setCarInfoList] = useState([]);
  const [pageButtonCount, setPageButtonCount] = useState(0);
  const [pageNo, setPageNo] = useState(page);
  const location = useLocation();
  const [searchText, setSearchText] = useState(search); // 검색어 상태 추가

  const pageButtonClickHandler = (no) => {
    console.log(location.state);
    console.log(search);
    setPageNo(no);
    if (location.pathname && pageNo !== no) {
      if (search === '') {
        navigate(`/carList?page=${no}`, {
          state: { page: no, search },
        });
      } else {
        navigate(`/carList?page=${no}&search=${search}`, {
          state: { page: no, search },
        });
      }
    }
  };

  const handleSearchClick = () => {
    const searchInput = document.querySelector('.search');
    setSearchText(searchInput.value.trim());
    console.log(searchText.trim());
    setPageNo(1);
    navigate(`/carList?page=1&search=${searchText.trim()}`, {
      state: { page, search: searchText.trim() },
    });
  };

  useEffect(() => {
    const handleBackButton = (event) => {
      console.log(event.state.usr);
      if (event.state.usr !== null) {
        setPageNo(event.state.usr);
      }
    };

    window.addEventListener('popstate', handleBackButton);
    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, []);

  const carListRendering = async () => {
    const url = `http://localhost:8181/carList?pageNo=${pageNo}&search=${search}`;
    const res = await axios.get(url);
    try {
      setCarInfoList(res.data.subsidyCarList);
      setPageMaker(res.data.pageMaker);
      setPageButtonCount(res.data.pageMaker.end);
      console.log(res.data.pageMaker.end);
      console.log(res.data.pageMaker.finalPage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    carListRendering();
  }, [location.state]);

  // 검색어 입력 핸들러
  const handleSearchInputChange = (event) => {
    setSearchText(event.target.value);
  };

  // 검색어 입력 후 엔터키 핸들러
  const handleSearchInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchClick();
    }
  };

  // 실제 검색 로직 구현 부분
  // const filteredCarInfoList = carInfoList.filter((carInfo) =>
  //   carInfo.carName.includes(searchText),
  // );

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
      <Grid className='carContainerHead'>
        <Typography variant='h1' className='ecoCarTitle'>
          구매보조금 지원 차종
        </Typography>
        <Typography variant='h5' className='ecoCarTcomment'>
          보조금을 활용하여 경제적으로 차량을 구입하세요.
        </Typography>
      </Grid>

      <Grid
        item
        className='carbox'
        style={{
          // marginTop: '20px',
          marginBottom: '100px',
        }}
      >
        <div className='searchBox'>
          <input
            type='text'
            placeholder='차량을 검색하세요.'
            className='search'
            value={searchText}
            onChange={handleSearchInputChange} // 검색어 입력 핸들러 연결
            onKeyUpCapture={handleSearchInputKeyPress} // 엔터키 입력 핸들러 연결
          />
          <Button
            className='searchBtn'
            variant='contained'
            onClick={handleSearchClick}
          >
            검색
          </Button>
        </div>
        <Grid container className='carInfoBox'>
          {carInfoList.map((carInfo) => (
            <CarListItem key={carInfo.id} info={carInfo} />
          ))}

          <PageButton
            pageMaker={pageMaker}
            buttonCount={pageButtonCount}
            clickHandler={pageButtonClickHandler}
            page={pageNo}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default CarList;
