import React, { useState } from "react";
import styled from "styled-components";
import ReservationCard from "../../../components/reservationInfo/ReservationCard";
import { useNavigate } from "react-router-dom";
import GuestResrvDetail from "../../guest/guestMenu/GuestResrvDetail";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: 25px;
  margin-left: ${(props) => {
    return props.left;
  }};

  color: ${(props) => (props.selected ? "#049dd9" : "#202020")};
  cursor: pointer;
`;

const BlankDiv = styled.div`
  height: 200px;
`;

const SpaceResrv = () => {
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="280px">예약 내역</StatusSpan>
          <StatusSpan left="20px">|</StatusSpan>
          <StatusSpan left="20px">취소 내역</StatusSpan>
        </div>
        <div>
          {/* map으로 반복 돌리기 / vo 보내기*/}
          <ReservationCard />
          <ReservationCard />
          {/* <GuestResrvDetail /> */}
        </div>
      </MainDiv>
      <BlankDiv />
    </>
  );
};

export default SpaceResrv;
