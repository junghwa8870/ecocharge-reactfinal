import React, { useState } from 'react';
import '../../../scss/SearchBar.scss';
import Checkout from '../toss/Checkout';

function SearchBar({ onSearch, params }) {
  const [searchType, setSearchType] = useState('주변충전소'); // 초기 검색 타입 설정
  const [searchQuery, setSearchQuery] = useState(); // 검색어 상태 추가

  const [filters, setFilters] = useState({
    searchKey: null,
    connector: null,
    speed: null,
    free: null,
    parkingFree: null,
    location: null,
    availability: null,
    publicAccess: null,
    wheelchairAccess: null,
  });

  // const handleButtonClick = (type) => {
  //   setSearchType(type); // 클릭한 버튼에 해당하는 검색 타입으로 설정
  //   onSearch(filters, true); // onSearch 호출
  // };

  const handleInputChange = (e) => {
    console.log(params);
    const value = e.target.value;
    const vlaues = { ...params, searchKey: value };
    setFilters(vlaues);
    setSearchQuery(value); // 검색어 변경 시 상태 업데이트
  };

  return (
    <div className='search-bar'>
      {/* 검색창 */}
      <input
        type='text'
        placeholder='검색 지역을 입력하세요.'
        value={searchQuery}
        onChange={handleInputChange}
      />

      {/* 버튼 그룹 */}
      {/* <div className='button-group'>
        <button
          onClick={() => handleButtonClick('주변충전소')}
          className={searchType === '주변충전소' ? 'active' : ''}
        >
          주변 충전소
        </button>
        <button
          onClick={() => handleButtonClick('지역충전소')}
          className={searchType === '지역충전소' ? 'active' : ''}
        >
          지역 충전소
        </button>
      </div> */}
    </div>
  );
}

export default SearchBar;
