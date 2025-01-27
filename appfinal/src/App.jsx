import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FindStay from "./pages/FindStay";
import FindSpace from "./pages/FindSpace";
import Traffic from "./pages/Traffic";
import Slog from "./pages/Slog";
import Login from "./pages/Login";

function App() {
  return (
    <Provider store={Store}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/findstay"
            element={
              <Layout>
                <FindStay />
              </Layout>
            }
          />
          <Route
            path="/findspace"
            element={
              <Layout>
                <FindSpace />
              </Layout>
            }
          />
          <Route
            path="/traffic/*"
            element={
              <Layout>
                <Traffic />
              </Layout>
            }
          />
          <Route
            path="/slog"
            element={
              <Layout>
                <Slog />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/*"
            element={<h1>잘못된 경로입니다, 404 NOT FOUND</h1>}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
