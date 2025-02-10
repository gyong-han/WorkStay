import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FindSpaceList from './FindSpaceList';
import FindSpaceDetail from './FindSpaceDetail';
import FindSpaceBooking from './FindSpaceBooking';
const FindSpace = () => {
  return (
    <>
    <Routes>
      <Route path='/*' element={<FindSpaceList></FindSpaceList>}></Route>
      <Route path='/detail/:x' element={<FindSpaceDetail></FindSpaceDetail>}></Route>
      <Route path='/spacebooking/:x' element={<FindSpaceBooking/>}></Route>
    </Routes>
    </>
  );
};

export default FindSpace;