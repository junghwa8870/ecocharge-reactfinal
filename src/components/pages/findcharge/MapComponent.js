import React, { useEffect, useState } from 'react';
import { Marker, NaverMap, useNavermaps } from 'react-naver-maps';

function MapComponent({ lat, lng, addr, setGeometricData, markerLatLng }) {
  const navermaps = useNavermaps();
  useEffect(() => {
    if (addr !== null && addr !== '') {
      navermaps.Service.geocode(
        {
          address: addr,
        },
        function (status, response) {
          if (status !== navermaps.Service.Status.OK) {
            console.log('error');
            return alert('Something wrong!');
          }
          console.log('응답 = ', response);
          const result = response.result;
          console.log('결과 = ', result); // Container of the search result
          const items = result.items; // Array of the search result
          console.log('아이템 = ', items);
          // do Something
          console.log(
            '위도 = ',
            items[0].point.y,
            ' 경도 = ',
            items[0].point.x,
          );
          setGeometricData({
            mapLat: items[0].point.y,
            mapLng: items[0].point.x,
          });
        },
      );
    }
  }, [addr]);

  return (
    <NaverMap center={new navermaps.LatLng(lat, lng)} defaultZoom={15}>
      {markerLatLng &&
        markerLatLng.map((marker) => {
          return (
            <Marker position={new navermaps.LatLng(marker.lat, marker.lng)} />
          );
        })}
    </NaverMap>
  );
}

export default MapComponent;
