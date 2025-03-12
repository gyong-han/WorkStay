import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { setStayReservationDate } from "../../redux/roomSlice";

const Calendar = ({ children, type, w, position, reservationDone }) => {
  const [dateRange, setLocalDateRange] = useState([null, null]);
  const [checkIn, checkOut] = dateRange;
  const dispatch = useDispatch();
  const roomVo = useSelector((state) => state.room);

  useEffect(() => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      const formattedDates = dateRange.map((date) =>
        format(date, "yyyy-MM-dd")
      );
      // console.log(formattedDates);
      dispatch(setStayReservationDate(formattedDates));
    }
  }, [dateRange]);

  return (
    <DatePicker
      locale={ko}
      selectsRange={true}
      startDate={checkIn}
      minDate={new Date()}
      endDate={checkOut}
      onChange={(update) => {
        setLocalDateRange(update);
      }}
      monthsShown={2}
      withPortal
      filterDate={(date) => {
        const formattedDate = format(date, "yyyy-MM-dd"); // date-fns 사용
        return !reservationDone.includes(formattedDate);
      }}
      customInput={
        <Form.Control
          as={type}
          style={{
            width: w || "500px",
            height: "50px",
            border: "none",
            backgroundColor: "#F9F9F9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            justifyContent: position ? "start" : "center",
          }}
          inline
        >
          {children}
        </Form.Control>
      }
    />
  );
};

export default Calendar;
