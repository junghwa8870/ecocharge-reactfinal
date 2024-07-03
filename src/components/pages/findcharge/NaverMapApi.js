import React from 'react';
import { NaverMapContext, NavermapsProvider } from 'react-naver-maps';
import MapComponent from './MapComponent';
const NaverMapApi = ({ lat, lng, addr, setGeometricData }) => {
  const id = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
  console.log(id);
  return (
    <NavermapsProvider ncpClientId={id} submodules={['geocoder']}>
      <MapComponent
        lat={lat}
        lng={lng}
        addr={addr}
        setGeometricData={setGeometricData}
      />
    </NavermapsProvider>
  );
};

export default NaverMapApi;
