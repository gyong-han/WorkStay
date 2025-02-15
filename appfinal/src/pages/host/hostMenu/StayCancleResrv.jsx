import React, { useState } from "react";
import styled from "styled-components";
import ReservationCard from "../../../components/reservationInfo/ReservationCard";
import { useNavigate } from "react-router-dom";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: 25px;
  margin-left: ${(props) => {
    return props.left;
  }};
  color: ${(props) => {
    return props.color;
  }};
  cursor: pointer;

  &:hover {
    color: #049dd9;
  }
`;

const StayCancleResrv = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("");

  function movePath(e) {
    setSelectedMenu(e.target.id);
    navigate(`/hostMenu/${e.target.id}`);
  }

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan
            left="280px"
            id=""
            selected={selectedMenu === ""}
            onClick={movePath}
            color="#202020"
          >
            예약 내역
          </StatusSpan>
          <StatusSpan left="20px">|</StatusSpan>
          <StatusSpan
            left="20px"
            id="stayCancleReserv"
            onClick={movePath}
            selected={selectedMenu === "stayCancleReserv"}
            color="#049dd9"
          >
            취소 내역
          </StatusSpan>
        </div>
        <div>
          <ReservationCard hideDate={true} />
        </div>
      </MainDiv>
    </>
  );
};

export default StayCancleResrv;
