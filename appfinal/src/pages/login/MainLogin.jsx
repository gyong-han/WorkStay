import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormData } from "../../utils/useFormData";
import { getPayload } from "../../utils/jwtUtil";
import { login } from "../../redux/memberSlice";

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

const BtnDiv = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-row: 8;
  grid-template-columns: 2fr 4fr 0.2fr 4fr 2fr;
`;

const BtnTagID = styled(Link)`
  display: grid;
  justify-content: right;
  align-items: center;
  grid-column: 2;
  border: 0;
  color: #202020;
  font-weight: 600;
  font-size: 0.9em;
  background-color: #fafafa;
  text-decoration-line: none;
`;
const BtnTagPwD = styled(Link)`
  display: grid;
  justify-content: left;
  align-items: center;
  grid-column: 4;
  border: 0;
  color: #202020;
  font-weight: 600;
  font-size: 0.9em;
  background-color: #fafafa;
  text-decoration-line: none;
`;

const Ptag = styled.p`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-column: 3;
  color: #202020;
  font-weight: 600;
`;

const MainLogin = () => {
  const [emails, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navi = useNavigate();
  const dispatch = useDispatch();

  const initState = {
    email: "",
    pwd: "",
  };

  const submitCallBack = (formData) => {
    const url = "http://127.0.0.1:8080/api/guest/login";
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
        console.log("token :", token);
        localStorage.setItem("token", token);
        const no = getPayload(token, "no");
        const email = getPayload(token, "email");
        const pageNick = getPayload(token, "pageNick");
        console.log("Decoded email:", email);

        dispatch(login({ no, email, pageNick }));
        navi("/");
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

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (value && !passwordRegex.test(value))
      return "영문, 숫자, 특수문자를 조합하여 입력해주세요.";
    return "";
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(validatePassword(value));
  };

  return (
    <form onSubmit={handleSubmit}>
      <MainDiv>
        <StyleMain>L O G I N</StyleMain>

        <StyleInputId>
          <StyledInput
            type="text"
            placeholder="이메일을 입력해주세요."
            value={emails}
            name="email"
            onChange={(event) => {
              handleEmailChange(event);
              handleInputChange(event);
            }}
          />
          {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
        </StyleInputId>

        <StyleInputPwd>
          <StyledInput
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            name="pwd"
            onChange={(event) => {
              handlePasswordChange(event);
              handleInputChange(event);
            }}
          />
          {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}
        </StyleInputPwd>
        <BtnTag type="submit">LOGIN</BtnTag>
        <BtnDiv>
          <BtnTagID to="/login/findid">아이디 찾기</BtnTagID>
          <Ptag>|</Ptag>
          <BtnTagPwD to="/login/findpwd">비밀번호 찾기</BtnTagPwD>
        </BtnDiv>
      </MainDiv>
    </form>
  );
};

export default MainLogin;
