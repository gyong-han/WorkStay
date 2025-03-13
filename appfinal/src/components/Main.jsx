import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeMainSlide from "./home/HomeMainSlide";
import { BASE_URL } from "./service/config";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 60px 60px 380px 60px 60px 380px 60px 60px 380px 60px 60px 380px;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  font-size: 25px;
  font-weight: 600;
  color: #202020;
  width: 90%;
  margin-left: 10px;
  margin-top: 30px;
`;

const SubTitleDiv = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  font-size: 18px;
  color: #202020;
  width: 90%;
  margin-left: 10px;
  margin-bottom: 20px;
`;

const Main = () => {
  const [homeSpringVo, setHomeSpringVo] = useState([]);
  const [homeSummerVo, setHomeSummerVo] = useState([]);
  const [homeAutumnVo, setHomeAutumnVo] = useState([]);
  const [homeWinterVo, setHomeWinterVo] = useState([]);

  useEffect(() => {
    fetch(`${BASE_URL}/home/spring`)
      .then((resp) => resp.json())
      .then((data) => {
        if (!data) {
          return;
        }
        const fileArr = data.map((vo) => vo);

        if (fileArr.length <= 1) {
          setHomeSpringVo(data);
        } else {
          setHomeSpringVo(fileArr);
        }
      });
  }, []);
  useEffect(() => {
    fetch(`${BASE_URL}/home/summer`)
      .then((resp) => resp.json())
      .then((data) => {
        if (!data) {
          return;
        }
        const fileArr = data.map((vo) => vo);
        if (fileArr.length <= 1) {
          setHomeSummerVo(data);
        } else {
          setHomeSummerVo(fileArr);
        }
      });
  }, []);
  useEffect(() => {
    fetch(`${BASE_URL}/home/autumn`)
      .then((resp) => resp.json())
      .then((data) => {
        if (!data) {
          return;
        }
        const fileArr = data.map((vo) => vo);

        if (fileArr.length <= 1) {
          setHomeAutumnVo(data);
        } else {
          setHomeAutumnVo(fileArr);
        }
      });
  }, []);
  useEffect(() => {
    fetch(`${BASE_URL}/home/winter`)
      .then((resp) => resp.json())
      .then((data) => {
        if (!data) {
          return;
        }
        const fileArr = data.map((vo) => vo);

        if (fileArr.length <= 1) {
          setHomeWinterVo(data);
        } else {
          setHomeWinterVo(fileArr);
        }
      });
  }, []);
  return (
    <Layout>
      <TitleDiv>봄 : 꽃이 만개한 자연 속에서 영감을 얻는 워케이션</TitleDiv>
      <SubTitleDiv>
        ❛ 봄의 시작, 자연이 전하는 에너지를 느끼며 새로운 아이디어를 발견하세요.
        ❜
      </SubTitleDiv>
      <div>
        <HomeMainSlide
          w={1700}
          h={380}
          main={false}
          vo={homeSpringVo}
        ></HomeMainSlide>
      </div>
      <TitleDiv>
        여름 : 물가에서 시원하게 몰입할 수 있는 리프레시 워케이션
      </TitleDiv>
      <SubTitleDiv>
        ❛ 여름의 시작, 자연이 전하는 에너지를 느끼며 새로운 아이디어를
        발견하세요. ❜
      </SubTitleDiv>
      <div>
        <HomeMainSlide
          w={1700}
          h={380}
          main={false}
          vo={homeSummerVo}
        ></HomeMainSlide>
      </div>
      <TitleDiv>가을 : 단풍 아래에서 사색과 창의력을 키우는 워케이션</TitleDiv>
      <SubTitleDiv>
        ❛ 가을의 시작, 자연이 전하는 에너지를 느끼며 새로운 아이디어를
        발견하세요. ❜
      </SubTitleDiv>
      <div>
        <HomeMainSlide
          w={1700}
          h={380}
          main={false}
          vo={homeAutumnVo}
        ></HomeMainSlide>
      </div>
      <TitleDiv>
        겨울 : 따뜻한 공간에서 집중과 휴식을 동시에 하는 워케이션
      </TitleDiv>
      <SubTitleDiv>
        ❛ 겨울의 시작, 자연이 전하는 에너지를 느끼며 새로운 아이디어를
        발견하세요. ❜
      </SubTitleDiv>
      <div>
        <HomeMainSlide
          w={1700}
          h={380}
          main={false}
          vo={homeWinterVo}
        ></HomeMainSlide>
      </div>
    </Layout>
  );
};

export default Main;
