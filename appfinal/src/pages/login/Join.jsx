import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFormData } from "../../utils/useFormData";
import Alert from "../../components/Alert";
import { BASE_URL } from "../../components/service/config";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr 2fr 2fr 1.5fr 1.5fr 1fr 1.5fr 1fr;
`;

const StyleMain = styled.div`
  color: #202020;
  font-size: 3em;
  font-weight: 700;
  display: flex;
  grid-row: 2;
  justify-content: center;
  align-items: center;
  letter-spacing: 8px;
`;

const StyleInput = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  grid-row: ${(props) => props.row || "auto"};
`;

const StyledInput = styled.input`
  border: 0;
  border-bottom: solid 1px #202020;
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
  background-color: ${(props) => (props.disabled ? "#bbbbbb" : "#049dd9")};
  color: #fafafa;
  font-size: 1.2em;
  font-weight: 600;
  width: 500px;
  height: 60px;
  grid-row: 8;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const CheckInput = styled.div`
  display: flex;
  justify-content: space-around;
  letter-spacing: 2px;
`;

const Checkbox = styled.input`
  width: 13px;
  height: 13px;
`;

const CheckPTag = styled.span`
  font-weight: 700;
  font-size: 0.8rem;
  color: #f20530;
`;

const CheckSpan = styled.span`
  font-weight: 300;
  font-size: 0.8rem;
  color: #202020;
`;

const PasswordCheckInput = styled.div`
  display: flex;
  justify-content: space-around;
  letter-spacing: 3px;
  font-size: 0.8em;
  font-weight: 600;
  gap: 20px;
`;

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

const PasswordCheck = styled.span`
  color: ${(props) => (props.valid ? "#049DD9" : "#202020")};
`;

const IoMdCheckmarkStyled = styled(FaCheck)`
  color: ${(props) => (props.valid ? "#049DD9" : "#202020")};
  width: 12px;
  height: 12px;
`;

const Join = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [numberError, setNumberError] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const navi = useNavigate();

  const callback = (formData) => {
    const url = `${BASE_URL}/api/guest/join`;
    const option = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(url, option)
      .then((resp) => resp.text())
      .then((data) => {
        // navi("/login");
      });
  };

  const { formData, handleInputChange, handleSubmit } = useFormData(
    {},
    callback
  );

  // 비밀번호 조건 검사 함수
  const checkPasswordConditions = (password) => {
    return {
      hasEnglish: /[a-zA-Z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      validLength: password.length >= 8 && password.length <= 20,
    };
  };

  const passwordConditions = checkPasswordConditions(password);

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value))
      return "이메일 형식이 올바르지 않습니다.";
    return "";
  };

  const handleEmailChange = async (e) => {
    const value = e.target.value;
    setEmail(value);
    setEmailError(validateEmail(value));

    if (validateEmail(value) === "") {
      try {
        const response = await fetch(
          `${BASE_URL}/api/guest/check-email?email=${value}`
        );
        const isDuplicate = await response.json();
        if (isDuplicate) {
          setEmailError("이미 사용 중인 이메일입니다.");
        }
      } catch (error) {
        console.error("이메일 중복 확인 오류:", error);
      }
    }
  };

  const validateName = (value) => {
    const nameRegex = /^[가-힣]{2,10}$/;
    if (value && !nameRegex.test(value))
      return "이름 형식이 올바르지 않습니다.";
    return "";
  };
  const validateNumber = (value) => {
    const numberRegex = /^010\d{7,8}$/;
    if (value && !numberRegex.test(value))
      return "휴대 전화 번호 형식이 올바르지 않습니다.";
    return "";
  };

  const handleNumberChange = async (e) => {
    const value = e.target.value;
    setNumber(value);
    setNumberError(validateNumber(value));

    if (validateNumber(value) === "") {
      try {
        const response = await fetch(
          `${BASE_URL}/api/guest/check-phone?phone=${value}`
        );
        const isDuplicate = await response.json();
        if (isDuplicate) {
          setNumberError("이미 사용 중인 전화번호입니다.");
        }
      } catch (error) {
        console.error("전화번호 중복 확인 오류:", error);
      }
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  const onSubmit = (data) => {
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navi("/login"); // 확인 버튼 누르면 로그인 페이지로 이동
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
        <MainDiv>
          <StyleMain>JOIN</StyleMain>

          <StyleInput row={3}>
            <StyledInput
              type="text"
              placeholder="이메일을 입력해주세요."
              value={email}
              name="email"
              onChange={(event) => {
                handleEmailChange(event);
                handleInputChange(event);
              }}
            />
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
          </StyleInput>

          <StyleInput row={4}>
            <StyledInput
              type="password"
              placeholder="비밀번호를 입력 해주세요."
              value={password}
              name="pwd"
              maxLength={20}
              onChange={(e) => {
                setPassword(e.target.value);
                handleInputChange(e);
              }}
            />
            <div style={{ marginTop: "10px" }}>
              <PasswordCheckInput>
                <PasswordCheck valid={passwordConditions.hasEnglish}>
                  <IoMdCheckmarkStyled valid={passwordConditions.hasEnglish} />
                  영문
                </PasswordCheck>

                <PasswordCheck valid={passwordConditions.hasNumber}>
                  <IoMdCheckmarkStyled valid={passwordConditions.hasNumber} />
                  숫자
                </PasswordCheck>

                <PasswordCheck valid={passwordConditions.hasSpecialChar}>
                  <IoMdCheckmarkStyled
                    valid={passwordConditions.hasSpecialChar}
                  />
                  특수문자
                </PasswordCheck>

                <PasswordCheck valid={passwordConditions.validLength}>
                  <IoMdCheckmarkStyled valid={passwordConditions.validLength} />
                  8자 이상 20자 이하
                </PasswordCheck>
              </PasswordCheckInput>
            </div>
          </StyleInput>

          <StyleInput row={5}>
            <StyledInput
              type="text"
              placeholder="이름을 입력해주세요."
              value={name}
              name="name"
              onChange={(event) => {
                handleNameChange(event);
                handleInputChange(event);
              }}
            />
            {nameError && <ErrorMessage>{nameError}</ErrorMessage>}
          </StyleInput>
          <StyleInput row={6}>
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
          </StyleInput>

          <StyleInput row={7}>
            <CheckInput>
              <Checkbox
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              <CheckPTag>[필수]</CheckPTag>
              <CheckSpan>이용약관 및 개인정보 처리방침에 동의합니다.</CheckSpan>
            </CheckInput>
          </StyleInput>

          <BtnTag type="submit" disabled={!isChecked}>
            가입하기
          </BtnTag>
        </MainDiv>
      </form>

      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="로그인"
            titleColor="#049dd9"
            message="회원가입 되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
    </>
  );
};

export default Join;
