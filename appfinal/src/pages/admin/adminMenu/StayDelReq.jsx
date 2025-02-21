import React from "react";
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

const StayDelReq = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="300px">숙소 취소 요청 목록</StatusSpan>
        </div>
        <div>MyStayMgmt</div>
      </MainDiv>
    </>
  );
};

export default StayDelReq;
