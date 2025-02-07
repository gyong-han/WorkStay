import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

const StayReservMgmt = () => {
  const navigate = useNavigate();

  const resrvDetail = () => {
    navigate("/hostMenu/hostMgmtMenu/detail/1");
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="280px">예약 확정</StatusSpan>
          <StatusSpan left="20px"> | </StatusSpan>
          <StatusSpan left="20px">예약 취소</StatusSpan>
        </div>
        <div>StayReservMgmt</div>
        <button onClick={resrvDetail}>상세조회</button>
      </MainDiv>
    </>
  );
};

export default StayReservMgmt;
