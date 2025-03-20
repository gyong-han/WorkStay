import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100%;
`;

const Content = styled.main`
  flex: 1;
  min-height: 990px;
  background-color: #fafafa;
`;

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: 1fr;
`;

const LeftBlank = styled.div`
  background-color: #fafafa;
`;

const RightBlank = styled.div`
  background-color: #fafafa;
`;

const Layout = ({ children }) => {
  const location = useLocation();
  if (
    location.pathname === "/slog/write" ||
    location.pathname.includes("/slog/edit")
  ) {
    return <>{children}</>;
  }

  const isHome = location.pathname === "/";

  return (
    <>
      <LayoutContainer>
        <Header />
        <MainDiv>
          {!isHome && <LeftBlank />}
          <Content>{children}</Content>
          {!isHome && <RightBlank />}
        </MainDiv>
      </LayoutContainer>
      <Footer />
    </>
  );
};

export default Layout;
