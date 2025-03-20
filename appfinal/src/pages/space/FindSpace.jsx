import React from 'react';
import { Route, Routes } from 'react-router-dom';
import FindSpaceList from './FindSpaceList';
import FindSpaceDetail from './FindSpaceDetail';
import FindSpaceBooking from './FindSpaceBooking';
import Booking from './Booking';
import SpaceReservation from './SpaceReservation';
const FindSpace = () => {
  return (
    <>
    <Routes>
      <Route path='/*' element={<FindSpaceList></FindSpaceList>}></Route>
      <Route path='/detail/:x' element={<FindSpaceDetail></FindSpaceDetail>}></Route>
      <Route path='/spacebooking/:x' element={<FindSpaceBooking/>}></Route>
      <Route path='/booking/:x' element={<Booking/>}></Route>
      <Route path='/successbooking/:x' element={<SpaceReservation/>}/>
    </Routes>
    </>
  );
};

export default FindSpace;