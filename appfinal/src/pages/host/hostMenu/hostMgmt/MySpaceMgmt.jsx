import React from "react";
import styled from "styled-components";
import HostApprovalCard from "../../hostComponents/HostApprovalCard";

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

const MySpaceMgmt = () => {
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="330px">내 공간 목록</StatusSpan>
        </div>
        <HostApprovalCard />
        <HostApprovalCard />
      </MainDiv>
    </>
  );
};

export default MySpaceMgmt;
