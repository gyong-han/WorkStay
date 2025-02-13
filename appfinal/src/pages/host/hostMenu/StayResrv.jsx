import React from "react";
import styled from "styled-components";
import ReservationCard from "../../../components/reservationInfo/ReservationCard";

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
`;

const StayResrv = () => {
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="280px" color="#049DD9">
            예약 내역
          </StatusSpan>
          <StatusSpan left="20px" color="#202020">
            |
          </StatusSpan>
          <StatusSpan left="20px" color="#202020">
            취소 내역
          </StatusSpan>
        </div>
        <div>
          <ReservationCard />
          <ReservationCard />
        </div>
      </MainDiv>
    </>
  );
};

export default StayResrv;
