import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  padding: 15px;
  width: 400px;
  height: 600px;
  flex-direction: column;
  color: #333;
  text-align: start;

  & > h4 {
    color: gray;
    font-weight: 300;
    text-align: start;
  }
`;

const SlogCard = ({ vo }) => {
  const firstImage = vo.titleFileUrl;
  return (
    <Container>
      <img
        no={vo.no}
        width={"400px"}
        height={"350px"}
        src={firstImage}
        // alt={vo.title}
      />
      <h2>{vo.title}</h2>
      <h3>{vo.name}</h3>
      <h4>{vo.tagline}</h4>
      <h5>by.{vo.nick}</h5>
    </Container>
  );
};

export default SlogCard;
