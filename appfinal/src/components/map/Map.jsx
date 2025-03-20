

import React, { useEffect } from 'react';

const Map = ({address,name}) => {
  
  
  useEffect(() => {
    
    const KAKAO_MAP_API_KEY = 'e6fb0b3e3e788fbc7f697bdcbede0f13&autoload=false';
    const scriptId = 'kakao-map-script';

    if (document.getElementById(scriptId)) {
      loadMap();
      return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          loadMap();
        });
      }
    };

    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  },[address],[name]);

  const loadMap = () => {
    if (!window.kakao || !window.kakao.maps) return;
    const imageSrc = 'https://cdn-icons-png.flaticon.com/128/447/447031.png';
    const imageSize = new window.kakao.maps.Size(50, 50); // 마커 이미지 크기
    const imageOption = { offset: new window.kakao.maps.Point(26, 50) }; // 마커 위치 조정

    const container = document.getElementById('map');
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(`${address}`, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);

        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
          image: markerImage,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px;">${name}</div>`,
        });
        infowindow.open(map, marker);

        map.setCenter(coords);
      }
    });
  };

  return <div id="map" style={{ width: '1500px', height: '500px' }}></div>;
};

export default Map;


// 