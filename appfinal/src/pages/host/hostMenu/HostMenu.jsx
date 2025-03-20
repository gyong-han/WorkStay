import React from "react";
import { Route, Routes } from "react-router-dom";
import HostMainLayout from "../hostComponents/HostMainLayout";
import HostMgmtMenu from "./hostMgmt/HostMgmtMenu";
import StayResrv from "./StayResrv";
import SpaceResrv from "./SpaceResrv";
import GuestEdit from "../../guest/guestMenu/GuestEdit";
import SlogMgmt from "../../guest/guestMenu/SlogMgmt";
import Bookmark from "../../guest/guestMenu/Bookmark";
import Message from "../../guest/guestMenu/Message";
import StayCancle from "../../guest/guestMenu/StayCancle";
import SpaceDetail from "../../guest/guestMenu/SpaceDetail";
import StayDetail from "../../guest/guestMenu/StayDetail";
import SpaceCancle from "../../guest/guestMenu/SpaceCancle";
import SpaceCancleResrv from "./SpaceCancleResrv";
import StayCancleResrv from "./StayCancleResrv";
import Chatbot from "../../guest/guestMenu/Chatbot";

const HostMenu = () => {
  return (
    <>
      <Routes>
        <Route
          path="*"
          element={
            <HostMainLayout>
              <StayResrv />
            </HostMainLayout>
          }
        />
        <Route
          path="stayCancleReserv"
          element={
            <HostMainLayout>
              <StayCancleResrv />
            </HostMainLayout>
          }
        />
        <Route
          path="spaceCancleReserv"
          element={
            <HostMainLayout>
              <SpaceCancleResrv />
            </HostMainLayout>
          }
        />
        <Route
          path="/spaceReserv/*"
          element={
            <HostMainLayout>
              <SpaceResrv />
            </HostMainLayout>
          }
        />
        <Route
          path="/editHost/*"
          element={
            <HostMainLayout>
              <GuestEdit />
            </HostMainLayout>
          }
        />
        <Route
          path="/slogMgmt/*"
          element={
            <HostMainLayout>
              <SlogMgmt />
            </HostMainLayout>
          }
        />
        <Route
          path="/bookmark/*"
          element={
            <HostMainLayout>
              <Bookmark />
            </HostMainLayout>
          }
        />
        {/* <Route
          path="/message/*"
          element={
            <HostMainLayout> */}
        {/* <Message /> */}
        {/* <Chatbot />
            </HostMainLayout>
          }
        /> */}
        <Route
          path="/spaceReserv/spacedetail/*"
          element={
            <HostMainLayout>
              <SpaceDetail />
            </HostMainLayout>
          }
        />
        <Route
          path="/spaceReserv/spacedetail/spacecancle"
          element={
            <HostMainLayout>
              <SpaceCancle />
            </HostMainLayout>
          }
        />
        <Route
          path="staydetail/*"
          element={
            <HostMainLayout>
              <StayDetail />
            </HostMainLayout>
          }
        />
        <Route
          path="/staydetail/staycancle"
          element={
            <HostMainLayout>
              <StayCancle />
            </HostMainLayout>
          }
        />
        <Route path="/hostMgmtMenu/*" element={<HostMgmtMenu />} />
      </Routes>
    </>
  );
};

export default HostMenu;
