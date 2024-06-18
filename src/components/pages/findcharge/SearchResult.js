import React from 'react';
import '../../../scss/SearchResult.scss';

function SearchResult({ searchParams }) {
  // 영어 키를 한국어로 매핑
  const keyTranslations = {
    connector: '커넥터',
    speed: '충전속도',
    fee: '충전요금',
    parkingFee: '주차요금',
    location: '장소',
    availability: '충전가능',
    publicAccess: '외부인개방',
    wheelchairAccess: '휠체어 접근성',
  };

  return (
    <div>
      <h2>검색 결과</h2>
      <ul>
        {Object.entries(searchParams).map(([key, value]) => (
          <li key={key}>
            {keyTranslations[key] || key}: {value}
          </li>
        ))}
      </ul>
      {/* 실제 검색 결과를 여기에 표시 */}
    </div>
  );
}

export default SearchResult;
