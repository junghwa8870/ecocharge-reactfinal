import React, { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent'; // SearchComponent를 임포트합니다.
import SearchResult from './SearchResult'; // SearchResult 컴포넌트를 임포트합니다.
import SearchBar from './SearchBar'; // SearchBar를 임포트합니다.
import '../../../scss/FindCharge.scss';
import '../findcharge/ChargeSpotDetail';
import { Container as MapDiv } from 'react-naver-maps';
import NaverMapApi from './NaverMapApi';
import axios from 'axios';
import { API_BASE_URL, CHARGESPOT } from '../../../config/host-config';
// import { NavermapsProvider, Container as MapDiv } from 'react-naver-maps';

function FindCharge() {
  const [searchParams, setSearchParams] = useState(null);
  const [visible, setVisible] = useState(false);
  const [{ mapLat, mapLng }, setGeometricData] = useState({
    mapLat: null,
    mapLng: null,
  });
  const navigator = window.navigator;
  const [addr, setAddr] = useState('');
  const [markerLatLng, setMarkerLatLng] = useState();
  const [timeoutId, setTimeoutId] = useState(null);
  const [zoom, setZoom] = useState(15);

  useEffect(() => {
    function getLocation() {
      if (navigator.geolocation) {
        // GPS를 지원하면
        navigator.geolocation.getCurrentPosition(
          function (position) {
            // alert(position.coords.latitude + ' ' + position.coords.longitude);
            setGeometricData({
              mapLat: position.coords.latitude,
              mapLng: position.coords.longitude,
            });
          },
          function (error) {
            console.error(error);
          },
          {
            enableHighAccuracy: false,
            maximumAge: 0,
            timeout: Infinity,
          },
        );
      } else {
        alert('GPS를 지원하지 않습니다');
      }
    }
    getLocation();
  }, []);

  useEffect(() => {
    const makersRender = async () => {
      if (timeoutId) {
        clearTimeout();
      }

      const id = setTimeout(async () => {
        if (mapLat !== null && mapLng !== null) {
          const res = await axios.get(
            API_BASE_URL +
              CHARGESPOT +
              `/marker?lat=${mapLat}&lng=${mapLng}&zoom=${zoom}`,
          );
          // console.log(res.data);

          const data = res.data;
          // console.log(data.length);
          const array = [];
          for (let index = 0; index < data.length; index++) {
            array.push({ lat: data[index].lat, lng: data[index].lng });
          }
          setMarkerLatLng(array);
        }
      }, 100);
      setTimeoutId(id);
    };
    makersRender();
  }, [mapLat, mapLng, zoom]);

  const handleSearch = (params) => {
    setMarkerLatLng();
    setSearchParams(params);
    setVisible(Object.values(params).some((value) => value !== null));
    if (
      params.searchKey !== null &&
      params.searchKey !== '' &&
      params.searchKey !== undefined
    ) {
      // console.log(params.searchKey);
      setAddr(params.searchKey);
    }
  };

  return (
    <div className='find-charge-container'>
      <header className='find-charge-header'>
        <h1>충전소 찾기</h1>
        <h5>원하시는 지역의 충전소를 검색해보세요.</h5>
      </header>
      <div className='find-charge-filters'>
        <SearchComponent onSearch={handleSearch} params={searchParams} />
      </div>
      <div className='find-charge-content'>
        <div className='search-area'>
          <SearchBar onSearch={handleSearch} params={searchParams} />
          {!visible || (
            <div className='search-results'>
              {searchParams && <SearchResult searchParams={searchParams} />}
            </div>
          )}
        </div>
        <div className='map-area'>
          <MapDiv>
            <NaverMapApi
              lat={mapLat}
              lng={mapLng}
              addr={addr}
              setGeometricData={setGeometricData}
              markerLatLng={markerLatLng}
              setZoom={setZoom}
            />
          </MapDiv>
        </div>
      </div>
    </div>
  );
}

export default FindCharge;
