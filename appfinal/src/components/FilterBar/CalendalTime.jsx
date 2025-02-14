import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import "./styles/datepicker.css";





const CalendarTime = ({children,type,setSelectDate}) => {
  
  const [dateRange, setDateRange] = useState("");

  useEffect(() => {
    console.log(dateRange);
  }, [dateRange]);

  
  return (
    <DatePicker
      // showIcon
      locale={ko}
      selectsRange={false}
      minDate={new Date()}
      onChange={(update) => {
        
        const selectDate = format(update, "yyyyMMdd");
        setDateRange(selectDate);
        const selectDateShow = format(update, "yyyy-MM-dd");
        setSelectDate(selectDateShow);
      }}


      monthsShown={2}
      withPortal
      customInput={
        <Form.Control
          as={type}
          style={{
            width: "166px",
            height: "50px",
            border: "none",
            backgroundColor: "#F9F9F9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          inline
        >
          {children}
        </Form.Control>
      }
    />
  );
};

export default CalendarTime;