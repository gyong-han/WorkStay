import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import styled from "styled-components";

const BookmarkBtn = styled.div`
  display: grid;
  border: none;
  color: #049dd9;
  font-size: 20px;
`;

const BookmarkIcon = () => {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <BookmarkBtn onClick={toggleBookmark}>
      {bookmarked ? <FaRegBookmark /> : <FaBookmark />}
    </BookmarkBtn>
  );
};

export default BookmarkIcon;
