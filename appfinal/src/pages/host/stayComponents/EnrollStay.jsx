import React from "react";
import FirstEnrollStay from "./FirstEnrollStay";
import { Route, Routes } from "react-router-dom";
import SecondEnrollStay from "./SecondEnrollStay";
import ThirdEnrollStay from "./ThirdEnrollStay";

const EnrollStay = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<FirstEnrollStay />}></Route>
        <Route path="second" element={<SecondEnrollStay />}></Route>
        <Route path="third/:x" element={<ThirdEnrollStay />}></Route>
      </Routes>
    </>
  );
};

export default EnrollStay;
