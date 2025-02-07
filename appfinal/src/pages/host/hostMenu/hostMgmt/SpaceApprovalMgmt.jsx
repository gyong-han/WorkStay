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
const SpaceApprovalMgmt = () => {
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="280px">승인 대기</StatusSpan>
          <StatusSpan left="20px"> | </StatusSpan>
          <StatusSpan left="20px">승인 반려</StatusSpan>
        </div>
        <div>SpaceApprovalMgmt</div>
      </MainDiv>
    </>
  );
};

export default SpaceApprovalMgmt;
