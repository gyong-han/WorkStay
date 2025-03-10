import React, { useEffect, useState } from 'react';

const KakaoMsg = () => {
  const fd1 = localStorage.getItem("fd");
  const fdData = JSON.parse(fd1);  
  const KAKAO_JS_KEY = "fc5cec587b47d4825551ae8da5ed23b6"; // 본인의 JS 키로 변경
  const SCOPE = "talk_message"; // 메시지 전송 권한

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
      script.integrity = "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka";
      script.crossOrigin = "anonymous";
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_JS_KEY);
          console.log("Kakao SDK initialized:", window.Kakao.isInitialized());
        }
      };
      document.head.appendChild(script);
    } else {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
    }
  }, []);

  // 로그인 확인
  const checkLogin = () => {
    const token = window.Kakao.Auth.getAccessToken();
    if (token) {
      setIsLoggedIn(true);
    }
  };

  // 카카오 로그인 (팝업 방식)
  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      scope: SCOPE,
      success: function (authObj) {
        console.log("로그인 성공:", authObj);
        setIsLoggedIn(true);
        sendToMe(); // 로그인 후 메시지 전송
      },
      fail: function (err) {
        console.error("로그인 실패:", err);
      },
    });
  };

  // 메시지 보내기
  const sendToMe = () => {
    if (!window.Kakao || !window.Kakao.Auth.getAccessToken()) {
      alert("로그인이 필요합니다.");
      return;
    }

    window.Kakao.API.request({
      url: "/v2/api/talk/memo/default/send",
      data: {
        template_object: {
          object_type: "feed", // 기본 템플릿 (피드 형식)
          content: {
            title: fdData.name+"(결제 완료)", // 제목
            description: "\n✅ 예약이 정상적으로 완료되었습니다!"+"사용일자 :"+fdData.useDay,
            
            image_url: fdData.filePath, // 이미지 URL
            link: {
              web_url: "https://your-website.com", // 웹 링크
              mobile_web_url: "https://your-website.com"
            }
          },
          buttons: [
            {
              title: "결제내역 확인하기",
              link: {
                web_url: "https://your-website.com",
                mobile_web_url: "https://your-website.com"
              }
            }
          ]
        }
      }
    })
      .then((res) => alert("메시지 전송 성공: " + JSON.stringify(res)))
      .catch((err) => alert("메시지 전송 실패: " + JSON.stringify(err)));
  };

  // 버튼 클릭 시 로그인 여부 확인 후 메시지 전송
  const handleKakaoAction = () => {
    if (!window.Kakao) return;

    if (!window.Kakao.Auth.getAccessToken()) {
      loginWithKakao();
    } else {
      sendToMe();
    }
  };

  useEffect(()=>{
    handleKakaoAction();
  },[])

};

export default KakaoMsg;
