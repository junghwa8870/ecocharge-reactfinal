import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import './CarList.scss';
import CarListItem from './carListItem/CarListItem';
import axios from 'axios';
import PageButton from '../pageButton/PageButton';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const CarList = () => {
  const [searchText, setSearchText] = useState(''); // 검색어 상태 추가

  // 버튼 동작 확인용
  const handleDetailClick = () => {
    window.location.href = 'https://www.naver.com';
  };

  const handleSearchClick = () => {
    const searchInput = document.querySelector('.search');
    const searchText = searchInput.value.trim();

    if (!searchText) {
      alert(`차량의 이름이 입력되지 않았습니다.`);
    } else {
      // 검색어가 있을 경우에만 검색 기능을 실행하도록 추가 로직을 구현할 수 있습니다.
      // alert(`검색어: ${searchText}`);
      // const url = `http://localhost:8181/searchCars?keyword=${encodeURIComponent(searchText)}`;
      // axios
      //   .get(url)
      //   .then((response) => {
      //     // 서버에서 받은 데이터를 상태에 설정하거나 처리하는 로직
      //   })
      //   .catch((error) => {
      //     console.error('검색 요청 실패:', error);
      //   });
    }
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
  const filteredCarInfoList = carInfoList.filter((carInfo) =>
    carInfo.carName.includes(searchText),
  );

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
        style={{
          marginTop: '20px',
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
            onKeyPress={handleSearchInputKeyPress} // 엔터키 입력 핸들러 연결
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
          {filteredCarInfoList.map((carInfo) => (
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
