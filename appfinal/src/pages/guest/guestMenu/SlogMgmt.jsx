import React from "react";
import styled from "styled-components";

const MainDiv = styled.div`
  display: flex;
  place-content: center;
  width: 800px;
`;

const MainSpanDiv = styled.div`
  font-weight: 700;
  font-size: 25px;
  color: #202020;
`;

const MainWrapper = styled.div`
  width: 1000px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 20px;
  margin-bottom: 50px;
`;

const SlogDiv = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr 1fr 1fr;
  width: 300px;
  height: 400px;
  margin-top: 5px;
  margin-bottom: 30px;
`;

const ImgTag = styled.img`
  width: 300px;
  height: 300px;
`;

const TitleDiv = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #202020;
`;

const NameDiv = styled.div`
  font-size: 20px;
  font-weight: 500;
  color: #202020;
`;

const AddressDiv = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: #202020;
`;

const TagDiv = styled.div`
  font-size: 10px;
  font-weight: 400;
  color: #202020;
`;

const SlogMgmt = () => {
  return (
    <>
      <MainDiv>
        <MainSpanDiv>S-Log 관리</MainSpanDiv>
      </MainDiv>
      <MainWrapper>
        <SlogDiv>
          <ImgTag src="https://images.stayfolio.com/system/pictures/images/000/252/923/original/a382efa6de1474b3b499af1b8d61f3e1f3711e93.jpg?1737082206" />
          <TitleDiv>감각의 여정을 따라: 고유한 스테이 경험 탐험</TitleDiv>
          <NameDiv>스테이 아레</NameDiv>
          <AddressDiv>강원</AddressDiv>
          <TagDiv>일과 영감이 머무는 공간, 워케이션의 새로운 기준</TagDiv>
        </SlogDiv>
        <SlogDiv>
          <ImgTag src="https://images.stayfolio.com/system/pictures/images/000/252/923/original/a382efa6de1474b3b499af1b8d61f3e1f3711e93.jpg?1737082206" />
          <TitleDiv>감각의 여정을 따라: 고유한 스테이 경험 탐험</TitleDiv>
          <NameDiv>스테이 아레</NameDiv>
          <AddressDiv>강원</AddressDiv>
          <TagDiv>일과 영감이 머무는 공간, 워케이션의 새로운 기준</TagDiv>
        </SlogDiv>
        <SlogDiv>
          <ImgTag src="https://images.stayfolio.com/system/pictures/images/000/252/923/original/a382efa6de1474b3b499af1b8d61f3e1f3711e93.jpg?1737082206" />
          <TitleDiv>감각의 여정을 따라: 고유한 스테이 경험 탐험</TitleDiv>
          <NameDiv>스테이 아레</NameDiv>
          <AddressDiv>강원</AddressDiv>
          <TagDiv>일과 영감이 머무는 공간, 워케이션의 새로운 기준</TagDiv>
        </SlogDiv>
      </MainWrapper>
    </>
  );
};

export default SlogMgmt;
