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
  font-family: "Pretendard-Regular";

  & > h4 {
    color: gray;
    font-weight: 300;
    text-align: start;
  }
`;

const CardDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;

  .title {
    font-size: 20px;
    color: #202020;
    font-weight: 500;
  }

  .name {
    font-size: 15px;
    color: #202020;
    margin-top: 20px;
    font-weight: 200;
  }

  .tagline {
    font-size: 15px;
    color: gray;
  }

  .nick {
    margin-top: 50px;
    font-size: 15px;
    color: gray;
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
      <CardDetail>
        <div className="name">
          {vo.name} / {vo.address}
        </div>
        <div className="title">{vo.title}</div>
        <div className="tagline">{vo.tagline}</div>
        <div className="nick">by. {vo.nick}</div>
      </CardDetail>
    </Container>
  );
};

export default SlogCard;
