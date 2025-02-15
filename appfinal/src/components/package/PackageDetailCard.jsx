import React from 'react';
import styled from 'styled-components';
import PictureSlide from '../listcomponents/PictureSlide';

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
  return (
    <Layout>
      <div></div>
      <div></div>
      <TextAreaDiv>
        <div>{props.information}</div>
        <div>{props.title}</div>
        <div>₩120,000</div>
        <ContentDiv>넉넉한 개인 책상, 하이엔드 사무의자, 전좌석 모니터와 회의실까지 ‘Work’의
          본질을 놓치지 않으면서 오션뷰 마운틴뷰를 모두 가지고 있는 최고, 최대 규모의
          프리미엄 워케이션 오피스입니다.
        </ContentDiv>
        <div>체크인 09:00 / 체크아웃 18:00</div>
        <div>기준 인원 6명 (최대 12 명)</div>
        <div>공간면적 120㎡</div>
        <div>폰 부스 3개</div>
        <div>데스크</div>
        <div>모니터</div>
      </TextAreaDiv>
      <div>
        {/* <PictureSlide w={960}h={540} 
          img1={"https://picsum.photos/300/200"}
          img2={"https://picsum.photos/300/200"}
          img3={"https://picsum.photos/300/200"}
          img4={"https://picsum.photos/300/200"}
        ></PictureSlide> */}
      </div>
    </Layout>
  );
};

export default PackageDetailCard;