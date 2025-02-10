import React from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import Btn from "./Btn";

const MainWrapper = styled.div`
  display: grid;
  width: 550px;
  height: 320px;
  border-radius: 10px;
  background-color: #ffffff;
  grid-template-rows: 0.5fr 8fr 3fr;
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.color || "#049dd9"}; /* 기본 색상 */
`;

const CloseButton = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  color: #202020;
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: #202020;
  font-weight: 500;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Alert = ({
  title = "알림",
  message = "내용",
  titleColor = "#049dd9",
  buttonText = "확인",
  buttonColor = "#049dd9",
  onClose, // 닫기 함수
}) => {
  return (
    <MainWrapper>
      <Header>
        <Title color={titleColor}>{title}</Title>
        <CloseButton onClick={onClose}>
          <IoCloseSharp />
        </CloseButton>
      </Header>

      <Content>{message}</Content>

      <ButtonWrapper>
        <Btn
          w="315px"
          h="38px"
          bg={buttonColor}
          b="none"
          onClick={onClose}
          children={buttonText}
          size="15px"
        ></Btn>
      </ButtonWrapper>
    </MainWrapper>
  );
};

export default Alert;
