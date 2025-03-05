import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useFormData } from "../../utils/useFormData";
import { getPayload } from "../../utils/jwtUtil";
import { findpwd } from "../../redux/memberSlice";
import { BASE_URL } from "../../components/service/config";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr 3.5fr 0.5fr 0.5fr 0.8fr 1fr 1fr;
`;

const StyleMain = styled.div`
  color: #202020;
  font-size: 3em;
  font-weight: 700;
  display: flex;
  grid-row: 2;
  justify-content: center;
  align-items: center;
  letter-spacing: 8px; /* 글자 사이 간격을 2px 띄움 */
`;

const StyleInputId = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 3;
  justify-content: center;
  align-items: center;
`;

const StyleInputPwd = styled.div`
  display: flex;
  flex-direction: column;
  grid-row: 4;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled.input`
  border: 0;
  border-style: none;
  border-bottom: solid 1px #202020;
  border-collapse: collapse;
  background-color: #fafafa;
  color: #202020;
  width: 500px;
  height: 30px;
  outline: none;
  font-size: 1em;

  &::placeholder {
    color: #bbbbbb;
  }
`;

const ErrorMessage = styled.div`
  color: #f20530;
  font-size: 0.8em;
  margin-top: 5px;
  align-self: center;
  width: 500px;
`;

const BtnTag = styled.button`
  display: grid;
  justify-self: center;
  align-items: center;
  border: 1px solid #fafafa;
  border-radius: 5px;
  background-color: #049dd9;
  color: #fafafa;
  font-size: 1.2em;
  font-weight: 600;
  width: 500px;
  height: 60px;
  grid-row: 7;
`;

const FindPassword = () => {
  const [emails, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [numberError, setNumberError] = useState("");
  const navi = useNavigate();
  const dispatch = useDispatch();

  const initState = {
    email: "",
    phone: "",
  };

  const submitCallBack = (formData) => {
    const url = `${BASE_URL}/api/guest/findpwd`;
    const option = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(url, option)
      .then((resp) => {
        return resp.text();
      })
      .then((token) => {
        localStorage.setItem("token", token);
        const email = (token, "email");

        dispatch(findpwd({ email }));
        navi("/login/newpwd");
      });
  };

  const { formData, handleInputChange, handleSubmit } = useFormData(
    initState,
    submitCallBack
  );

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value))
      return "이메일 형식이 올바르지 않습니다.";
    return "";
  };

  const validateNumber = (value) => {
    const numberRegex = /^010\d{7,8}$/;
    if (value && !numberRegex.test(value))
      return "휴대 전화 번호 형식이 올바르지 않습니다.";
    return "";
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setNameError(validateEmail(value));
  };

  const handleNumberChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    setNumberError(validateNumber(value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <MainDiv>
        <StyleMain>FIND PASSWORD</StyleMain>

        <StyleInputId>
          <StyledInput
            type="text"
            placeholder="이메일을 입력해주세요."
            value={emails}
            name="email"
            onChange={(event) => {
              handleNameChange(event);
              handleInputChange(event);
            }}
          />
          {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
        </StyleInputId>

        <StyleInputPwd>
          <StyledInput
            type="number"
            placeholder="'-'을 제외한 휴대 전화 번호를 입력해주세요."
            value={number}
            name="phone"
            onChange={(event) => {
              handleNumberChange(event);
              handleInputChange(event);
            }}
          />
          {numberError && <ErrorMessage>{numberError}</ErrorMessage>}
        </StyleInputPwd>
        <BtnTag>비밀번호 찾기</BtnTag>
      </MainDiv>
    </form>
  );
};

export default FindPassword;
