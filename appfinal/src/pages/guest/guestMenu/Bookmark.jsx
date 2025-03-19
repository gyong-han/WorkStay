import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookmarkCardlist from "../../../components/bookmark/BookmarkCardlist";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../components/service/config";

const MainDiv = styled.div`
  display: flex;
  place-content: center;
  width: 800px;
`;

const MainSpanDiv = styled.div`
  font-weight: 700;
  font-size: 25px;
  color: #202020;
  margin-bottom: 10px;
`;

const MainWrapper = styled.div`
  width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const Bookmark = () => {
  const navi = useNavigate();
  const [bookmarkedData, setBookmarkedData] = useState({
    stays: [],
    spaces: [],
  });
  const [no, setNo] = useState(null); // no 상태 추가

  useEffect(() => {
    const token = localStorage.getItem("token");
    const pureToken = token?.startsWith("Bearer ")
      ? token.replace("Bearer ", "")
      : token;

    if (pureToken) {
      try {
        const decoded = jwtDecode(pureToken);
        setNo(decoded.no);
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!no) return; // no 없으면 fetch 실행 안 함.

    fetch(`${BASE_URL}/api/guest/bookmarks/${no}`)
      .then((res) => res.json())
      .then((data) => {
        setBookmarkedData(data);
      })
      .catch((error) => console.error("북마크 데이터 불러오기 실패:", error));
  }, [no]);

  const handleToggleBookmark = (targetNo, type) => {
    setBookmarkedData((prev) => ({
      stays:
        type === "stay"
          ? prev.stays.filter((item) => item.no !== targetNo)
          : prev.stays,
      spaces:
        type === "space"
          ? prev.spaces.filter((item) => item.no !== targetNo)
          : prev.spaces,
    }));
  };

  const stayClick = (stayNo) => {
    navi(`/findstay/detail/${stayNo}/refund-policy`);
  };

  const spaceClick = (spaceNo) => {
    navi(`/findspace/detail/${spaceNo}`);
  };

  return (
    <>
      <MainDiv>
        <MainSpanDiv>북마크</MainSpanDiv>
      </MainDiv>
      <MainWrapper>
        {bookmarkedData.stays?.map((stay) => (
          <BookmarkCardlist
            key={`stay-${stay.no}`}
            data={stay}
            type="stay"
            onToggle={handleToggleBookmark}
            f={() => {
              stayClick(stay.no);
            }}
          />
        ))}
        {bookmarkedData.spaces?.map((space) => (
          <BookmarkCardlist
            key={`space-${space.no}`}
            data={space}
            type="space"
            onToggle={handleToggleBookmark}
            f={() => {
              spaceClick(space.no);
            }}
          />
        ))}
      </MainWrapper>
    </>
  );
};

export default Bookmark;
