import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";

const TrainCalendar = () => {
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
      locale={ko}
      selectsRange={false}
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
          }}
        >
          날짜를 선택해주세요
        </Form.Control>
      }
    />
  );
};

export default TrainCalendar;
