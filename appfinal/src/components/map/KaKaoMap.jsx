import React, { useEffect, useState, useRef, useCallback } from "react";
import styled from "styled-components";

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MenuWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 250px;
  height: 400px;
  margin-top: 43px;
  margin-left: 0px;
  padding: 5px;
  overflow-y: auto;
  background: rgba(255, 255, 255, 0.7);
  z-index: 1;
  font-size: 12px;
  border-radius: 10px;
`;

const PlacesList = styled.ul`
  font-size: 16px;
  list-style: none;
  padding: 10px;
`;

const Pagination = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const KakaoMap = () => {
  const mapRef = useRef(null);
  const [keyword, setKeyword] = useState("여의도 맛집");
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=e27f5cee69f66bf555b7350910107a59&libraries=services`;
    script.async = true;
    script.onload = () => initializeMap();
    document.head.appendChild(script);
  }, []);

  const initializeMap = () => {
    if (!window.kakao || !window.kakao.maps) return;

    const mapContainer = mapRef.current;
    const mapOption = {
      center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const ps = new window.kakao.maps.services.Places();
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    const searchPlaces = () => {
      if (!keyword.trim()) {
        alert("키워드를 입력해주세요!");
        return;
      }

      ps.keywordSearch(keyword, (data, status, pagination) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setPlaces(data);
          displayPlaces(map, data, infowindow);
        } else {
          alert("검색 결과가 없습니다.");
        }
      });
    };

    searchPlaces();
  };

  const displayPlaces = useCallback((map, places, infowindow) => {
    let bounds = new window.kakao.maps.LatLngBounds();

    places.forEach((place) => {
      const position = new window.kakao.maps.LatLng(place.y, place.x);
      const marker = new window.kakao.maps.Marker({ position });
      marker.setMap(map);

      window.kakao.maps.event.addListener(marker, "click", () => {
        infowindow.setContent(
          `<div style="padding:5px;">${place.place_name}</div>`
        );
        infowindow.open(map, marker);
      });

      bounds.extend(position);
    });

    map.setBounds(bounds);
  }, []);

  return (
    <MapContainer>
      <div ref={mapRef} style={{ width: "1500px", height: "400px" }} />
      <MenuWrap>
        <div>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button onClick={() => initializeMap()}>검색하기</button>
        </div>
        <hr />
        <PlacesList>
          {places.map((place, index) => (
            <li key={index}>{place.place_name}</li>
          ))}
        </PlacesList>
        <Pagination id="pagination"></Pagination>
      </MenuWrap>
    </MapContainer>
  );
};

export default KakaoMap;
