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

const MyStayMgmt = () => {
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="330px">내 숙소 목록</StatusSpan>
        </div>
        <div>MyStayMgmt</div>
      </MainDiv>
    </>
  );
};

export default MyStayMgmt;
