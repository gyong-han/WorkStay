import React, { useState } from "react";
import styled from "styled-components";
// import Calendar from "./Calendal";
import Area from "./Area";
import People from "./People";
import { CiLocationOn } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import CalendarTime from "./CalendalTime";
import Calendar from "./Calendal";

const LayoutDiv = styled.div`
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 600px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;

  & > div > button {
    width: 166px;
    height: 60px;
    border: none;
  }
`;
const BtnDiv = styled.div`
  width: 600px;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;
  border: 1px solid #049dd9;
  border-radius: 10px;
  color: #202020;
  background-color: #f9f9f9;

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div > button {
    width: 85%;
    height: 100%;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f9f9f9;
  }
  & > div:nth-child(2) {
    display: flex;
    border-left: 1px solid #049dd9;
    border-right: 1px solid #049dd9;
  }
  & > div > button > img {
    width: 25px;
    height: 25px;
  }
`;

const Display = ({ isTimeMode, reservationDone }) => {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  const openModal1 = () => setIsModal1Open(true);
  const closeModal1 = () => setIsModal1Open(false);

  const openModal2 = () => setIsModal2Open(true);
  const closeModal2 = () => setIsModal2Open(false);

  return (
    <>
      <LayoutDiv>
        <div></div>
        <BtnDiv>
          <div>
            <button onClick={openModal1}>
              <CiLocationOn size={20} />
              장소
            </button>
            <Area isOpen={isModal1Open} onClose={closeModal1} />
          </div>
          <div>
            {isTimeMode ? (
              <CalendarTime type="button" setSelectDate={() => {}}>
                <CiCalendar size={20} /> 일정
              </CalendarTime>
            ) : (
              <Calendar
                w="170px"
                type="button"
                reservationDone={reservationDone}
              >
                <CiCalendar size={20} /> 일정
              </Calendar>
            )}
          </div>

          <div>
            <button onClick={openModal2}>
              <FaRegUser size={15} />
              인원
            </button>
            <People isOpen={isModal2Open} onClose={closeModal2} />
          </div>
        </BtnDiv>
        <div></div>
      </LayoutDiv>
    </>
  );
};

export default Display;
