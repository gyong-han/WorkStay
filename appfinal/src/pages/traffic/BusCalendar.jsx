import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";

const BusCalendar = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedDate !== null) {
      const formattedDate = format(selectedDate, "yyyyMMdd");
      console.log(formattedDate);
    }
  }, [selectedDate]);

  return (
    <DatePicker
      locale={ko}
      selected={selectedDate}
      minDate={new Date()}
      onChange={(date) => setSelectedDate(date)}
      monthsShown={2}
      withPortal
      customInput={
        <Form.Control
          as="button"
          style={{
            fontFamily: "Pretendard-Regular",
            width: "166px",
            height: "50px",
            border: "none",
            backgroundColor: "#FAFAFA",
            cursor: "pointer",
          }}
        >
          {selectedDate
            ? format(selectedDate, "yyyy년 MM월 dd일")
            : "날짜를 선택해주세요"}
        </Form.Control>
      }
    />
  );
};

export default BusCalendar;
