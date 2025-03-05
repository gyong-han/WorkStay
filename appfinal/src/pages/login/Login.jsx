import styled from "styled-components";
import { Link } from "react-router-dom";
import KakaoLoginButton from "./KakaoLoginButton";
import NaverLoginButton from "./NaverLoginButton";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr 3.5fr 0.5fr 0.5fr 0.8fr 1fr;
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

const BtnDiv = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-row: 7;
`;

const BtnTagID = styled(Link)`
  display: grid;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 5px;
  width: 295px;
  height: 45px;
  color: #fafafa;
  font-weight: 600;
  font-size: 0.9em;
  background-color: #049dd9;
  text-decoration-line: none;
`;
const BtnTagPwD = styled(Link)`
  display: grid;
  justify-content: left;
  align-items: center;
  border: 0;
  color: #202020;
  font-weight: 600;
  font-size: 0.9em;
  background-color: #fafafa;
  text-decoration-line: none;
`;

const Login = () => {
  window.scrollTo(0, 0);
  return (
    <>
      <MainDiv>
        <StyleMain>L O G I N</StyleMain>

        <StyleInputId>
          <KakaoLoginButton />
        </StyleInputId>

        <StyleInputPwd>
          <BtnTagID to="/login/email">이메일 로그인</BtnTagID>
        </StyleInputPwd>
        <BtnDiv>
          <BtnTagPwD to="/login/join">신규 회원가입</BtnTagPwD>
        </BtnDiv>
      </MainDiv>
    </>
  );
};

export default Login;
