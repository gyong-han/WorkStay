import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 20px;
  background-color: #f1f1f1;
  border-top: 1px solid #ccc;
  /* position: absolute; */
  width: 100%;
`;

const Text = styled.div`
  font-size: 14px;
  color: black;
  line-height: 2;
`;

const Logos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 10px;

  img {
    width: 24px;
    height: 24px;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Text>
        고객센터: 10:00 ~ 18:00 / 주말 및 공휴일 제외
        <br />
        서울특별시 강남구 테헤란로 100 | 사업자 등록번호: 123-45-67890
        <br />
        COPYRIGHT © WORK STAY ALL RIGHTS RESERVED.
      </Text>
      <Logos>
        🏚 🧳 ❤
        {/* <img src="logo1.jpg" alt="로고1" />
        <img src="logo2.jpg" alt="로고2" />
        <img src="logo3.jpg" alt="로고3" /> */}
      </Logos>
    </FooterContainer>
  );
};

export default Footer;
