import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DataCard from "./adminComponents/DataCard";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto 200px;
`;

const StatusSpan = styled.span`
  font-size: 20px;
  margin-left: ${(props) => {
    return props.left;
  }};
  font-weight: 500;
`;

const HostDataArea = styled.div`
  display: grid;
  grid-template-rows: 300px auto auto;
  margin-top: 10px;
`;

const HostArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`;

const HostTitle = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const HostData = styled.div`
  font-size: 20px;
  border-bottom: 1px solid black;
  width: 500px;
  margin-top: 10px;
  padding-left: 3px;
`;

const DataArea = styled.div`
  margin-top: ${(props) => props.top};
  display: grid;
  grid-template-rows: 40px 300px;
`;

const DataTitle = styled.div`
  border-left: 3px solid black;
  font-size: 25px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-weight: 600;
`;
const DataContent = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 50px 50px 710px 20px 100px;
`;

const ArrowDiv = styled.div`
  height: 50px;
  display: flex;
  font-size: 50px;
  place-self: center;
  justify-content: ${(props) => {
    return props.justify;
  }};
  cursor: pointer;
`;

const HostDetail = () => {
  // const { stayNum } = useParams();
  //useEffect로 호스트 정보 가져오기(stayNum)

  const [idx, setIdx] = useState(0);
  const [data, setData] = useState({});

  const ImgArr = [];
  ImgArr.push({
    title: "title1",
    address: "address1",
    phone: "phone1",
    email: "email1",
    img: "https://www.lotteresort.com/static/upload/images/20221219/738ac016-8071-4d0d-9f9c-ba5ecfa93e95.jpg",
  });
  ImgArr.push({
    title: "title2",
    address: "address2",
    phone: "phone2",
    email: "email2",
    img: "https://www.shilla.net/images/contents/accmo/ACCMO_INDEX/R0000000ZZO4_KR.jpg",
  });
  ImgArr.push({
    title: "title3",
    address: "address3",
    phone: "phone3",
    email: "email3",
    img: "https://blog.kakaocdn.net/dn/bfXTeM/btsCWJe6xzm/NcKu41KnIx0nNqrf8YAEO1/img.jpg",
  });

  const nextData = () => {
    setIdx((prev) => (prev === ImgArr.length - 1 ? 0 : prev + 1));
  };

  const preData = () => {
    setIdx((prev) => (prev === 0 ? ImgArr.length - 1 : prev - 1));
  };

  useEffect(() => {
    setData(ImgArr[idx]);
  }, [idx]);

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="320px">호스트 상세조회</StatusSpan>
        </div>
        <HostDataArea>
          <HostArea>
            <div>
              <HostTitle>이메일</HostTitle>
              <HostData>eeueel@naver.com</HostData>
            </div>
            <div>
              <HostTitle>이름</HostTitle>
              <HostData>abcdefg123@kh.co.kr</HostData>
            </div>
            <div>
              <HostTitle>전화번호</HostTitle>
              <HostData>01011112222</HostData>
            </div>
          </HostArea>
          <DataArea top="40px">
            <DataTitle>숙소</DataTitle>
            <DataContent>
              {/* 클릭시 datacard에 넣어주는 배열 바꾸기 */}
              <ArrowDiv justify="right" onClick={preData}>
                ❮
              </ArrowDiv>
              <div></div>
              {/* fetch로 가져온 값 넣어주기 */}
              <DataCard
                title={data.title}
                address={data.address}
                phone={data.phone}
                email={data.email}
                img={data.img}
              />
              <div></div>
              <ArrowDiv justify="left" onClick={nextData}>
                ❯
              </ArrowDiv>
            </DataContent>
          </DataArea>
          <DataArea top="80px">
            <DataTitle>공간</DataTitle>
            <DataContent>
              <ArrowDiv justify="center">❮</ArrowDiv>
              <div></div>
              <DataCard
                title={data.title}
                address={data.address}
                phone={data.phone}
                email={data.email}
                img={data.img}
              />
              <div></div>
              <ArrowDiv justify="left">❯</ArrowDiv>
            </DataContent>
          </DataArea>
        </HostDataArea>
      </MainDiv>
    </>
  );
};

export default HostDetail;
