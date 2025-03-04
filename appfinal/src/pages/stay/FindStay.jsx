import React from "react";
import { Route, Routes } from "react-router-dom";
import FindStayList from "./FindStayList";
import FindStayDetail from "./FindStayDetail";
import FindStayBooking from "./FindStayBooking";
import BookingStay from "./BookingStay";
import Reservations from "./Reservations";

const FindStay = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<FindStayList></FindStayList>}></Route>
        <Route
          path="/detail/:x/*"
          element={<FindStayDetail></FindStayDetail>}
        ></Route>
        <Route path="/staybooking/:x/*" element={<FindStayBooking />}></Route>
        <Route path="/reservation/:x/*" element={<BookingStay />} />
        <Route path="/successBooking/:x/*" element={<Reservations />} />
      </Routes>
    </>
  );
};

export default FindStay;
