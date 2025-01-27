import React from "react";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 1920px;
`;

const Content = styled.main`
  flex: 1;
  padding: 10px;
  background-color: #f9f9f9;
  min-height: 972px;
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
    <>
      <LayoutContainer>
        <Header />
        <MainDiv>
          <LeftBlank />
          <Content>{children}</Content>
          <RightBlank />
        </MainDiv>
      </LayoutContainer>
      <Footer />
    </>
  );
};

export default Layout;
