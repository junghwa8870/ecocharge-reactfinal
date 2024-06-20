import React, { useState } from 'react';
import SearchComponent from './SearchComponent'; // SearchComponent를 임포트합니다.
import SearchResult from './SearchResult'; // SearchResult 컴포넌트를 임포트합니다.
import MapComponent from './MapComponent';
import SearchBar from './SearchBar'; // SearchBar를 임포트합니다.
import '../../../scss/FindCharge.scss';
import '../findcharge/ChargeSpotDetail';
// import { NavermapsProvider, Container as MapDiv } from 'react-naver-maps';

function FindCharge() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };
  const clientId = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;

  return (
    <div className='find-charge-container'>
      <header className='find-charge-header'>
        <h1>충전소 찾기</h1>
      </header>
      <div className='find-charge-filters'>
        <SearchComponent onSearch={handleSearch} />
      </div>
      <div className='find-charge-content'>
        <div className='search-area'>
          <SearchBar onSearch={handleSearch} />
          <div className='search-results'>
            {searchParams && <SearchResult searchParams={searchParams} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindCharge;
