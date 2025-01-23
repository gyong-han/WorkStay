import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.main`
  flex: 1;
  padding: 10px;
  background-color: #f9f9f9;
`;

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: 1fr;
`;
const LeftBlank = styled.div`
  background: white;
`;

const RightBlank = styled.div`
  background: white;
`;

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <MainDiv>
        <LeftBlank />
        <Content>{children}</Content>
        <RightBlank />
      </MainDiv>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;
