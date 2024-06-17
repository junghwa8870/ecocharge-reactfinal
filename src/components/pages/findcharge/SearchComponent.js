import React, { useState } from 'react';
import '../../../scss/SearchComponent.scss';

function SearchComponent({ onSearch }) {
  const [filters, setFilters] = useState({
    connector: '',
    speed: '',
    fee: '',
    parkingFee: '',
    location: '',
    availability: '',
    publicAccess: '',
    wheelchairAccess: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
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
          <option value=''>전체</option>
          <option value='DC콤보'>DC콤보</option>
          <option value='AC완속'>AC완속</option>
        </select>
      </div>
      <div>
        <label>충전속도</label>
        <select name='speed' value={filters.speed} onChange={handleChange}>
          <option value=''>전체</option>
          <option value='빠름'>빠름</option>
          <option value='느림'>느림</option>
        </select>
      </div>
      <div>
        <label>충전요금</label>
        <select name='fee' value={filters.fee} onChange={handleChange}>
          <option value=''>전체</option>
          <option value='무료'>무료</option>
          <option value='유료'>유료</option>
        </select>
      </div>
      <div>
        <label>주차요금</label>
        <select
          name='parkingFee'
          value={filters.parkingFee}
          onChange={handleChange}
        >
          <option value=''>전체</option>
          <option value='무료'>무료</option>
          <option value='유료'>유료</option>
        </select>
      </div>
      <div>
        <label>장소</label>
        <select
          name='location'
          value={filters.location}
          onChange={handleChange}
        >
          <option value=''>전체</option>
          <option value='서울'>서울</option>
          <option value='부산'>부산</option>
          <option value='대구'>대구</option>
          <option value='인천'>인천</option>
          <option value='광주'>광주</option>
          <option value='대전'>대전</option>
          <option value='울산'>울산</option>
          <option value='세종'>세종</option>
        </select>
      </div>
      <div>
        <label>충전가능</label>
        <select
          name='availability'
          value={filters.availability}
          onChange={handleChange}
        >
          <option value=''>전체</option>
          <option value='가능'>가능</option>
          <option value='불가능'>불가능</option>
        </select>
      </div>
      <div>
        <label>외부인 개방</label>
        <select
          name='publicAccess'
          value={filters.publicAccess}
          onChange={handleChange}
        >
          <option value=''>전체</option>
          <option value='개방'>개방</option>
          <option value='비개방'>비개방</option>
        </select>
      </div>
      <div>
        <label>휠체어 충전소</label>
        <select
          name='wheelchairAccess'
          value={filters.wheelchairAccess}
          onChange={handleChange}
        >
          <option value=''>전체</option>
          <option value='있음'>있음</option>
          <option value='없음'>없음</option>
        </select>
      </div>
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}

export default SearchComponent;
