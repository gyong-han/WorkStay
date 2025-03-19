import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";

const TrainCalendar = ({ onSelectDate }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (selectedDate !== null) {
      const formattedDate = format(selectedDate, "yyMMdd");
      if (onSelectDate) {
        onSelectDate(formattedDate); // 부모 컴포넌트에 날짜 값을 전달
      }
    }
  }, [selectedDate, onSelectDate]);

  return (
    <DatePicker
      locale={ko}
      selected={selectedDate}
      minDate={new Date()}
      onChange={(date) => setSelectedDate(date)} // 날짜 선택 시 상태 업데이트
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
            ? format(selectedDate, "yyyy년 MM월 dd일") // 선택된 날짜 출력
            : "날짜를 선택해주세요"}
        </Form.Control>
      }
    />
  );
};

export default TrainCalendar;
