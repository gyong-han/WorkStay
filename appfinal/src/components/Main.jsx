import React from "react";
import styled from "styled-components";

const MainContainer = styled.main`
  display: grid;
  gap: 40px;
  justify-items: center;
  padding: 20px;
`;

const SlideContainer = styled.div`
  display: grid;
  grid-template-rows: auto;
  gap: 40px;
  width: 100%;
  justify-items: center;
`;

const SlideSection = styled.div`
  display: grid;
  grid-template-rows: auto auto;
  gap: 10px;
`;

const SectionTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  text-align: left;
`;

const CardList = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 10px;
`;

const Arrow = styled.div`
  font-size: 24px;
  color: black;
  cursor: pointer;
  user-select: none;
`;

const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  overflow: hidden;
  height: 380px;
`;

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  width: 380px;
  padding: 10px;
  background-color: white;
  text-align: start;

  img {
    width: 100%;
    height: 270px;
    object-fit: cover;
    border-radius: 4px;
  }

  .info {
    margin-top: 10px;
    font-size: 14px;
    color: black;
  }

  .subinfo {
    font-size: 10px;
    color: gray;
  }

  .price {
    font-size: 16px;
    color: black;
    margin-top: 5px;
    font-weight: bold;
  }
`;

const Main = () => {
  const seasons = [
    {
      title: "봄: 봄의 따뜻한 감성이 묻어나는 워케이션",
      cards: [
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
      ],
    },
    {
      title: "여름: 시원한 공간에서의 워케이션",
      cards: [
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
      ],
    },
    {
      title: "가을: 단풍이 어우러진 공간",
      cards: [
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
      ],
    },
    {
      title: "겨울: 따뜻한 실내에서의 워케이션",
      cards: [
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
        {
          title: "성수동",
          price: "₩120,000 / 박",
          subtitle: "서울 / 서대문구 | 2 ~ 4명",
          image:
            "https://news.airbnb.com/wp-content/uploads/sites/4/2021/01/LakeviewLodgeFeatureImage.jpeg?fit=2500%2C1875",
        },
      ],
    },
  ];

  return (
    <MainContainer>
      {/* <LeftBlank /> */}
      <SlideContainer>
        {seasons.map((season, index) => (
          <SlideSection key={index}>
            <SectionTitle>{season.title}</SectionTitle>
            <CardList>
              <Arrow>{"<"}</Arrow>
              <Cards>
                {season.cards.map((card, idx) => (
                  <Card key={idx}>
                    <img src={card.image} alt={card.title} />
                    <div className="info">{card.title}</div>
                    <div className="subinfo">{card.subtitle}</div>
                    <div className="price">{card.price}</div>
                  </Card>
                ))}
              </Cards>
              <Arrow>{">"}</Arrow>
            </CardList>
          </SlideSection>
        ))}
      </SlideContainer>
      {/* <RightBlank /> */}
    </MainContainer>
  );
};

export default Main;
