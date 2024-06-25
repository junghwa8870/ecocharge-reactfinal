import React from 'react';
import '../../../scss/SearchResult.scss';

function SearchResult({ searchParams }) {
  // 영어 키를 한국어로 매핑

  const keyTranslations = {
    searchKey: '검색어',
    connector: '커넥터',
    speed: '충전속도',
    free: '충전요금',
    parkingFree: '주차요금',
    location: '장소',
    availability: '충전가능',
    publicAccess: '외부인개방',
    wheelchairAccess: '휠체어 접근성',
  };

  return (
    <div>
      <h2>검색 결과</h2>
      <ul>
        {Object.entries(searchParams).map(
          ([key, value]) =>
            value !== null && (
              <li key={key}>
                {keyTranslations[key] || key}: {value}
              </li>
            ),
        )}
      </ul>
      {/* 실제 검색 결과를 여기에 표시 */}
    </div>
  );
}

export default SearchResult;
