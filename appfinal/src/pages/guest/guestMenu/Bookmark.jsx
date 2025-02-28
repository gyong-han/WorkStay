import React, { useEffect, useState } from "react";
import styled from "styled-components";
import BookmarkCardlist from "../../../components/bookmark/BookmarkCardlist";
import { jwtDecode } from "jwt-decode";

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
        console.log("🔹 디코딩된 토큰:", decoded);
        setNo(decoded.no);
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (!no) return; // no 없으면 fetch 실행 안 함.

    fetch(`http://127.0.0.1:8080/api/guest/bookmarks/${no}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🔹 북마크 데이터:", data);
        setBookmarkedData(data);
      })
      .catch((error) => console.error("북마크 데이터 불러오기 실패:", error));
  }, [no]);

  return (
    <>
      <MainDiv>
        <MainSpanDiv>북마크</MainSpanDiv>
      </MainDiv>
      <MainWrapper>
        {bookmarkedData.stays?.map((stay) => (
          <BookmarkCardlist key={`stay-${stay.no}`} data={stay} type="stay" />
        ))}
        {bookmarkedData.spaces?.map((space) => (
          <BookmarkCardlist
            key={`space-${space.no}`}
            data={space}
            type="space"
          />
        ))}
      </MainWrapper>
    </>
  );
};

export default Bookmark;
