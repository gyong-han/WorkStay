import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import InformationUse from "./InformationUse";
import ReservationGuide from "./ReservationGuide";
import RefundPolicy from "./RefundPolicy";

const Container = styled.div`
  max-width: 1500px;
  width: 100%;
  height: 700px;
  background-color: #202020;
  color: #fafafa;
  padding: 50px;
  margin: 50px auto;
  box-sizing: border-box;
`;

const NotiWrapper = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 8fr;
  grid-template-rows: 30px 200px;
`;

const GuideWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  place-items: center;
`;

const NotiBtnWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 10px;
  text-align: center;
`;

const TextDiv = styled.div`
  display: flex;
  align-items: center;
`;

const SubTitle = styled.div`
  color: #bbbbbb;
  margin-top: 50px;
  &:hover {
    color: #fafafa;
    cursor: pointer;
  }
  &:active {
    color: #fafafa;
  }
`;

const Notification = ({ x, rooms, stay }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <NotiWrapper>
        <Title>안내사항</Title>
        <TextDiv>숙소 이용에 대한 상세한 안내를 확인해 보세요.</TextDiv>
        <GuideWrapper>
          <SubTitle
            onClick={() => {
              location.pathname.includes("detail")
                ? navigate(`/findstay/detail/${x}/reservation-guide`)
                : navigate(`/findstay/staybooking/${x}/reservation-guide`);
            }}
          >
            예약 안내
          </SubTitle>
          <SubTitle
            onClick={() => {
              location.pathname.includes("detail")
                ? navigate(`/findstay/detail/${x}/information-use`)
                : navigate(`/findstay/staybooking/${x}/information-use`);
            }}
          >
            이용 안내
          </SubTitle>
          <SubTitle
            onClick={() => {
              location.pathname.includes("detail")
                ? navigate(`/findstay/detail/${x}/refund-policy`)
                : navigate(`/findstay/staybooking/${x}/refund-policy`);
            }}
          >
            환불 규정
          </SubTitle>
        </GuideWrapper>
        <NotiBtnWrapper>
          <Routes>
            <Route
              path={`information-use`}
              element={<InformationUse rooms={rooms} />}
            />
            <Route
              path={`reservation-guide`}
              element={<ReservationGuide rooms={rooms} stay={stay} />}
            />
            <Route
              path={`refund-policy`}
              element={<RefundPolicy rooms={rooms} />}
            />
          </Routes>
        </NotiBtnWrapper>
      </NotiWrapper>
    </Container>
  );
};

export default Notification;
