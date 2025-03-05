import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { login } from "../../redux/memberSlice";

const NaverLoginButton = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.naver) {
      console.error("❌ Naver SDK가 아직 로드되지 않았습니다.");
      return;
    }

    console.log("✅ Naver SDK 로드 완료");

    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: "rQJFPY31YqMBONKGunG7", // ✅ 네이버 클라이언트 ID 입력
      callbackUrl: "http://localhost:3000", // ✅ Redirect URI 입력
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 60 },
    });
    naverLogin.init();
    console.log("✅ 네이버 로그인 초기화 완료!");
  }, []);

  const handleNaverLogin = () => {
    if (!window.naver) {
      console.error("❌ Naver SDK가 아직 로드되지 않았습니다.");
      return;
    }

    window.naver.authorize({
      success: function (authObj) {
        console.log("✅ 네이버 로그인 성공:", authObj);
        sendTokenToBackend(authObj.access_token);
      },
      fail: function (err) {
        console.error("❌ 네이버 로그인 실패:", err);
      },
    });
  };

  const sendTokenToBackend = async (accessToken) => {
    try {
      const response = await fetch("http://localhost:8080/oauth/naver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accessToken }),
      });

      if (!response.ok) {
        throw new Error("❌ 서버 응답 실패");
      }

      const data = await response.json();
      const token = data.token;
      localStorage.setItem("token", token);
      console.log("✅ JWT:", token);

      // ✅ JWT 디코딩 후 Redux 상태 업데이트
      const decoded = jwtDecode(token);
      dispatch(login(decoded));
    } catch (error) {
      console.error("❌ 서버 요청 실패:", error);
    }
  };

  return (
    <div id="naverIdLogin">
      <button onClick={handleNaverLogin}>네이버 로그인</button>
    </div>
  );
};

export default NaverLoginButton;
