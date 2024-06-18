import React, { useState } from 'react';
import '../../../scss/SearchBar.scss';

function SearchBar({ onSearch }) {
  const [searchType, setSearchType] = useState('주변충전소'); // 초기 검색 타입 설정
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태 추가

  const handleButtonClick = (type) => {
    setSearchType(type); // 클릭한 버튼에 해당하는 검색 타입으로 설정
    onSearch({ 충전소: type, 검색어: searchQuery }); // onSearch 호출
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value); // 검색어 변경 시 상태 업데이트
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
      <div className='button-group'>
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
      </div>
    </div>
  );
}

export default SearchBar;
