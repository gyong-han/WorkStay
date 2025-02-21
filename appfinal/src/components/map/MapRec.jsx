import React, { useEffect, useState } from "react";

const MapRec = ({ recPlaces }) => {
  const [map, setMap] = useState(null); // 지도 객체 상태
  const [markers, setMarkers] = useState([]); // 마커 상태

  // 카카오맵 스크립트 로딩 및 지도 초기화
  useEffect(() => {
    const KAKAO_MAP_API_KEY = "e6fb0b3e3e788fbc7f697bdcbede0f13";
    const scriptId = "kakao-map-script";

    // 이미 스크립트가 로딩되어 있으면, 지도 초기화
    if (document.getElementById(scriptId)) {
      loadMap();
      return;
    }

    // 스크립트 로딩
    const script = document.createElement("script");
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
  }, []); // 맵 로딩 한번만 실행

  const loadMap = () => {
    if (!window.kakao || !window.kakao.maps) return;

    // 지도 초기화
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 기본 좌표
      level: 3,
    };
    const newMap = new window.kakao.maps.Map(container, options);
    setMap(newMap); // map 객체 상태에 저장

    // 마커 관리 상태 초기화
    setMarkers([]);
  };

  // 장소 선택 시 마커를 해당 주소로 이동시키기
  const handlePlaceClick = (address, name) => {
    if (!map) return;

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(address, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 마커 생성
        const markerImage = new window.kakao.maps.MarkerImage(
          "https://cdn-icons-png.flaticon.com/128/447/447031.png",
          new window.kakao.maps.Size(50, 50)
        );
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords,
          image: markerImage,
        });

        // 인포윈도우 생성
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="width:150px;text-align:center;padding:6px;">${name}</div>`,
        });
        infowindow.open(map, marker);

        map.setCenter(coords);
      }
    });
  };

  // 페이지 렌더링 시 첫 번째 장소의 주소로 마커를 표시
  useEffect(() => {
    if (recPlaces && recPlaces.length > 0 && map) {
      const { address, name } = recPlaces[0];
      handlePlaceClick(address, name); // 첫 번째 장소의 주소로 마커를 표시
    }
  }, [recPlaces, map]); // recPlaces와 map이 변경될 때마다 실행

  return (
    <div>
      <div id="map" style={{ width: "1500px", height: "500px" }}></div>
      <div>
        {recPlaces.map((place, index) => (
          <button
            key={index}
            onClick={() => handlePlaceClick(place.address, place.name)}
          >
            {place.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MapRec;
