import React from 'react';

function MapComponent({ searchParams }) {
  return (
    <div
      id='map'
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {/* 지도를 표시할 영역입니다. */}
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: '#f0f0f0',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '1.5rem',
          color: '#555',
        }}
      >
        지도 표시 임시로~
      </div>
    </div>
  );
}

export default MapComponent;
