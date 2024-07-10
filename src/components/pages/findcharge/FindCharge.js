import React, { useEffect, useState } from 'react';
import SearchComponent from './SearchComponent'; // SearchComponent를 임포트합니다.
import SearchResult from './SearchResult'; // SearchResult 컴포넌트를 임포트합니다.
import '../../../scss/FindCharge.scss';
import '../findcharge/ChargeSpotDetail';
import { Container as MapDiv } from 'react-naver-maps';
import NaverMapApi from './NaverMapApi';
import axios from 'axios';
import { API_BASE_URL, CHARGESPOT } from '../../../config/host-config';
// import { NavermapsProvider, Container as MapDiv } from 'react-naver-maps';

function FindCharge() {
  const REQUEST_URL = API_BASE_URL + CHARGESPOT;

  const [{ mapLat, mapLng }, setGeometricData] = useState({
    mapLat: null,
    mapLng: null,
  });
  const navigator = window.navigator;
  const [addr, setAddr] = useState('');
  const [markerLatLng, setMarkerLatLng] = useState();
  const [zoom, setZoom] = useState(15);
  const [searchQuery, setSearchQuery] = useState();

  const [filters, setFilters] = useState({
    searchKey: '',
    chgerType: '',
    powerType: '',
    location: '',
    limitYn: '',
  });

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
    const body = {
      limitYn: filters.limitYn,
      chgerType: filters.chgerType,
      powerType: filters.powerType,
      lat: mapLat,
      lng: mapLng,
      zoom,
    };
    const makersRender = async () => {
      if (mapLat !== null && mapLng !== null) {
        const res = await axios.post(REQUEST_URL, body);
        // console.log(res.data);

        const data = res.data;
        // console.log(data.length);
        const array = [];
        for (let index = 0; index < data.length; index++) {
          array.push({ lat: data[index].lat, lng: data[index].lng });
        }
        setMarkerLatLng(array);
      }
    };
    makersRender();
  }, [mapLat, mapLng, zoom, filters]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value); // 검색어 변경 시 상태 업데이트
  };

  return (
    <div className='find-charge-container'>
      <header className='find-charge-header'>
        <h1>충전소 찾기</h1>
        <h5>원하시는 지역의 충전소를 검색해보세요.</h5>
      </header>
      <div className='find-charge-filters'>
        <SearchComponent
          setFilters={setFilters}
          searchAddr={handleInputChange}
          searchValue={searchQuery}
          setAddr={setAddr}
        />
      </div>
      <div className='find-charge-content'>
        <div className='search-area'>
          <div className='search-results'>
            {filters && <SearchResult searchParams={filters} />}
          </div>
        </div>
        <div className='map-area'>
          <MapDiv>
            {mapLat !== null && (
              <NaverMapApi
                lat={mapLat}
                lng={mapLng}
                addr={addr}
                setGeometricData={setGeometricData}
                markerLatLng={markerLatLng}
                setZoom={setZoom}
              />
            )}
          </MapDiv>
        </div>
      </div>
    </div>
  );
}

export default FindCharge;
