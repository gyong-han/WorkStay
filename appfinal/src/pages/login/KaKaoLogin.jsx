import React from "react";
import { styled } from "styled-components";

const StyledImg = styled.img`
  width: 300px;
  height: 80px;
`;
const KaKaoLogin = () => {
  function login() {
    window.open(
      "https://accounts.kakao.com/login/?continue=https%3A%2F%2Fkauth.kakao.com%2Foauth%2Fauthorize%3Fresponse_type%3Dcode%26client_id%{c51dc700559a4d65e03a22a0cbc7ce27}%26redirect_uri%3Dhttps%253A%252F%252F127.0.0.1%253A3000%252Flogin.com%252Foauth%26through_account%3Dtrue#login",
      "_blank",
      "width =500,height=700"
    );
  }

  // function NaverLogin() {
  //   window.open(
  //     "https://nid.naver.com/oauth2.0/authorize?response_type=code&state=oVGmbu6IWp&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Foauth%2Fnaver&client_id={c51dc700559a4d65e03a22a0cbc7ce27}&oauth_os&inapp_view&locale=ko_KR&auth_type=reauthenticate",
  //     "_blank",
  //     "width =500,height=700"
  //   );
  // }

  return (
    <>
      <StyledImg
        src="https://www.kakaosign.com/resources/img/kakao_experience_login_btn.png"
        onClick={login}
        alt="Login Button"
      />
      {/* <br /> */}
      {/* <StyledImg
        src="https://skkuding.dev/post/oauth/naver_logo.webp"
        onClick={NaverLogin}
      /> */}
    </>
  );
};

export default KaKaoLogin;
