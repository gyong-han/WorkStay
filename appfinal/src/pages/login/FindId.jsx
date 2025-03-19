import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Alert from "../../components/Alert";
import { useFormData } from "../../utils/useFormData";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../components/service/config";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr 3fr 0.5fr 0.5fr 0.5fr 1fr 1fr;
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

const BtnDiv = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-row: 8;
  grid-template-columns: 2fr 0.2fr 4fr 0.2fr 2fr;
`;

const Ptag = styled.p`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-column: 3;
  white-space: pre-line;
  color: #202020;
  font-weight: 200;
`;

const SpanTag = styled.span`
  display: block;
  display: flex;
  justify-content: center;
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

const FindId = () => {
  const [names, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [number, setNumber] = useState("");
  const [numberError, setNumberError] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [foundEmail, setFoundEmail] = useState("");
  const navi = useNavigate();
  const dispatch = useDispatch();

  const callback = (formData) => {
    const url = `${BASE_URL}/api/guest/findid`;
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(url, option)
      .then((resp) => resp.json())
      .then((data) => {
        setFoundEmail(data.email); // ✅ Redux 대신 useState 사용
        setIsAlertOpen(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  const { formData, handleInputChange, handleSubmit } = useFormData(
    {},
    callback
  );

  const onSubmit = (data) => {
    setFoundEmail(data.email); // ⬅ 이메일 값을 상태에 저장
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navi("/login"); // 확인 버튼 누르면 로그인 페이지로 이동
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

  const handleNumberChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    setNumberError(validateNumber(value));
  };
  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    setNameError(validateName(value));
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e, onSubmit)}>
        <MainDiv>
          <StyleMain>FIND ID</StyleMain>

          <StyleInputId>
            <StyledInput
              type="text"
              placeholder="이름을 입력해주세요."
              value={names}
              name="name"
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
          <BtnTag type="submit">이메일 찾기</BtnTag>
          <BtnDiv>
            <Ptag>
              이름과 휴대 전화 번호를 알 수 없어 아이디를 찾을 수 없는 경우,
              <SpanTag>help@workstay.com 으로 문의하시기 바랍니다.</SpanTag>
            </Ptag>
          </BtnDiv>
        </MainDiv>
      </form>
      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="로그인"
            titleColor="#049dd9"
            message={`이메일: ${foundEmail}`} // ⬅ 이메일 표시
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
    </>
  );
};

export default FindId;
