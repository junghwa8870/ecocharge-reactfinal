import React, { useState } from 'react';
import SearchComponent from './SearchComponent';
import MapComponent from './MapComponent';
import '../../../scss/FindCharge.scss';

function FindCharge() {
  const [searchParams, setSearchParams] = useState(null);

  const handleSearch = (params) => {
    setSearchParams(params);
  };

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
          <div className='search-results'>
            {/* 검색 결과를 리스트 형태로 보여줍니다 */}
            <ul>
              <li>검색 결과 1</li>
              <li>검색 결과 2</li>
              <li>검색 결과 3</li>
              {/* 더 많은 결과 */}
            </ul>
          </div>
        </div>
        <div className='map-area'>
          <MapComponent searchParams={searchParams} />
        </div>
      </div>
    </div>
  );
}

export default FindCharge;
