import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import "./styles/datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setreservationDate } from "../../redux/spaceSlice";





const CalendarTime = ({children,type,position}) => {
  const spaceVo = useSelector((state)=>state.space);
  const [dateRange , setDateRange] = useState([]);
  const dispatch =useDispatch();

  const isBlockedDate = (date) => {
    const blockedDates = spaceVo.reservationDone?spaceVo.reservationDone.map((date) => new Date(date)):[];
    return blockedDates.some(blockedDate => 
      date.getFullYear() === blockedDate.getFullYear() &&
      date.getMonth() === blockedDate.getMonth() &&
      date.getDate() === blockedDate.getDate()
    );
  };

  
  return (
    <DatePicker
      // showIcon
      locale={ko}
      selectsRange={false}
      minDate={new Date()}
      filterDate={(date) => !isBlockedDate(date)}
      dayClassName={(date) => {
        // 막힌 날짜이면서 주말인 경우
        if (isBlockedDate(date) && (date.getDay() === 0 || date.getDay() === 6)) {
          return "blocked-weekend"; 
        }
        return ""; 
      }}
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