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
  const [visible, setVisible] = useState(false);

  const handleSearch = (params) => {
    setSearchParams(params);
    setVisible(Object.values(params).some((value) => value !== null));
  };

  return (
    <div className='find-charge-container'>
      <header className='find-charge-header'>
        <h1>충전소 찾기</h1>
      </header>
      <div className='find-charge-filters'>
        <SearchComponent onSearch={handleSearch} params={searchParams} />
      </div>
      <div className='find-charge-content'>
        <div className='search-area'>
          <SearchBar onSearch={handleSearch} params={searchParams} />
          {!visible || (
            <div className='search-results'>
              {searchParams && <SearchResult searchParams={searchParams} />}
            </div>
          )}
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
