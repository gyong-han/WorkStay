import React from "react";
import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const ModalWrapper = styled.div`
  display: grid;
  width: 400px;
  background-color: #fff;
  border-radius: 10px;
  padding: 25px;
  grid-template-rows: auto 1fr auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 2px;
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
  color: ${(props) => props.color || "#049dd9"};
  letter-spacing: 1px;
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
  font-size: 1.1rem;
  color: #202020;
  font-weight: 500;
  padding: 20px 0;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const ConfirmButton = styled.button`
  flex: 1;
  background-color: #049dd9;
  color: #fafafa;
  font-size: 1rem;
  font-weight: 600;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const CancelButton = styled.button`
  flex: 1;
  background-color: #d9d9d9;
  color: black;
  font-size: 1rem;
  font-weight: 600;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ConfirmModal = ({
  title = "확인",
  message = "정말 진행하시겠습니까?",
  onConfirm,
  onCancel,
}) => {
  return (
    <Backdrop>
      <ModalWrapper>
        <Header>
          <Title>{title}</Title>
          <CloseButton onClick={onCancel}>
            <IoCloseSharp />
          </CloseButton>
        </Header>
        <Content>{message}</Content>
        <ButtonWrapper>
          <ConfirmButton onClick={onConfirm}>확인</ConfirmButton>
          <CancelButton onClick={onCancel}>취소</CancelButton>
        </ButtonWrapper>
      </ModalWrapper>
    </Backdrop>
  );
};

export default ConfirmModal;
