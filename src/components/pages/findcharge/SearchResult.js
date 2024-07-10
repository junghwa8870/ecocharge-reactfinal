import React from 'react';
import '../../../scss/SearchResult.scss';

function SearchResult({ searchParams, markerInfo }) {
  // 영어 키를 한국어로 매핑

  const keyTranslations = {
    searchKey: '검색어',
    chgerType: '커넥터',
    powerType: '충전속도',
    limitYn: '외부인개방',
  };

  return (
    <>
      <div className='search-result'>
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
      </div>
      {/* 실제 검색 결과를 여기에 표시 */}
      {markerInfo && (
        <div className='search-result'>
          <h2>선택된 마커 정보</h2>
          <ul>
            <li>주소: {markerInfo.addr}</li>
            <li>선택된 마커의 경도: {markerInfo.lng}</li>
          </ul>
        </div>
      )}
    </>
  );
}

export default SearchResult;
