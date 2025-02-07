import React from "react";
import styled from "styled-components";
import ReservationCard from "../../../components/reservationInfo/ReservationCard";
import ReservaionList from "../../../components/reservationInfo/ReservaionList";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: 25px;
  margin-left: ${(props) => {
    return props.left;
  }};
`;

const StayResrv = () => {
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="280px">예약 확정</StatusSpan>
          <StatusSpan left="20px"> | </StatusSpan>
          <StatusSpan left="20px">예약 취소</StatusSpan>
        </div>
        <div>
          <ReservaionList />
        </div>
      </MainDiv>
    </>
  );
};

export default StayResrv;
