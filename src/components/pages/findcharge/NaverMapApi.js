import React from 'react';
import { Marker, NaverMap, RenderAfterNavermapsLoaded } from 'react-naver-maps';

const NaverMapApi = (props) => {
  return (
    <NaverMap
      mapDivId={'maps-getting-started-uncontrolled'}
      style={{ width: '30%', height: '30%' }}
      center={{ lat: props.Latitude, lng: props.Longtitude }}
      defaultZoom={12}
      zoom={props.zoom}
      minZoom={12}
      enableWheelZoom={false}
    >
      {props.zoom === 15 && (
        <Marker
          position={{ lat: props.Latitude, lng: props.Longtitude }}
          title={props.roadAddress}
          clickable={true}
        />
      )}
    </NaverMap>
  );
};

export default NaverMapApi;
