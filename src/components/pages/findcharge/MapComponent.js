import React, { useEffect } from 'react';

function MapComponent({ searchParams }) {
  useEffect(() => {
    // 네이버 지도 API 로딩 및 설정
    const { naver } = window;
    if (!naver) return;

    const mapOptions = {
      center: new naver.maps.LatLng(37.3595704, 127.105399),
      zoom: 10,
    };
    const map = new naver.maps.Map('map', mapOptions);

    // 검색 파라미터에 따른 지도 업데이트
    if (searchParams) {
      // API 호출 및 검색 결과 반영
      // 예: fetch(`/api/charge-stations?connector=${searchParams.connector}`)
      // 검색 결과에 따른 마커 표시 등의 로직 추가
    }
  }, [searchParams]);

  return <div id='map' style={{ width: '100%', height: '100%' }}></div>;
}

export default MapComponent;
