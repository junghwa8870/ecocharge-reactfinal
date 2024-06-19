import React, { useEffect, useState } from 'react';

function MapComponent({ searchParams }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const loadNaverMap = async () => {
      try {
        const response = await fetch('/api/get-naver-map-client-id');
        if (!response.ok) {
          throw new Error('Failed to fetch Naver Maps API client ID');
        }
        const json = await response.json();
        const { ncpClientId } = json;

        const script = document.createElement('script');
        script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${ncpClientId}`;
        script.async = true;
        script.onload = () => {
          const { naver } = window;
          const mapOptions = {
            center: new naver.maps.LatLng(37.3595704, 127.105399),
            zoom: 10,
          };
          const mapInstance = new naver.maps.Map('map', mapOptions);
          setMap(mapInstance);
        };
        document.head.appendChild(script);
      } catch (error) {
        console.error('Failed to load Naver Maps API:', error);
      }
    };

    loadNaverMap();

    return () => {
      const existingScript = document.querySelector(
        `script[src^="https://openapi.map.naver.com/openapi/v3/maps.js"]`,
      );
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  useEffect(() => {
    if (!searchParams || !map) return;

    const fetchSearchResults = async () => {
      try {
        const response = await fetch(
          `/api/naver-map/search?keyword=${searchParams.keyword}`,
        );
        if (!response.ok) {
          throw new Error('Failed to fetch search results');
        }
        const data = await response.json();
        const bounds = new window.naver.maps.LatLngBounds();

        data.items.forEach((place) => {
          const markerPosition = new window.naver.maps.LatLng(
            place.mapy,
            place.mapx,
          );
          const marker = new window.naver.maps.Marker({
            position: markerPosition,
            map,
          });
          bounds.extend(markerPosition);
        });

        map.fitBounds(bounds);
      } catch (error) {
        console.error('Failed to fetch search results:', error);
      }
    };

    fetchSearchResults();
  }, [searchParams, map]);

  return (
    <div
      id='map'
      style={{ width: '100%', height: '100%', position: 'relative' }}
    />
  );
}

export default MapComponent;
