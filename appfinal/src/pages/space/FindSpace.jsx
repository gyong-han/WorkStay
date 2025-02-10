import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FindSpaceList from './FindSpaceList';
import FindSpaceDetail from './FindSpaceDetail';
import FIndSpaceBooking from './FIndSpaceBooking';
const FindSpace = () => {
  return (
    <>
    <Routes>
      <Route path='/*' element={<FindSpaceList></FindSpaceList>}></Route>
      <Route path='/detail/:x' element={<FindSpaceDetail></FindSpaceDetail>}></Route>
      <Route path='/spacebooking/:x' element={<FIndSpaceBooking/>}></Route>
    </Routes>
    </>
  );
};

export default FindSpace;