import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 450px;
  height: 450px;
  position: relative;
  overflow: hidden;
`;

const ImgLayer = styled.div`
  width: 450px;
  height: 450px;
  background-image: url(${(props) => props.img});
  background-position: center;
  background-size: cover;
  filter: ${(props) => (props.isAvailable ? "none" : "grayscale(100%)")};
`;

const ContentLayer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
  background-color: rgba(32, 32, 32, 0.5);
`;

const PackageContentDiv = styled.div`
  width: 100%;
  height: 150px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 20px 40px 40px;
  padding: 10px;
  color: #fafafa;
  background-color: #2020207f;
`;

const Title = styled.div`
  font-size: 24px;
  display: flex;
  align-items: end;
`;

const Info = styled.div`
  font-size: 13px;
  display: flex;
  align-items: start;
`;

const Price = styled.div`
  font-size: 17px;
  display: flex;
  align-items: end;
`;

const BtnArea = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  font-size: 17px;

  & > span {
    margin-right: 30px;
    margin-bottom: 5px;
    text-decoration: underline solid #fafafa;
  }
`;

const Soldout = styled.span`
  margin-right: 30px;
  margin-bottom: 5px;
  color: #f20530;
  text-decoration: none !important;
`;

const RoomDisplay = ({
  img,
  title,
  standard,
  max,
  price,
  url,
  isAvailable,
}) => {
  const priceWon = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Wrapper>
      <ImgLayer img={img} isAvailable={isAvailable} />
      <ContentLayer>
        <div></div>
        {isAvailable ? (
          <Link to={url} style={{ textDecoration: "none" }}>
            <PackageContentDiv>
              <Title>{title}</Title>
              <Info>
                기준 {standard}명 / 최대 {max}명
              </Info>
              <Price>₩{priceWon}</Price>
              <BtnArea>
                <span>예약하기</span>
              </BtnArea>
            </PackageContentDiv>
          </Link>
        ) : (
          <PackageContentDiv>
            <Title>{title}</Title>
            <Info>
              기준 {standard}명 / 최대 {max}명
            </Info>
            <Price>₩{priceWon}</Price>
            <BtnArea>
              <Soldout>예약불가</Soldout>
            </BtnArea>
          </PackageContentDiv>
        )}
      </ContentLayer>
    </Wrapper>
  );
};

export default RoomDisplay;
