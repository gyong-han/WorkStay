import React from "react";
import styled from "styled-components";
import PictureSlide from "../../../components/listcomponents/PictureSlide";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 960px;
  grid-template-rows: 80px 1fr;
`;

const TextAreaDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 70px 50px 200px 30px 30px 30px 30px 30px 30px;

  & > div:nth-child(2) {
    font-size: 30px;
    font-weight: 600;
  }

  & > div:nth-child(1),
  & > div:nth-child(3) {
    font-size: 22px;
  }
`;

const ContentDiv = styled.div`
  width: 400px;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
`;

const RoomDetailCard = (props) => {
  const priceWon = (props.price ?? 0)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <Layout>
      <div></div>
      <div></div>
      <TextAreaDiv>
        <div>{props.information}</div>
        <div>{props.title}</div>
        <div>₩{priceWon}</div>
        <ContentDiv>{props.introduction}</ContentDiv>
        <div>체크인 16:00 / 체크아웃 11:00</div>
        <div>
          기준 인원 {props.min}명 (최대 {props.max} 명)
        </div>
        <div>공간면적 90㎡</div>
        <div>{props.queen ? <div>퀸 침대 {props.queen}개</div> : null}</div>
        <div>{props.double ? <div>더블 침대 {props.double}개</div> : null}</div>
        <div>{props.single ? <div>싱글 침대 {props.single}개</div> : null}</div>
      </TextAreaDiv>
      <div>
        <PictureSlide w={960} h={540} imgPaths={props.imgPaths}></PictureSlide>
      </div>
    </Layout>
  );
};

export default RoomDetailCard;
