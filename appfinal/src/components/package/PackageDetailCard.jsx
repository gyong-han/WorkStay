import React from 'react';
import styled from 'styled-components';
import PictureSlide from '../listcomponents/PictureSlide';
import { useSelector } from 'react-redux';

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 960px;
  grid-template-rows:80px 1fr;
`;

const TextAreaDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 70px 50px 200px 30px 30px 30px 30px 30px 30px;

&>div:nth-child(2){
  font-size: 30px;
  font-weight: 600;
}

&>div:nth-child(1),
&>div:nth-child(3){
  font-size: 22px;
}
`;

const ContentDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

`;

const PackageDetailCard = (props) => {
  
  const spaceVo = useSelector((state)=>state.space);

  const priceWon = (props.price).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return (
    <Layout>
      <div></div>
      <div></div>
      <TextAreaDiv>
        <div>{props.information}</div>
        <div>{props.title}</div>
        <div>₩{priceWon}</div>
        <ContentDiv>편리한 위치와 다양한 편의 시설을 갖춘 공간을 제공합니다.<br></br>
          회의, 행사, 워크숍 등 다양한 용도로 최적화된 공간으로 고객님의 요구에 맞춰 제공합니다.
          편안하고 전문적인 환경에서 비즈니스와 이벤트를 성공적으로 개최해 보세요.
        </ContentDiv>
        <div>{spaceVo.packageType === '낮 패키지'?"체크인 09:00 / 체크아웃 18:00":"체크인 18:00 / 체크아웃 09:00"}</div>
        <div>기준 인원 {props.min}명 (최대 {props.max} 명)</div>
        <div>공간면적 120㎡</div>
        <div>폰 부스 3개</div>
        <div>데스크</div>
        <div>모니터</div>
      </TextAreaDiv>
      <div>
        <PictureSlide w={960}h={540} 
          imgPaths={props.imgPaths}
        ></PictureSlide>
      </div>
    </Layout>
  );
};

export default PackageDetailCard;