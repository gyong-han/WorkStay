import { useEffect, useState } from "react";
import { BASE_URL, BASE_URL2 } from "../../components/service/config";

const KakaoShare = ({ no }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    const shareKakao = async () => {
      const response = await fetch(`${BASE_URL}/api/slog/kakao/${no}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      });
      const data = await response.json();
      setContent(data);
    };

    shareKakao();
  }, []);

  useEffect(() => {
    const createKakaoButton = () => {
      if (window.Kakao && content) {
        const kakao = window.Kakao;
        if (!kakao.isInitialized()) {
          kakao.init("e27f5cee69f66bf555b7350910107a59");
        }

        kakao.Share.createDefaultButton({
          container: "#kakaotalk-sharing-btn",
          objectType: "feed",
          content: {
            title: content.title,
            description: content.tagline,
            imageUrl: content.fileUrl ? content.fileUrl.split(",")[0] : "",
            link: {
              webUrl: "",
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
                webUrl: `${BASE_URL2}/slog/detail/${no}`,
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
      id="kakaotalk-sharing-btn"
      style={{
        backgroundImage:
          'url("https://nimage.newsway.co.kr/photo/2024/07/18/20240718000073_0640.jpg")',
        backgroundColor: "rgb(254, 229, 0)",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        width: "50px",
        height: "50px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    ></button>
  );
};

export default KakaoShare;
