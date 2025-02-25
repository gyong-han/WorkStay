import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import "../../../components/FilterBar/styles/datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { setStayReservationDate } from "../../../redux/roomSlice";

const CalendarDate = ({ children, type, position }) => {
  const stayVo = useSelector((state) => state.stay);
  const [dateRange, setDateRange] = useState([]);
  const dispatch = useDispatch();

  const isBlockedDate = (date) => {
    const blockedDates = stayVo.reservationDone.map((date) => new Date(date));
    return blockedDates.some(
      (blockedDate) =>
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
      onChange={(update) => {
        const selectDate = format(update, "yyyyMMdd");
        setDateRange(selectDate);
        const selectDateShow = format(update, "yyyy-MM-dd");
        dispatch(setStayReservationDate(selectDateShow));
      }}
      monthsShown={2}
      withPortal
      customInput={
        <Form.Control
          as={type}
          style={{
            width: "300px",
            height: "50px",
            border: "none",
            backgroundColor: "#F9F9F9",
            display: "flex",
            justifyContent: position ? "start" : "center",
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

export default CalendarDate;
