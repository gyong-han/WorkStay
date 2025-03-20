import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Alert from "../Alert";
import { BASE_URL2 } from "../service/config";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const KakaoButton = styled.button`
  background-color: #fee500;
  height: 30px;
  border: none;
  font-weight: 700;
`;

const KakaoMsg = ({ vo }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };
  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
  };

  const fd1 = localStorage.getItem("fd");
  const fdData = JSON.parse(fd1);
  const KAKAO_JS_KEY = "fc5cec587b47d4825551ae8da5ed23b6"; // 본인의 JS 키로 변경
  const SCOPE = "talk_message"; // 메시지 전송 권한

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Kakao SDK가 로드되지 않았을 경우 로드하기
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";
      script.integrity =
        "sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka";
      script.crossOrigin = "anonymous";
      script.onload = () => {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_JS_KEY);
        }
      };
      document.head.appendChild(script);
    } else {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(KAKAO_JS_KEY);
      }
    }
  }, []);

  // 카카오 로그인 (팝업 방식)
  const loginWithKakao = () => {
    window.Kakao.Auth.login({
      scope: SCOPE,
      success: function (authObj) {
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
            title: fdData.name + "(결제 완료)", // 제목
            description:
              "\n✅ 예약이 정상적으로 완료되었습니다!" +
              "사용일자 :" +
              fdData.useDay,
            image_url: fdData.filePath, // 이미지 URL
            link: {
              web_url: `${BASE_URL2}/hostMenu/spaceReserv/spacedetail?reno=${vo.reservationNo}`, // 웹 링크
              mobile_web_url: `${BASE_URL2}/hostMenu/spaceReserv/spacedetail?reno=${vo.reservationNo}`,
            },
          },
          buttons: [
            {
              title: "결제내역 확인하기",
              link: {
                web_url: `${BASE_URL2}/hostMenu/spaceReserv/spacedetail?reno=${vo.reservationNo}`,
                mobile_web_url: `${BASE_URL2}/hostMenu/spaceReserv/spacedetail?reno=${vo.reservationNo}`,
              },
            },
          ],
        },
      },
    })
      .then((res) => setIsAlertOpen(true))
      .catch((err) => setIsAlertOpen(true));
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

  return (
    <div>
      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="카카오톡"
            titleColor="#049dd9"
            message="카카오톡 전송완료."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
      {isAlertOpen2 && (
        <Backdrop>
          <Alert
            title="카카오톡"
            titleColor="#049dd9"
            message="카카오톡 전송실패 (로그인 실패)."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose2}
          />
        </Backdrop>
      )}
      <KakaoButton onClick={handleKakaoAction}>
        카톡으로 결제내역 받기
      </KakaoButton>
    </div>
  );
};

export default KakaoMsg;
