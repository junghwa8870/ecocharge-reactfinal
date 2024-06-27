import React, { useEffect, useState } from 'react';
import { Marker, NaverMap, useNavermaps } from 'react-naver-maps';

function MapComponent({ lat, lng }) {
  const navermaps = useNavermaps();

  return (
    <NaverMap defaultCenter={new navermaps.LatLng(lat, lng)} defaultZoom={15}>
      <Marker defaultPosition={new navermaps.LatLng(lat, lng)} />
    </NaverMap>
  );
}

export default MapComponent;
