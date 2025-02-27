import React, { useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import styled from "styled-components";

const BookmarkBtn = styled.div`
  display: grid;
  border: none;
  color: #049dd9;
  font-size: 20px;
`;

const SpaceBookmarkIcon = () => {
  const [bookMark, setBookMark] = useState(false);

  const toggleBookmark = () => {
    setBookMark(!bookmarked);
  };

  return (
    <BookmarkBtn onClick={toggleBookmark}>
      {!bookMark ? <IoBookmarkOutline /> : <IoBookmark />}
    </BookmarkBtn>
  );
};

export default SpaceBookmarkIcon;
