import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SpaceReservationCard from "../../../components/reservationInfo/SpaceReservationCard";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: 25px;
  margin-left: ${(props) => {
    return props.left;
  }};

  color: ${(props) => {
    return props.color;
  }};
  cursor: pointer;

  &:hover {
    color: #049dd9;
  }
`;

const BlankDiv = styled.div`
  height: 200px;
`;

const SpaceCancleResrv = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("");

  function movePath(e) {
    setSelectedMenu(e.target.id);
    navigate(`/hostMenu/${e.target.id}`);
  }

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan
            left="280px"
            id="spaceReserv"
            onClick={movePath}
            selected={selectedMenu === "spaceReserv"}
            color="#202020"
          >
            예약 내역
          </StatusSpan>
          <StatusSpan left="20px">|</StatusSpan>
          <StatusSpan
            left="20px"
            id="spaceCancleReserv"
            onClick={movePath}
            selected={selectedMenu === "spaceCancleReserv"}
            color="#049dd9"
          >
            취소 내역
          </StatusSpan>
        </div>
        <div>
          {/* map으로 반복 돌리기 / vo 보내기*/}
          <SpaceReservationCard hideDate={true} />
          {/* <GuestResrvDetail /> */}
        </div>
      </MainDiv>
      <BlankDiv />
    </>
  );
};

export default SpaceCancleResrv;
