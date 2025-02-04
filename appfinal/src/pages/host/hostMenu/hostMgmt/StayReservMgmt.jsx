import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: 20px;
  margin-left: ${(props) => {
    return props.left;
  }};
`;
const StayReservMgmt = () => {
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="280px">예약 확정</StatusSpan>
          <StatusSpan left="20px"> | </StatusSpan>
          <StatusSpan left="20px">예약 취소</StatusSpan>
        </div>
        <div>StayReservMgmt</div>
      </MainDiv>
    </>
  );
};

export default StayReservMgmt;
