import React, { useEffect, useRef, useState } from "react";

const MapRec = ({ address, name }) => {
  const mapContainerRef = useRef(null); // map container를 참조할 ref
  const [isMapLoaded, setIsMapLoaded] = useState(false); // 지도 로딩 여부 상태

  useEffect(() => {
    const KAKAO_MAP_API_KEY = "e6fb0b3e3e788fbc7f697bdcbede0f13"; // 실제 API 키 사용
    const scriptId = "kakao-map-script";

    // 이미 스크립트가 로드되었는지 확인
    if (document.getElementById(scriptId)) {
      loadMap();
      return;
    }

    // Kakao Map API 스크립트 로드
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
      // 카카오맵 API 로드 완료 시
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          loadMap();
        });
      } else {
        console.error("Kakao Maps API가 로드되지 않았습니다.");
      }
    };

    script.onerror = () => {
      console.error("Kakao Maps API 로딩 중 오류 발생");
    };

    document.head.appendChild(script);

    return () => {
      document.getElementById(scriptId)?.remove();
    };
  }, [address, name]); // 주소와 이름이 변경될 때마다 useEffect 재실행

  const loadMap = () => {
    // mapContainerRef.current가 존재할 때만 지도 로드
    if (!mapContainerRef.current) {
      console.error("Map container not found.");
      return;
    }

    // Kakao Maps API가 로드되었는지 확인
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    const imageSrc = "https://cdn-icons-png.flaticon.com/128/447/447031.png";
    const imageSize = new window.kakao.maps.Size(50, 50); // 마커 이미지 크기
    const imageOption = { offset: new window.kakao.maps.Point(26, 50) }; // 마커 위치 조정

    const container = mapContainerRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(container, options);

    const geocoder = new window.kakao.maps.services.Geocoder();
    geocoder.addressSearch(`${address}`, function (result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
        const markerImage = new window.kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imageOption
        );

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
      } else {
        console.error("주소를 찾을 수 없습니다.");
      }
    });
  };

  return (
    <div>
      <div
        ref={mapContainerRef}
        style={{ width: "1500px", height: "500px" }}
      ></div>
    </div>
  );
};

export default MapRec;
