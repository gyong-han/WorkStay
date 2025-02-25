import React from "react";
import styled from "styled-components";

const Layout = styled.div`
  display: grid;
  grid-template-rows: auto;
  color: #fafafa;
  padding: 30px;
  min-height: 300px;
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-rows: 50px 1fr;
`;

const InfoWrapper = styled.div`
  display: grid;
  margin-left: 25px;

  & > div {
    margin-bottom: 10px;
  }
`;

const UlWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;

  & > ul,
  li {
    margin-top: 10px;
  }
`;

const ExplainWrapper = styled.div`
  display: flex;

  & > div {
    margin: 50px 50px 50px 0px;
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
`;

const InformationUse = () => {
  return (
    <>
      <Layout>
        <TextWrapper>
          <Title>이용 안내</Title>
          <InfoWrapper>
            <div>이용 규칙</div>
            <UlWrapper>
              <ul>
                <li>체크인은 오후 4시, 체크아웃은 오전 11시 입니다.</li>
                <li>최대 인원은 영유아를 미포함한 인원입니다.</li>
                <li>예약인원 외 방문객의 출입을 엄격히 제한합니다.</li>
                <li>
                  미성년자의 경우 보호자(법정대리인)의 동행 없이 투숙이
                  불가합니다.
                </li>
                <li>
                  모든 공간에서 절대 금연입니다. 위반 시 특수청소비가
                  청구됩니다.
                </li>
                <li>
                  침구나 비품, 시설 등에 심각한 오염, 파손 및 분실이 발생한 경우
                  변상비가 청구됩니다.
                </li>
                <li>
                  외출시 귀중품은 꼭 소지해주세요. 귀중품 분실에 대해 책임지지
                  않습니다.
                </li>
                <li>
                  상업적인 촬영이나 대관의 경우 반드시 사전 문의주시기 바랍니다.
                </li>
              </ul>
            </UlWrapper>
            <div></div>
            <div>시설 / 비품</div>
            <UlWrapper>
              <ul>
                <li>
                  싱크대, 전자렌지. 전기포트. 커피 머신. 접시. 그릇. 수저 세트.
                  컵, 냉장고가 구비되어 있습니다.
                </li>
                <li>
                  에어컨, 제습기, 욕조, 샤워부스, 무선스피커, 소파, 테이블이
                  구비되어 있습니다.
                </li>
                <li>예약인원 외 방문객의 출입을 엄격히 제한합니다.</li>
                <li>칫솔, 치약, 빗 등이 구비되어 있습니다.</li>
              </ul>
            </UlWrapper>
          </InfoWrapper>
        </TextWrapper>
      </Layout>
    </>
  );
};

export default InformationUse;
