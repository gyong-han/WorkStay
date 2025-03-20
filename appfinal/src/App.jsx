import "./App.css";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import FindStay from "./pages/stay/FindStay";
import FindSpace from "./pages/space/FindSpace";
import Traffic from "./pages/traffic/Traffic";
import Slog from "./pages/slog/Slog";
import { Provider } from "react-redux";
import Store from "./redux/store";
import EnrollStay from "./pages/host/stayComponents/EnrollStay";
import EnrollSpace from "./pages/host/spaceComponents/EnrollSpace";
import HostMenu from "./pages/host/hostMenu/HostMenu";
import Login from "./pages/login/Login";
import MainLogin from "./pages/login/MainLogin";
import Join from "./pages/login/Join";
import FindId from "./pages/login/FindId";
import FindPassword from "./pages/login/FindPassword";
import NewPassword from "./pages/login/NewPassword";
import AdminMenu from "./pages/admin/adminMenu/AdminMenu";
import FAQ from "./pages/faq/FAQ";

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
            path="/findstay/*"
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
            path="/slog/*"
            element={
              <Layout>
                <Slog />
              </Layout>
            }
          />
          <Route
            path="/login/*"
            element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="email" element={<MainLogin />} />
                  <Route path="join" element={<Join />} />
                  <Route path="findid" element={<FindId />} />
                  <Route path="findpwd" element={<FindPassword />} />
                  <Route path="newpwd" element={<NewPassword />} />
                </Routes>
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
            path="/hostMenu/*"
            element={
              <Layout>
                <HostMenu />
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
            path="/faq/*"
            element={
              <Layout>
                <FAQ />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
