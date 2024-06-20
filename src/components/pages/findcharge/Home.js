import React, { useState } from 'react';
import NaverMapApi from './NaverMapApi';
import { NavermapsProvider } from 'react-naver-maps';

const Home = () => {
  const { naver } = window;

  const [address, setAddress] = useState('');
  const [roadAddress, setRoadAddress] = useState(null);

  const [lat, setLat] = useState(37.54);
  const [lng, setLng] = useState(126.99);
  const [zoom, setZoom] = useState(12);

  const handleChange = (e) => {
    const { address, value } = e.target;
    const newAddress = { address: value };
    setAddress(newAddress);
  };

  function searchAddressToCoordinate(address) {
    naver.maps.Service.geocode(
      {
        query: address,
      },
      function (status, response) {
        if (status !== naver.maps.Service.Status.OK) return alert('문제 발생');

        const result = response.v2;
        const items = result.addresses;

        let x = parseFloat(items[0].x);
        let y = parseFloat(items[0].y);

        setLat(y);
        setLng(x);
        setZoom(15);
        setRoadAddress(items[0].roadAddress);
      },
    );
  }

  return (
    <>
      <NavermapsProvider
        ncpClientId={process.env.REACT_APP_NAVER_MAP_CLIENT_ID}
      >
        <div className='map-loader'>
          <div className='map' style={{ width: '30%', height: '30%' }}>
            <NaverMapApi
              zoom={zoom}
              Latitude={lat}
              Longtitude={lng}
              roadAddress={roadAddress}
            />
          </div>
          <div className='search-container'>
            <form>
              <input
                className='findAddress'
                placeholder='주소로 검색'
                onChange={handleChange}
              />
              <button className='submitAddress-button' type='sumbit'></button>
            </form>
          </div>
        </div>
      </NavermapsProvider>
    </>
  );
};

export default Home;
