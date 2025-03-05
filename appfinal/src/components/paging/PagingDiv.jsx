import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  width: 1000px;
  display: grid;
  grid-template-columns: 325px 350px 325px;
`;

const PagingDiv = ({ children }) => {
  return <Layout>{children}</Layout>;
};

export default PagingDiv;
