import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const NavMenu = styled.nav`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  text-align: center;
  font-weight: bold;
  background: lightgray;
  padding: 10px;
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
  text-align: center;
`;

const Row = styled.div`
  display: contents;
`;

const Cell = styled.div`
  padding: 10px;
`;

const TrainDetail = () => {
  const location = useLocation();
  const { tickets } = location.state || [];

  return (
    <>
      <NavMenu>
        <div>열차번호</div>
        <div>출발역</div>
        <div>출발시간</div>
        <div>도착역</div>
        <div>도착시간</div>
      </NavMenu>
      <MainContent>
        {tickets.length > 0 ? (
          tickets.map((ticket, index) => (
            <Row key={index}>
              <Cell>{ticket.trnNo}</Cell>
              <Cell>{ticket.dptreStnNm}</Cell>
              <Cell>{ticket.trnPlanDptreDt}</Cell>
              <Cell>{ticket.arvlStnNm}</Cell>
              <Cell>{ticket.trnPlanArvlDt}</Cell>
            </Row>
          ))
        ) : (
          <h1>승차권 정보가 없습니다</h1>
        )}
      </MainContent>
    </>
  );
};

export default TrainDetail;
