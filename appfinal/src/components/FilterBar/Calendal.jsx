import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import "./styles/datepicker.css";
import styled from "styled-components";
import { CiCalendar } from "react-icons/ci";

const LayoutDiv = styled.div`
  width: 337px;
  height: 46px;
  font-size: 25px;
  margin-left: 40px;
  display: flex;
  justify-content: start;
  border-bottom: 1px solid #d9d9d9;
  color: #049dd9;
  background-color: white;
`;

const CustomHeader = ({ date, changeMonth }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LayoutDiv>날짜를 선택해주세요</LayoutDiv>
      <button onClick={() => changeMonth(date.getMonth() - 1)}>{"<"}</button>
      <span style={{ margin: "0 10px" }}>
        {format(date, "yyyy년 MM월", { locale: ko })}
      </span>
      <button onClick={() => changeMonth(date.getMonth() + 1)}>{">"}</button>
    </div>
  );
};

const Calendar = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  useEffect(() => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      const dateDate = dateRange.map((date) => format(date, "yyyyMMdd"));
      console.log(dateDate);
    }
  }, [dateRange]);
  return (
    <DatePicker
      // showIcon
      locale={ko}
      selectsRange={true}
      startDate={startDate}
      minDate={new Date()}
      endDate={endDate}
      onChange={(update) => {
        setDateRange(update);
      }}
      monthsShown={2}
      withPortal
      customInput={
        <Form.Control
          as="button"
          style={{
            width: "166px",
            height: "50px",
            border: "none",
            backgroundColor: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          inline
        >
          <CiCalendar size={20} />
          일정
        </Form.Control>
      }
    />
  );
};

export default Calendar;
