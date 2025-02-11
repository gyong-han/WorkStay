import React from "react";
import { Route, Routes } from "react-router-dom";
import HostMainLayout from "../hostComponents/HostMainLayout";
import HostMgmtMenu from "./hostMgmt/HostMgmtMenu";
import StayResrv from "./StayResrv";
import SpaceResrv from "./SpaceResrv";
import GuestEdit from "../../guest/guestMenu/GuestEdit";
import SlogMgmt from "../../guest/guestMenu/SlogMgmt";
import Bookmark from "../../guest/guestMenu/Bookmark";

const HostMenu = () => {
  return (
    <>
      <Routes>
        <Route
          path=""
          element={
            <HostMainLayout>
              <StayResrv />
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
        <Route
          path="/message/*"
          element={
            <HostMainLayout>
              <h1>메세지 태그</h1>
            </HostMainLayout>
          }
        />
        <Route path="/hostMgmtMenu/*" element={<HostMgmtMenu />} />
      </Routes>
    </>
  );
};

export default HostMenu;
