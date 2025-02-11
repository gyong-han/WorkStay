import React, { useState } from "react";
import styled from "styled-components";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

const MainCardDiv = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr 0.5fr 0.5 1fr;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  width: 330px;
  height: 380px;
`;

const ImgDIv = styled.div`
  display: grid;
  grid-row: 1;
`;

const Img = styled.img`
  width: 330px;
  height: 250px;
  border-top-right-radius: 15px;
  border-top-left-radius: 15px;
`;

const TopDiv = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  padding-left: 15px;
`;
const TitleDiv = styled.div`
  color: #202020;
  font-size: 25px;
  font-weight: 500;
`;

const MiddleDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding-left: 15px;
`;

const AddressDiv = styled.div`
  color: #202020;
  font-size: 15px;
  font-weight: 400;
`;

const PersonDiv = styled.div`
  color: #202020;
  font-size: 15px;
  font-weight: 400;
`;

const PriceDiv = styled.div`
  display: grid;
  grid-row: 5;
  color: #202020;
  font-size: 20px;
  font-weight: 500;
  padding-left: 15px;
`;

const BookmarkBtn = styled.div`
  border: none;
  color: blue;
`;

const BookmarkCardlist = () => {
  const [bookmarked, setBookmarked] = useState(false);

  const toggleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  return (
    <>
      <MainCardDiv>
        <ImgDIv>
          <Img src="https://images.stayfolio.com/system/pictures/images/000/227/543/original/2d1ec4dbef72d47b952882047fd4b7ef72aa4c28.jpg?1716887068" />
        </ImgDIv>
        <TopDiv>
          <TitleDiv>노모어</TitleDiv>
          <BookmarkBtn onClick={toggleBookmark}>
            {bookmarked ? <FaRegBookmark /> : <FaBookmark />}
          </BookmarkBtn>
        </TopDiv>
        <MiddleDiv>
          <AddressDiv>서울/서대문구</AddressDiv>
          <PersonDiv>2~4명</PersonDiv>
        </MiddleDiv>
        <PriceDiv>₩130,000</PriceDiv>
      </MainCardDiv>
    </>
  );
};

export default BookmarkCardlist;
