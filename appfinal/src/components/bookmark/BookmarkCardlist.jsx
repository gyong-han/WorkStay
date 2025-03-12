import React from "react";
import styled from "styled-components";
import BookmarkIcon from "./BookmarkIcon";
import Share from "./Share";

const MainCardDiv = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr 0.5fr 0.5 1fr;
  border: 1px solid #d9d9d9;
  border-radius: 15px;
  width: 330px;
  height: 380px;
  margin-bottom: 50px;
  cursor: pointer;
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
  grid-template-columns: 8fr 1fr 1fr;
  padding-left: 15px;
`;

const TitleDiv = styled.div`
  color: #202020;
  font-size: 25px;
  font-weight: 600;
`;

const MiddleDiv = styled.div`
  display: grid;
  padding-left: 15px;
`;

const AddressDiv = styled.div`
  color: #202020;
  font-size: 15px;
  font-weight: 400;
`;

const TaglineDiv = styled.div`
  color: #505050;
  font-size: 13px;
  font-weight: 300;
  padding-left: 15px;
`;

const BookmarkCardlist = ({ data, type, onToggle, f }) => {
  return (
    <>
      <MainCardDiv>
        <ImgDIv>
          <Img src={data.filePath} alt="thumbnail" onClick={f} />
        </ImgDIv>
        <TopDiv>
          <TitleDiv>{data.name}</TitleDiv>
          <div></div>
          <BookmarkIcon type={type} targetNo={data.no} onToggle={onToggle} />
        </TopDiv>
        <MiddleDiv>
          <AddressDiv>{data.address}</AddressDiv>
        </MiddleDiv>
        <TaglineDiv>{data.tagline}</TaglineDiv>
      </MainCardDiv>
    </>
  );
};

export default BookmarkCardlist;
