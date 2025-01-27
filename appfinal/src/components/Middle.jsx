import React from "react";
import styled from "styled-components";

const MiddleContainer = styled.section`
  display: grid;
  justify-items: center;
  align-items: center;
  background-color: lightgray;
  height: 20vh;
`;

const Text = styled.h2`
  font-size: 24px;
`;

const Middle = () => {
  return (
    <MiddleContainer>
      <Text>저널 인기순위 슬라이드 5개</Text>
    </MiddleContainer>
  );
};

export default Middle;
