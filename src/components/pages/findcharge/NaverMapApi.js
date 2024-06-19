import React from 'react';
import { NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps';

const NaverMapApi = (props) => {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_API_Client_ID}
      submodules={['geocoder']}
    >
      <NaverMap
        mapDivId={'maps-getting-started-uncontrolled'}
        style={{ width: '30%', height: '30%' }}
        center={{ lat: props.Latitude, lng: props.Longtitude }}
      ></NaverMap>
    </RenderAfterNavermapsLoaded>
  );
};

export default NaverMapApi;
