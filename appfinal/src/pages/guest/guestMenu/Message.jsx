import React from "react";
import styled from "styled-components";

const MainWrapper = styled.div`
  width: 800px;
  display: grid;
  justify-content: center;
`;

const MainSpanDiv = styled.div`
  font-weight: 700;
  font-size: 25px;
  color: #202020;
  display: flex;
  justify-content: center;
`;

const LayoutDiv = styled.div`
  width: 800px;
  height: 1000px;
  border: 1px solid red;
  margin-bottom: 100px;
`;

const Message = () => {
  return (
    <>
      <MainWrapper>
        <MainSpanDiv>메세지</MainSpanDiv>
      </MainWrapper>
      <LayoutDiv></LayoutDiv>
    </>
  );
};

export default Message;
