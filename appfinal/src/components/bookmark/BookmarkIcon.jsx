import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";

const BookmarkBtn = styled.div`
  display: grid;
  border: none;
  color: #049dd9;
  font-size: 20px;
  cursor: pointer;
`;

const BookmarkIcon = ({ type, targetNo }) => {
  const [bookmarked, setBookmarked] = useState(false);
  const token = localStorage.getItem("token");
  let no = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      no = decoded.no;
    } catch (error) {
      console.error("토큰 디코딩 오류:", error);
    }
  }

  const toggleBookmark = () => {
    if (!no) {
      alert("로그인이 필요합니다.");
      return;
    }

    const url = `http://127.0.0.1:8080/api/guest/${type}/${no}/${targetNo}`;

    fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => setBookmarked(!bookmarked))
      .catch((error) => console.error("북마크 변경 실패:", error));
  };

  return (
    <BookmarkBtn onClick={toggleBookmark}>
      {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </BookmarkBtn>
  );
};

export default BookmarkIcon;
