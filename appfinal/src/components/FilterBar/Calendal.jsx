import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import { format } from "date-fns";
import { useDispatch } from "react-redux";
import { setStayReservationDate } from "../../redux/roomSlice";

const Calendar = ({ children, type, w, position }) => {
  const [dateRange, setLocalDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const dispatch = useDispatch();

  useEffect(() => {
    if (dateRange[0] !== null && dateRange[1] !== null) {
      const formattedDates = dateRange.map((date) =>
        format(date, "yyyy-MM-dd")
      );
      console.log(formattedDates);
      dispatch(setStayReservationDate(formattedDates));
    }
  }, [dateRange]);

  return (
    <DatePicker
      locale={ko}
      selectsRange={true}
      startDate={startDate}
      minDate={new Date()}
      endDate={endDate}
      onChange={(update) => {
        setLocalDateRange(update);
      }}
      monthsShown={2}
      withPortal
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
