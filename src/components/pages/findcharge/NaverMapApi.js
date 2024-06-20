import React from 'react';
import { NavermapsProvider } from 'react-naver-maps';
import MapComponent from './MapComponent';
const NaverMapApi = (props) => {
  const id = process.env.REACT_APP_NAVER_MAP_CLIENT_ID;
  console.log(id);
  return (
    <NavermapsProvider ncpClientId={id} submodules={['geocoder']}>
      <MapComponent />
    </NavermapsProvider>
  );
};

export default NaverMapApi;
