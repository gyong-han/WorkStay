import React from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Middle from "../components/Middle";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  background-color: #f9f9f9;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Content>
        <Middle />
        <Main />
      </Content>
    </HomeContainer>
  );
};

export default Home;
