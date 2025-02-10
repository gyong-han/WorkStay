import styled from "styled-components";
import { Link } from "react-router-dom";

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
`;

const Ptag = styled.p`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-column: 3;
  color: #202020;
  font-weight: 600;
`;

const Login = () => {
  return (
    <>
      <MainDiv>
        <StyleMain>L O G I N</StyleMain>

        <StyleInputId>카카오 로그인</StyleInputId>

        <StyleInputPwd>네이버 로그인</StyleInputPwd>
        <BtnDiv>
          <BtnTagID to="/login/email">이메일 로그인</BtnTagID>
          <Ptag>|</Ptag>
          <BtnTagPwD to="/login/join">신규 회원가입</BtnTagPwD>
        </BtnDiv>
      </MainDiv>
    </>
  );
};

export default Login;
