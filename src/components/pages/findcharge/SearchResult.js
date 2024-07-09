import React from 'react';
import '../../../scss/SearchResult.scss';

function SearchResult({ searchParams }) {
  // 영어 키를 한국어로 매핑

  const keyTranslations = {
    searchKey: '검색어',
    chgerType: '커넥터',
    powerType: '충전속도',
    location: '장소',
    limitYn: '외부인개방',
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
