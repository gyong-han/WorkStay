import React, { useState } from "react";
import styled from "styled-components";
import { FaCheck } from "react-icons/fa";

// const MainDiv = styled.div`
//   display: flex;
//   place-content: center;
//   width: 661px;
// `;

const MainWrapper = styled.div`
  width: 800px;
  display: grid;
  justify-content: center;
`;

const MainSpanDiv = styled.div`
  font-weight: 700;
  font-size: 25px;
  color: #202020;
  display: flex;
  justify-content: center;
`;

const ListDiv = styled.div`
  width: 500px;
  display: grid;
  grid-template-rows: 1fr 1fr;
  padding-top: 30px;
`;

const ListSpanDiv = styled.div`
  color: #202020;
  font-weight: 700;
  font-size: 1rem;
  padding-bottom: 5px;
`;

const DataDiv = styled.input`
  color: #202020;
  font-weight: 300;
  font-size: 1rem;
  background-color: #fafafa;
  border-collapse: collapse;
  border-style: none;
  border-bottom: 1px solid #202020;

  &::placeholder {
    color: #bbbbbb;
  }
`;

const PasswordCheckInput = styled.div`
  display: flex;
  justify-content: space-around;
  letter-spacing: 3px;
  font-size: 0.8em;
  font-weight: 600;
  gap: 20px;
`;

const PasswordCheck = styled.span`
  color: ${(props) => (props.valid ? "#049DD9" : "#202020")};
`;

const IoMdCheckmarkStyled = styled(FaCheck)`
  color: ${(props) => (props.valid ? "#049DD9" : "#202020")};
  width: 12px;
  height: 12px;
`;

const CheckListDiv = styled.div`
  display: flex;
  border-bottom: 1px solid #202020;
`;

const CheckBtn = styled.input.attrs({ type: "checkbox" })`
  width: 15px;
  height: 15px;
  border: 1px solid #202020;
  background-color: #fafafa;
  accent-color: #202020;
  cursor: pointer;
  margin-right: 10px;
  color: #202020;
  font-weight: 300;
`;

const SpanTag = styled.span`
  font-size: 0.9rem;
  font-weight: 300px;
  color: #049dd9;
`;

const BtnTag = styled.button`
  display: grid;
  /* justify-self: center; */
  align-items: center;
  border: 1px solid #fafafa;
  border-radius: 5px;
  background-color: #049dd9;
  color: #fafafa;
  font-size: 1.2em;
  font-weight: 600;
  width: 500px;
  height: 60px;
  margin-top: 100px;
`;

const OutBtnTag = styled.button`
  display: grid;
  /* justify-self: center; */
  border: none;
  align-items: center;
  border-radius: 5px;
  background-color: #fafafa;
  color: #f20530;
  font-size: 1.1rem;
  font-weight: 400;
  width: 500px;
  height: 60px;
  margin-bottom: 100px;
`;

const GuestEdit = () => {
  const [password, setPassword] = useState("");

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

  return (
    <form>
      <MainWrapper>
        {/* <MainDiv> */}
        <MainSpanDiv>회원 정보 수정</MainSpanDiv>
        {/* </MainDiv> */}
        <ListDiv>
          <ListSpanDiv>이메일</ListSpanDiv>
          <DataDiv type="text" value={"yeji0714@naver.com"} readOnly></DataDiv>
        </ListDiv>
        <ListDiv>
          <ListSpanDiv>이름</ListSpanDiv>
          <DataDiv type="text" value={"안예지"} readOnly></DataDiv>
        </ListDiv>
        <ListDiv>
          <ListSpanDiv>비밀번호 변경</ListSpanDiv>
          <DataDiv
            type="password"
            placeholder="비밀번호를 입력 해주세요."
            value={password}
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
          ></DataDiv>
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
        </ListDiv>
        <ListDiv>
          <ListSpanDiv>닉네임</ListSpanDiv>
          <DataDiv type="text" placeholder="닉네임을 입력해주세요."></DataDiv>
        </ListDiv>
        <ListDiv>
          <ListSpanDiv>휴대전화번호</ListSpanDiv>
          <DataDiv
            type="text"
            placeholder="'-'을 제외한 휴대전화 번호를 입력해주세요. ex)01012345678."
          ></DataDiv>
        </ListDiv>
        <ListDiv>
          <ListSpanDiv>생년월일</ListSpanDiv>
          <DataDiv
            type="text"
            placeholder="생년월일을 입력해주세요.(8글자)"
          ></DataDiv>
        </ListDiv>
        <ListDiv>
          <ListSpanDiv>마케팅 정보 수신</ListSpanDiv>
          <CheckListDiv>
            <CheckBtn /> 이벤트, 광고 등 혜택 알림 동의 (선택)
          </CheckListDiv>
          <SpanTag>
            ※ 정보성 알림은 혜택 알림 동의 여부와 상관없이 제공됩니다. (예약
            안내 및 메세지)
          </SpanTag>
        </ListDiv>
        <BtnTag type="submit">저장하기</BtnTag>
        <OutBtnTag>회원탈퇴</OutBtnTag>
      </MainWrapper>
    </form>
  );
};

export default GuestEdit;
