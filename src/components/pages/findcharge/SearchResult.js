import React from 'react';

function SearchResult({ searchParams }) {
  // 여기에 searchParams를 기반으로 검색 결과를 표시하는 로직을 추가
  return (
    <div>
      <h2>검색 결과</h2>
      <p>검색 조건:</p>
      <ul>
        {Object.entries(searchParams).map(([key, value]) => (
          <li key={key}>
            {key}: {value}
          </li>
        ))}
      </ul>
      {/* 실제 검색 결과를 여기에 표시 */}
    </div>
  );
}

export default SearchResult;
