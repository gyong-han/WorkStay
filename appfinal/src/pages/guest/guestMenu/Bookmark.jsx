import React, { useState } from "react";
import styled from "styled-components";
import BookmarkCardlist from "../../../components/bookmark/BookmarkCardlist";

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
  return (
    <>
      <MainDiv>
        <MainSpanDiv>북마크</MainSpanDiv>
      </MainDiv>
      <MainWrapper>
        <BookmarkCardlist />
        <BookmarkCardlist />
      </MainWrapper>
    </>
  );
};

export default Bookmark;
