import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  color: #202020;
  align-items: center;
`;

const TextDiv = styled.div`
  font-size: ${(props) => props.size};
  font-weight: ${(props) => props.weight};
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

const ReservationCard = ({ data, hideDate, moveDetail }) => {
  const navi = useNavigate();
  const location = useLocation(); // 현재 경로 가져오기

  function movePath() {
    const isSpaceReserv = location.pathname.includes("spaceReserv");
    const detailPath = isSpaceReserv ? "spacedetail" : "staydetail";
    const basePath = location.pathname.replace(/\/$/, "");
    const finalPath = `${basePath}/${detailPath}`.replace(/([^:]\/)\/+/g, "$1");

    navi(finalPath);
  }

  return (
    <>
      <DataDiv>
        <DataArea>
          <TextDiv size="15px">{data.progressState}</TextDiv>
          <TextDiv size="25px" weight="600">
            {data.name}
          </TextDiv>
          <TextDiv size="15px">
            {data.checkIn} - {data.checkOut}
          </TextDiv>
          <TextDiv size="13px">
            {data.roomName} / 성인 {data.adult}명
          </TextDiv>
          <div></div>
          <PriceDiv>
            {!hideDate && (
              <TextDiv onClick={moveDetail} size="15px">
                예약 상세 확인
              </TextDiv>
            )}
            <TextDiv size="20px">₩{data.amount}</TextDiv>
          </PriceDiv>
        </DataArea>
        <ImgTag src={data.filePath} alt="숙소 이미지" />
      </DataDiv>
    </>
  );
};

export default ReservationCard;
