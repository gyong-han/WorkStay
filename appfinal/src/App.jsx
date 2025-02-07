import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FindStay from "./pages/stay/FindStay";
import FindSpace from "./pages/space/FindSpace";
import Traffic from "./pages/traffic/Traffic";
import Slog from "./pages/slog/Slog";
import Login from "./pages/guest/Login";
import { Provider } from "react-redux";
import Store from "./redux/store";
import EnrollStay from "./pages/host/stayComponents/EnrollStay";
import EnrollSpace from "./pages/host/spaceComponents/EnrollSpace";
import AdminMenu from "./pages/admin/adminMenu/AdminMenu";
import HostMenu from "./pages/host/hostMenu/HostMenu";

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
            path="/findspace/*"
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
          <Route
            path="/enroll/stay/*"
            element={
              <Layout>
                <EnrollStay />
              </Layout>
            }
          />
          <Route
            path="/enroll/space/*"
            element={
              <Layout>
                <EnrollSpace />
              </Layout>
            }
          />
          <Route
            path="/adminMenu/*"
            element={
              <Layout>
                <AdminMenu />
              </Layout>
            }
          />
          <Route
            path="/hostMenu/*"
            element={
              <Layout>
                <HostMenu />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
