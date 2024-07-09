import React from 'react';
import '../../../scss/SearchComponent.scss';

function SearchComponent({
  onSearch,
  setFilters,
  filters,
  searchAddr,
  searchValue,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((filters) => ({
      ...filters,
      [name]: value !== '선택' ? value : '',
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className='search-component'>
      <input
        id='searchKey'
        type='text'
        placeholder='검색 지역을 입력하세요.'
        value={searchValue}
        onChange={(e) => {
          searchAddr(e);
        }}
      />
      <div>
        <label>커넥터</label>
        <select
          name='chgerType'
          value={filters.chgerType}
          onChange={handleChange}
        >
          <option>선택</option>
          <option>AC3상</option>
          <option>AC완속</option>
          <option>DC콤보</option>
          <option>DC차데모</option>
        </select>
      </div>
      <div>
        <label>충전속도</label>
        <select
          name='powerType'
          value={filters.powerType}
          onChange={handleChange}
        >
          <option>선택</option>
          <option>완속</option>
          <option>급속</option>
        </select>
      </div>
      <div>
        <label>외부인 개방</label>
        <select
          name='limitYn'
          value={filters.publicAccess}
          onChange={handleChange}
        >
          <option>선택</option>
          <option>이용자제한</option>
          <option>이용가능</option>
        </select>
      </div>
      <button onClick={handleSearch}>검색</button>
    </div>
  );
}

export default SearchComponent;
