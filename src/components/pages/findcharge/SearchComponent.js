import React, { useState } from 'react';
import '../../../scss/SearchComponent.scss';

function SearchComponent({ onSearch, params }) {
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

  const handleChange = (e) => {
    if (params !== null) {
      setFilters(params);
    }
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value !== '전체' ? value : null,
    }));
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <div className='search-component'>
      <div>
        <label>커넥터</label>
        <select
          name='connector'
          value={filters.connector}
          onChange={handleChange}
        >
          <option>전체</option>
          <option>DC콤보</option>
          <option>AC완속</option>
        </select>
      </div>
      <div>
        <label>충전속도</label>
        <select name='speed' value={filters.speed} onChange={handleChange}>
          <option>전체</option>
          <option>빠름</option>
          <option>느림</option>
        </select>
      </div>
      <div>
        <label>충전요금</label>
        <select name='free' value={filters.free} onChange={handleChange}>
          <option>전체</option>
          <option>무료</option>
          <option>유료</option>
        </select>
      </div>
      <div>
        <label>주차요금</label>
        <select
          name='parkingFree'
          value={filters.parkingFree}
          onChange={handleChange}
        >
          <option>전체</option>
          <option>무료</option>
          <option>유료</option>
        </select>
      </div>
      <div>
        <label>장소</label>
        <select
          name='location'
          value={filters.location}
          onChange={handleChange}
        >
          <option>전체</option>
          <option>서울</option>
          <option>부산</option>
          <option>대구</option>
          <option>인천</option>
          <option>광주</option>
          <option>대전</option>
          <option>울산</option>
          <option>세종</option>
        </select>
      </div>
      <div>
        <label>충전가능</label>
        <select
          name='availability'
          value={filters.availability}
          onChange={handleChange}
        >
          <option>전체</option>
          <option>가능</option>
          <option>불가능</option>
        </select>
      </div>
      <div>
        <label>외부인 개방</label>
        <select
          name='publicAccess'
          value={filters.publicAccess}
          onChange={handleChange}
        >
          <option>전체</option>
          <option>개방</option>
          <option>비개방</option>
        </select>
      </div>
      <div>
        <label>휠체어 충전소</label>
        <select
          name='wheelchairAccess'
          value={filters.wheelchairAccess}
          onChange={handleChange}
        >
          <option>전체</option>
          <option>있음</option>
          <option>없음</option>
        </select>
      </div>
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}

export default SearchComponent;
