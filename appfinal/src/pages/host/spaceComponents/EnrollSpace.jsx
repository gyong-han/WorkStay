import React from "react";
import { Route, Routes } from "react-router-dom";
import FirstEnrollSpace from "./FirstEnrollSpace";
import SecondEnrollSpace from "./SecondEnrollSpace";

const EnrollSpace = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<FirstEnrollSpace />}></Route>
        <Route path="second" element={<SecondEnrollSpace />}></Route>
      </Routes>
    </>
  );
};

export default EnrollSpace;
