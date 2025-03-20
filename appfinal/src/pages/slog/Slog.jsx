import React from "react";
import { NavLink, Routes, Route, useLocation } from "react-router-dom";
import styled from "styled-components";
import SlogWrite from "./SlogWrite";
import SlogList from "./SlogList";
import SlogDetail from "./SlogDetail";

const Container = styled.div`
  /* text-align: center; */
  h1 {
    text-align: center;
  }
`;

const NavBar = styled.nav`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 20px 0;

  a {
    font-size: 18px;
    text-decoration: none;
    color: gray;

    &.active {
      color: #049dd9;
      font-weight: bold;
    }
  }
`;

const Slog = () => {
  const location = useLocation();
  const hideNavBar = location.pathname === "/slog/write";

  return (
    <Container>
      <h1>S-LOG</h1>
      {/* {!hideNavBar && (
        <NavBar>
          <NavLink to="/slog/write">작성하기</NavLink>
          <NavLink to="/slog/list">리스트</NavLink>
        </NavBar>
      )} */}
      <Routes>
        <Route path="write" element={<SlogWrite />} />
        <Route path="" element={<SlogList />} />
        <Route path="detail/:no" element={<SlogDetail />} />
        <Route path="edit/:no" element={<SlogWrite />} />
      </Routes>
    </Container>
  );
};

export default Slog;
