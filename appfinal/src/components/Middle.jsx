import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeSlide from "./home/HomeSlide";
import { BASE_URL } from "./service/config";

const MiddleContainer = styled.section`
  display: grid;
  justify-items: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Middle = () => {
  const [homeSlide, setHomeSlide] = useState([]);
  useEffect(() => {
    fetch(`${BASE_URL}/home/besthit`)
      .then((resp) => resp.json())
      .then((data) => {
        const fileArr = data.map((vo) => vo.filePath);
        if (fileArr.length <= 1) {
          setHomeSlide(data[0].filePath);
        } else {
          setHomeSlide(fileArr);
        }
      });
  }, []);

  return (
    <MiddleContainer>
      <HomeSlide w={1905} h={400} imgPaths={homeSlide} main={true}></HomeSlide>
    </MiddleContainer>
  );
};

export default Middle;
