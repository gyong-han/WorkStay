import React from "react";

const NaverLogin = () => {
  function NaverLogin() {
    window.open(
      "https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id={발급키}&redirect_uri=http://localhost:8080/oauth/naver",
      "_blank",
      "width =500,height=700"
    );
  }

  return (
    <img
      src="https://skkuding.dev/post/oauth/naver_logo.webp"
      onClick={NaverLogin}
    />
  );
};

export default NaverLogin;
