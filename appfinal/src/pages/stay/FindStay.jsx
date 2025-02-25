import React from "react";
import { Route, Routes } from "react-router-dom";
import FindStayList from "./FindStayList";
import FindStayDetail from "./FindStayDetail";
import FindStayBooking from "./FindStayBooking";

const FindStay = () => {
  return (
    <>
      <Routes>
        <Route path="/*" element={<FindStayList></FindStayList>}></Route>
        <Route
          path="/detail/:x/*"
          element={<FindStayDetail></FindStayDetail>}
        ></Route>
        <Route path="/staybooking/:x" element={<FindStayBooking />}></Route>
      </Routes>
    </>
  );
};

export default FindStay;
