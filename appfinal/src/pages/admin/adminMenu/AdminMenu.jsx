import React from "react";
import { Route, Routes } from "react-router-dom";
import AdminLayOut from "../adminComponents/AdminLayOut";
import HostList from "./HostList";
import StayEnrollReq from "./StayEnrollReq";
import SpaceEnrollReq from "./SpaceEnrollReq";
import StayEditReq from "./StayEditReq";
import SpaceEditReq from "./SpaceEditReq";
import StayDelReq from "./StayDelReq";
import HostDetail from "../HostDetail";

const AdminMenu = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <AdminLayOut>
              <HostList />
            </AdminLayOut>
          }
        />
        <Route
          path="/stayEnrollReq/*"
          element={
            <AdminLayOut>
              <StayEnrollReq />
            </AdminLayOut>
          }
        />
        <Route
          path="/spaceEnrollReq/*"
          element={
            <AdminLayOut>
              <SpaceEnrollReq />
            </AdminLayOut>
          }
        />
        <Route
          path="/stayEditReq/*"
          element={
            <AdminLayOut>
              <StayEditReq />
            </AdminLayOut>
          }
        />
        <Route
          path="/spaceEditReq/*"
          element={
            <AdminLayOut>
              <SpaceEditReq />
            </AdminLayOut>
          }
        />
        <Route
          path="/stayDelReq/*"
          element={
            <AdminLayOut>
              <StayDelReq />
            </AdminLayOut>
          }
        />
        <Route
          path="/spaceDelReq/*"
          element={
            <AdminLayOut>
              <SpaceEditReq />
            </AdminLayOut>
          }
        />
        <Route
          path="/hostDetail/:hostNo"
          element={
            <AdminLayOut>
              <HostDetail />
            </AdminLayOut>
          }
        />
      </Routes>
    </>
  );
};

export default AdminMenu;
