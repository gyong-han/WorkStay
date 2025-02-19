import React, { useEffect } from "react";
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
      </Routes>
    </>
  );
};

export default HostMgmtMenu;
