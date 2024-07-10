import React from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import MapComponent from './MapComponent';
const NaverMapApi = ({
  lat,
  lng,
  addr,
  setGeometricData,
  markerLatLng,
  setZoom,
}) => {
  const id = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
  return (
    <NavermapsProvider ncpClientId={id} submodules={['geocoder']}>
      <MapComponent
        lat={lat}
        lng={lng}
        addr={addr}
        setGeometricData={setGeometricData}
        markerLatLng={markerLatLng}
        setZoom={setZoom}
      />
    </NavermapsProvider>
  );
};

export default NaverMapApi;
