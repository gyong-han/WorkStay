import React from "react";
import styled from "styled-components";
import ReservationCard from "./ReservationCard";

const BlankDiv = styled.div`
  height: 200px;
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
