import { useEffect, useState } from "react";

const KakaoShare = ({ no }) => {
  const [content, setContent] = useState();

  useEffect(() => {
    const shareKakao = async () => {
      const response = await fetch(
        `http://127.0.0.1:8080/api/slog/kakao/${no}`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
          },
        }
      );
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
                webUrl: `http://localhost:3000/slog/detail/${no}`,
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
        padding: "10px 20px",
        background: "#FEE500",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
    >
      카카오톡 공유하기
    </button>
  );
};

export default KakaoShare;
