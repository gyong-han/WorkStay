import React from "react";
import { Route, Routes } from "react-router-dom";
import HostMainLayout from "../hostComponents/HostMainLayout";
import HostMgmtMenu from "./hostMgmt/HostMgmtMenu";
import StayResrv from "./StayResrv";

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
              <h1>공간 예약 정보 태그</h1>
            </HostMainLayout>
          }
        />
        <Route
          path="/editHost/*"
          element={
            <HostMainLayout>
              <h1>회원 정보 수정 태그</h1>
            </HostMainLayout>
          }
        />
        <Route
          path="/slogMgmt/*"
          element={
            <HostMainLayout>
              <h1>slog관리 태그</h1>
            </HostMainLayout>
          }
        />
        <Route
          path="/bookmark/*"
          element={
            <HostMainLayout>
              <h1>북마크 태그</h1>
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
