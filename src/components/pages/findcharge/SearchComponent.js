import React, { useState } from 'react';
import '../../../scss/SearchComponent.scss';

function SearchComponent({ setFilters, searchAddr, searchValue, setAddr }) {
  const [values, setValues] = useState({
    searchKey: '',
    chgerType: '',
    powerType: '',
    limitYn: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((values) => ({
      ...values,
      [name]: value !== '선택' ? value : '',
    }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setFilters(values);
    setAddr(values.searchKey);
    setValues({ ...values, searchKey: '' });
  };

  return (
    <div className='search-component'>
      <input
        id='searchKey'
        name='searchKey'
        type='text'
        placeholder='검색 지역을 입력하세요.'
        value={values.searchKey}
        onChange={handleChange}
      />
      <div>
        <label>커넥터</label>
        <select
          name='chgerType'
          value={values.chgerType}
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
          value={values.powerType}
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
          value={values.publicAccess}
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
