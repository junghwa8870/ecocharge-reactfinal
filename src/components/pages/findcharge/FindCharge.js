import React, { useState } from 'react';
import SearchComponent from './SearchComponent'; // SearchComponent를 임포트합니다.
import SearchResult from './SearchResult'; // SearchResult 컴포넌트를 임포트합니다.
import SearchBar from './SearchBar'; // SearchBar를 임포트합니다.
import '../../../scss/FindCharge.scss';
import '../findcharge/ChargeSpotDetail';
import { Container as MapDiv } from 'react-naver-maps';
import NaverMapApi from './NaverMapApi';
// import { NavermapsProvider, Container as MapDiv } from 'react-naver-maps';

function FindCharge() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

  return (
    <div className='find-charge-container'>
      <header className='find-charge-header'>
        <h1>충전소 찾기</h1>
        <h5>원하시는 지역의 충전소를 검색해보세요.</h5>
      </header>
      <div className='find-charge-filters'>
        <SearchComponent onSearch={handleSearch} />
      </div>
      <div className='find-charge-content'>
        <div className='search-area'>
          <h5>검색결과를 확인해보세요.</h5>
          <SearchBar onSearch={handleSearch} />
          <div className='search-results-box'>
            <div className='search-results'>
              {searchParams && <SearchResult searchParams={searchParams} />}
            </div>
          </div>
        </div>
        <div className='map-area'>
          <MapDiv>
            <NaverMapApi />
          </MapDiv>
        </div>
      </div>
    </div>
  );
}

export default FindCharge;
