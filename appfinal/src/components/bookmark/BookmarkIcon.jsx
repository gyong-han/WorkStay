import React, { useState, useEffect } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../service/config";

const BookmarkBtn = styled.div`
  display: grid;
  border: none;
  color: #049dd9;
  font-size: 20px;
  cursor: auto;
`;

const BookmarkIcon = ({ type, targetNo, onToggle }) => {
  const [bookmarked, setBookmarked] = useState(true);
  const token = localStorage.getItem("token");
  const navi = useNavigate();
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
    if (!token) {
      alert("로그인이 필요합니다.");
      navi("/login");
      return;
    }

    const url = `${BASE_URL}/api/guest/${type}/${no}/${targetNo}`;

    fetch(url, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(() => {
        setBookmarked(!bookmarked);
        if (onToggle) onToggle(targetNo, type);
      })
      .catch((error) => console.error("북마크 변경 실패:", error));
  };

  return (
    <BookmarkBtn onClick={toggleBookmark}>
      {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
    </BookmarkBtn>
  );
};

export default BookmarkIcon;
