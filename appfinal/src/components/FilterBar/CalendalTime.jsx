import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import "./styles/datepicker.css";
import { useDispatch } from "react-redux";
import { setreservationDate } from "../../redux/spaceSlice";





const CalendarTime = ({children,type,position}) => {
  
  const [dateRange , setDateRange] = useState([]);
  const dispatch =useDispatch();

  // const isBlockedDate = (date) => {
  //   const blockedDates = [
  //     new Date("2025-02-20"),  // 막을 날짜
  //   ];
  //   return blockedDates.some(blockedDate => 
  //     date.getFullYear() === blockedDate.getFullYear() &&
  //     date.getMonth() === blockedDate.getMonth() &&
  //     date.getDate() === blockedDate.getDate()
  //   );
  // };

  
  return (
    <DatePicker
      // showIcon
      locale={ko}
      selectsRange={false}
      minDate={new Date()}
      // filterDate={(date) => !isBlockedDate(date)}
      onChange={(update) => {
        
        
        const selectDate = format(update, "yyyyMMdd");
        setDateRange(selectDate);
        const selectDateShow = format(update, "yyyy-MM-dd");
        dispatch(setreservationDate(selectDateShow));
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
            justifyContent: position?"start":"center",
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