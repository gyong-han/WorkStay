import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  background-color: #dfdfdf;
  padding: 10px;
  font-weight: bold;
  text-align: center;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  padding: 10px;
  text-align: center;
`;

const Cell = styled.div`
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Row = styled.div`
  display: contents;
`;

const BusDetail = () => {
  const location = useLocation();
  const { tickets } = location.state || [];

  return (
    <>
      <h1>승차권 상세정보</h1>
      <Container>
        <div>버스 경로</div>
        <div>출발</div>
        <div>출발시간</div>
        <div>도착</div>
        <div>도착 시간</div>
        <div>가격</div>
      </Container>

      <MainContent>
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <Row key={index}>
              <Cell>{ticket.routeId}</Cell>
              <Cell>{ticket.depPlaceNm}</Cell>
              <Cell>{ticket.depPlandTime}</Cell>
              <Cell>{ticket.arrPlaceNm}</Cell>
              <Cell>{ticket.arrPlandTime}</Cell>
              <Cell>{ticket.charge}</Cell>
            </Row>
          ))
        ) : (
          <h1>승차권 정보가 없습니다</h1>
        )}
      </MainContent>
    </>
  );
};

export default BusDetail;
