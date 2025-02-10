import React from "react";
import ReservationCard from "./ReservationCard";
import styled from "styled-components";

const BlankDiv = styled.div`
  height: 300px;
`;

const ReservaionList = () => {
  return (
    <>
      {/* map으로 반복 돌리기 */}
      <ReservationCard />
      <BlankDiv />
    </>
  );
};

export default ReservaionList;
