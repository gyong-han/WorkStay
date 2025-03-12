import React, { useEffect, useRef } from "react";

const MapRec = ({ address, name }) => {
  const mapContainerRef = useRef(null); // 지도 컨테이너
  const roadViewContainerRef = useRef(null); // 로드뷰 컨테이너

  useEffect(() => {
    const KAKAO_MAP_API_KEY = "e6fb0b3e3e788fbc7f697bdcbede0f13";
    const scriptId = "kakao-map-script";

    if (document.getElementById(scriptId)) {
      loadMap();
      return;
    }

    const script = document.createElement("script");
    script.id = scriptId;
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_MAP_API_KEY}&libraries=services&autoload=false`;
    script.async = true;

    script.onload = () => {
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
  }, [address, name]);

  const loadMap = () => {
    if (!mapContainerRef.current || !roadViewContainerRef.current) {
      console.error("Map or RoadView container not found.");
      return;
    }

    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    const imageSrc = "https://t1.daumcdn.net/mapjsapi/images/marker.png";
    const imageSize = new window.kakao.maps.Size(50, 50);
    const imageOption = { offset: new window.kakao.maps.Point(26, 50) };

    // 지도 컨테이너 설정
    const mapContainer = mapContainerRef.current;
    const mapOptions = {
      center: new window.kakao.maps.LatLng(33.450701, 126.570667),
      level: 3,
    };
    const map = new window.kakao.maps.Map(mapContainer, mapOptions);

    // 로드뷰 컨테이너 설정
    const roadViewContainer = roadViewContainerRef.current;
    const roadview = new window.kakao.maps.Roadview(roadViewContainer);
    const roadviewClient = new window.kakao.maps.RoadviewClient();

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

        roadviewClient.getNearestPanoId(coords, 50, function (panoId) {
          if (panoId !== null) {
            roadview.setPanoId(panoId, coords);
          } else {
            console.error("해당 위치의 로드뷰를 찾을 수 없습니다.");
          }
        });

        window.kakao.maps.event.addListener(marker, "click", function () {
          roadviewClient.getNearestPanoId(coords, 50, function (panoId) {
            if (panoId !== null) {
              roadview.setPanoId(panoId, coords);
              map.setCenter(coords);
            }
          });
        });
      } else {
        console.error("주소를 찾을 수 없습니다.");
      }
    });
  };

  return (
    <div style={{ display: "flex", width: "1500px", height: "500px" }}>
      {/* 지도 */}
      <div ref={mapContainerRef} style={{ width: "50%", height: "100%" }}></div>

      {/* 로드뷰 */}
      <div
        ref={roadViewContainerRef}
        style={{ width: "50%", height: "100%" }}
      ></div>
    </div>
  );
};

export default MapRec;
