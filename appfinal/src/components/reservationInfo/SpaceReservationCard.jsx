import React, { useState } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";

const DataDiv = styled.div`
  width: 850px;
  height: 300px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 400px 450px;
  margin-top: 50px;
  margin-left: 50px;
  margin-bottom: 30px;
  border: none;
`;

const DataArea = styled.div`
  background-color: transparent;
  display: grid;
  grid-template-rows: 40px 30px 20px 20px 145px 45px;
  align-items: center;
`;

const TextDiv = styled.div`
  font-size: ${(props) => {
    return props.size;
  }};
  font-weight: ${(props) => {
    return props.weight;
  }};

  cursor: pointer;
`;

const ImgTag = styled.img`
  width: 450px;
  height: 300px;
`;

const PriceDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > div:nth-child(2) {
    text-align: right;
    padding-right: 60px;
  }
`;

const SpaceReservationCard = ({ data, hideDate, moveDetail }) => {
  const navi = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  function movePath() {
    // 현재 경로가 "/hostMenu/spaceReserv"이면 공간 예약 정보로 이동
    const isSpaceReserv = location.pathname.includes("spaceReserv");

    const detailPath = isSpaceReserv ? "spacedetail" : "staydetail";

    // 현재 경로의 끝에 '/'이 붙어 있다면 제거
    const basePath = location.pathname.replace(/\/$/, "");

    // 이동할 경로 생성 후 중복된 슬래시 제거
    const finalPath = `${basePath}/${detailPath}`.replace(/([^:]\/)\/+/g, "$1");

    navi(finalPath);
  }

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <>
      <DataDiv>
        <DataArea>
          <TextDiv size="15px">{data.progressState}</TextDiv>
          <TextDiv size="25px" weight="600">
            {data.name}
          </TextDiv>
          <TextDiv size="15px">{data.useDay}</TextDiv>
          <TextDiv size="13px">
            {data.packageName}패키지 / 성인 {data.adult}명
          </TextDiv>
          <div></div>
          <PriceDiv>
            {!hideDate && (
              <TextDiv onClick={moveDetail} size="15px">
                예약 상세 확인
              </TextDiv>
            )}
            <TextDiv size="20px">₩{formatPrice(data.amount)}</TextDiv>
          </PriceDiv>
        </DataArea>
        <ImgTag src={data.filePath} />
      </DataDiv>
    </>
  );
};

export default SpaceReservationCard;
