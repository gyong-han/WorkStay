import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  margin-top: 50px;
`;

const BusPage = () => {
  return (
    <Container>
      <h1>Bus Page</h1>
      <p>출발역과 도착역을 선택해주세요.</p>
    </Container>
  );
};

export default BusPage;
