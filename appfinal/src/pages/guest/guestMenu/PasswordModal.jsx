import React, { useState } from "react";
import styled from "styled-components";

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

const ModalContainer = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
`;

const Input = styled.input`
  width: 80%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  background: #049dd9;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px;
  margin-top: 10px;
  cursor: pointer;
  width: 100%;
`;

const PasswordModal = ({ onClose, onVerify }) => {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onVerify(password);
  };

  return (
    <Backdrop>
      <ModalContainer>
        <h2>비밀번호 확인</h2>
        <p>개인정보 보호를 위해 비밀번호를 입력해주세요.</p>
        <Input
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSubmit}>확인</Button>
        <Button onClick={onClose} style={{ background: "#ccc" }}>
          취소
        </Button>
      </ModalContainer>
    </Backdrop>
  );
};

export default PasswordModal;
