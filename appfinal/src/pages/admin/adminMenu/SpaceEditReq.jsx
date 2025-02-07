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

const SpaceEditReq = () => {
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="300px">공간 수정 요청 목록</StatusSpan>
        </div>
        <div>MyStayMgmt</div>
      </MainDiv>
    </>
  );
};

export default SpaceEditReq;
