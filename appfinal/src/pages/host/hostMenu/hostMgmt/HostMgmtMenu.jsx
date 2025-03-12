import React from "react";
import { Route, Routes } from "react-router-dom";
import HostLayout from "../../hostComponents/HostLayout";
import StayReservMgmt from "./StayReservMgmt";
import SpaceReservMgmt from "./SpaceReservMgmt";
import StayApprovalMgmt from "./StayApprovalMgmt";
import SpaceApprovalMgmt from "./SpaceApprovalMgmt";
import MyStayMgmt from "./MyStayMgmt";
import MySpaceMgmt from "./MySpaceMgmt";
import StayResrvMgmtDetail from "./StayResrvMgmtDetail";
import SpaceResrvMgmtDetail from "./SpaceReservMgmtDetail";
import MySpaceDetail from "./MySpaceDetail";
import MyStayDetail from "./MyStayDetail";
import MyRoomDetail from "./MyRoomDetail";

const HostMgmtMenu = () => {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <HostLayout>
              <StayReservMgmt />
            </HostLayout>
          }
        />
        <Route
          path="/spaceReservMgmt/*"
          element={
            <HostLayout>
              <SpaceReservMgmt />
            </HostLayout>
          }
        />
        <Route
          path="/stayApprovalMgmt/*"
          element={
            <HostLayout>
              <StayApprovalMgmt />
            </HostLayout>
          }
        />
        <Route
          path="/spaceApprovalMgmt/*"
          element={
            <HostLayout>
              <SpaceApprovalMgmt />
            </HostLayout>
          }
        />
        <Route
          path="/myStayMgmt/*"
          element={
            <HostLayout>
              <MyStayMgmt />
            </HostLayout>
          }
        />
        <Route
          path="/mySpaceMgmt/*"
          element={
            <HostLayout>
              <MySpaceMgmt />
            </HostLayout>
          }
        />

        <Route
          path="stayReserv/detail/:stayReservNum"
          element={
            <HostLayout>
              <StayResrvMgmtDetail />
            </HostLayout>
          }
        />
        <Route
          path="spaceReserv/detail/:spaceReservNum"
          element={
            <HostLayout>
              <SpaceResrvMgmtDetail />
            </HostLayout>
          }
        />
        <Route
          path="mySpaceMgmt/mySpaceDetail/:spaceNum"
          element={<MySpaceDetail />}
        />
        <Route
          path="myStayMgmt/myStayDetail/:stayNum"
          element={<MyStayDetail />}
        />
        <Route
          path="myStayMgmt/myRoomDetail/:stayNum"
          element={<MyRoomDetail />}
        />
      </Routes>
    </>
  );
};

export default HostMgmtMenu;
