import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Alert from "../../components/Alert";

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

const NewPassword = () => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const password = watch("password");
  const passwordCheck = watch("passwordCheck");

  useEffect(() => {
    if (passwordCheck && password !== passwordCheck) {
      setError("passwordCheck", {
        type: "password-mismatch",
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("passwordCheck");
    }
  }, [password, passwordCheck, setError, clearErrors]);

  const onSubmit = (data) => {
    console.log("비밀번호 변경 성공:", data);
    setIsAlertOpen(true); // 알람 띄우기
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MainDiv>
          <StyleMain>NEW PASSWORD</StyleMain>

          <StyleInput row={3}>
            <StyledInput
              type="password"
              placeholder="새로운 비밀번호를 입력해주세요."
              {...register("password", {
                required: "비밀번호를 입력해주세요.",
                pattern: {
                  value:
                    /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
                  message: "영문, 숫자, 특수문자를 조합하여 입력해주세요.",
                },
              })}
            />
            {errors.password && (
              <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
          </StyleInput>

          <StyleInput row={4}>
            <StyledInput
              type="password"
              placeholder="비밀번호를 재입력 해주세요."
              {...register("passwordCheck", {
                required: "비밀번호를 다시 입력해주세요.",
                validate: (value) =>
                  value === password || "비밀번호가 일치하지 않습니다.",
              })}
            />
            {errors.passwordCheck && (
              <ErrorMessage>{errors.passwordCheck.message}</ErrorMessage>
            )}
          </StyleInput>

          <BtnTag type="submit">비밀번호 변경</BtnTag>
        </MainDiv>
      </form>

      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="로그인"
            titleColor="#049dd9"
            message="비밀번호가 변경되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={() => setIsAlertOpen(false)}
          />
        </Backdrop>
      )}
    </>
  );
};

export default NewPassword;
