import React from "react";
import { NavLink, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import TrainPage from "../traffic/Train";
import BusPage from "./Bus";
import BusDetail from "./BusDetail";
import TrainDetail from "./TrainDetail";

const Container = styled.div`
  text-align: center;
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

const Traffic = () => {
  return (
    <Container>
      <h1>Traffic</h1>
      <NavBar>
        <NavLink
          to="/traffic"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Train
        </NavLink>
        <NavLink
          to="/traffic/bus"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Bus
        </NavLink>
      </NavBar>
      <Routes>
        <Route path="/" element={<TrainPage />} />
        <Route path="bus" element={<BusPage />} />
        <Route path="bus/detail" element={<BusDetail />} />
        <Route path="train/detail" element={<TrainDetail />} />
      </Routes>
    </Container>
  );
};

export default Traffic;
