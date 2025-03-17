import { useEffect, useState } from "react";
import { BASE_URL, BASE_URL2 } from "../service/config";

const KakaoShareStay = ({ no }) => {
  const [content, setContent] = useState();
  useEffect(() => {
    const shareKakao = async () => {
      const response = await fetch(`${BASE_URL}/stay/detail`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(no),
      });
      const data = await response.json();
      // console.log("가져온 데이터 ",data);
      setContent(data);
    };
    shareKakao();
  }, [no]);

  useEffect(() => {
    const createKakaoButton = () => {
      if (window.Kakao && content) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
          kakao.init("e27f5cee69f66bf555b7350910107a59");
        }

        kakao.Share.createDefaultButton({
          container: "#kakaotalk-sharing-stay-btn",
          objectType: "feed",
          content: {
            title: content.name,
            description: content.tagline,
            imageUrl: content.filePath,
            link: {
              webUrl: `${BASE_URL2}/findstay/detail/${no}`,
            },
          },
          social: {
            likeCount: content.likeCount || 0,
            commentCount: content.commentCount || 0,
            sharedCount: content.sharedCount || 0,
          },
          buttons: [
            {
              title: "앱으로 보기",
              link: {
                webUrl: `${BASE_URL2}/findstay/detail/${no}`,
              },
            },
          ],
        });
      }
    };

    if (content) {
      createKakaoButton();
    }
  }, [content]);

  return (
    <button
      id="kakaotalk-sharing-stay-btn"
      style={{
        backgroundImage: `url("https://nimage.newsway.co.kr/photo/2024/07/18/20240718000073_0640.jpg")`,
        backgroundColor: "#FEE500", // 배경색과 함께 사용 가능
        backgroundSize: "cover", // 이미지 크기 조절
        backgroundPosition: "center", // 이미지 중앙 정렬
        width: "50px", // 버튼 크기 설정 (필요에 따라 조절)
        height: "50px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    ></button>
  );
};

export default KakaoShareStay;
