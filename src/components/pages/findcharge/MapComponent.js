// import React, { useEffect } from 'react';

// function MapComponent({ searchParams }) {
//   useEffect(() => {
//     // 카카오 API 로드
//     const script = document.createElement('script');
//     script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_API_KEY&libraries=services`;
//     script.async = true;
//     script.onload = () => {
//       const { kakao } = window;

//       // 지도 초기화
//       const container = document.getElementById('map');
//       const options = {
//         center: new kakao.maps.LatLng(33.450701, 126.570667),
//         level: 3,
//       };
//       const map = new kakao.maps.Map(container, options);

//       // 검색 파라미터가 있을 경우, 해당 위치로 이동
//       if (searchParams) {
//         const ps = new kakao.maps.services.Places();

//         ps.keywordSearch(searchParams.keyword, (data, status) => {
//           if (status === kakao.maps.services.Status.OK) {
//             const bounds = new kakao.maps.LatLngBounds();
//             for (let i = 0; i < data.length; i++) {
//               const place = data[i];
//               const markerPosition = new kakao.maps.LatLng(place.y, place.x);

//               const marker = new kakao.maps.Marker({
//                 position: markerPosition,
//               });

//               marker.setMap(map);
//               bounds.extend(markerPosition);
//             }
//             map.setBounds(bounds);
//           }
//         });
//       }
//     };

//     document.head.appendChild(script);

//     return () => {
//       // Cleanup the script if the component unmounts
//       document.head.removeChild(script);
//     };
//   }, [searchParams]);

//   return (
//     <div
//       id='map'
//       style={{ width: '100%', height: '100%', position: 'relative' }}
//     >
//       {/* 카카오 지도가 이 div에 표시*/}
//     </div>
//   );
// }

// export default MapComponent;

import React from 'react';

function MapComponent({ searchParams }) {
  return (
    <div
      id='map'
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      {/* 지도 표시*/}
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
