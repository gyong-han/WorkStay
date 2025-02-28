import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HomeMainSlide from "./home/HomeMainSlide";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 40px 380px 50px 40px 380px 50px 40px 380px 50px 40px 380px;
`;

const TitleDiv = styled.div`
  display: flex;
  align-items: end;
  font-size: 30px;
  font-weight: 600;
`;

const SubTitleDiv=styled.div`
  color: 202020;
  display: flex;
  align-items: start;
  font-size: 20px;
`;

const Main = () => {
  const[homeSpringSlide,setHomeSpringSlide]=useState([]);
  const[homeSummerSlide,setHomeSummerSlide]=useState([]);
  const[homeAutumnSlide,setHomeAutumnSlide]=useState([]);
  const[homeWinterSlide,setHomeWinterSlide]=useState([]);
  
  useEffect(()=>{
    fetch("http://localhost:8080/home/spring")
    .then((resp)=>resp.json())
    .then((data)=>{
      console.log("봄 숙소 :: ",data);
      const fileArr = data.map((vo)=>vo.filePath);
    
      if(fileArr.length <=1){
        setHomeSpringSlide((prev)=>{return[...prev,data[0].filePath]});
      }else{
        setHomeSpringSlide(fileArr);
      }
      
    })
  },[])
  useEffect(()=>{
    fetch("http://localhost:8080/home/summer")
    .then((resp)=>resp.json())
    .then((data)=>{
      console.log("여름 숙소 :: ",data);
      const fileArr = data.map((vo)=>vo.filePath);
    
      if(fileArr.length <=1){
        setHomeSummerSlide((prev)=>{return[...prev,data[0].filePath]});
      }else{
        setHomeSummerSlide(fileArr);
      }
 
      
      })
  },[])
  useEffect(()=>{
    fetch("http://localhost:8080/home/autumn")
    .then((resp)=>resp.json())
    .then((data)=>{
      console.log("가을 숙소 :: ",data);
      const fileArr = data.map((vo)=>vo.filePath);
   
      if(fileArr.length <=1){
        setHomeAutumnSlide((prev)=>{return[...prev,data[0].filePath]});
      }else{
        setHomeAutumnSlide(fileArr);
      }

    })
  },[])
  useEffect(()=>{
    fetch("http://localhost:8080/home/winter")
    .then((resp)=>resp.json())
    .then((data)=>{
      console.log("겨울 숙소 :: ",data);
      const fileArr = data.map((vo)=>vo.filePath);
      if(!fileArr.length === 0){
        if(fileArr.length <=1){
          setHomeWinterSlide((prev)=>{return[...prev,data[0].filePath]});
        }else{
          setHomeWinterSlide(fileArr);
        }
      }
      
    })
  },[])
  return (
    <Layout>
          <TitleDiv>봄 : 꽃이 만개한 자연 속에서 영감을 얻는 워케이션</TitleDiv>
          <SubTitleDiv>“계절의 시작, 자연이 전하는 에너지를 느끼며 새로운 아이디어를 발견하세요.”</SubTitleDiv>
          <div>
          <HomeMainSlide w={1700} h={380} main={false}imgPaths={homeSpringSlide}></HomeMainSlide>
          </div>
          <TitleDiv>여름 : 물가에서 시원하게 몰입할 수 있는 리프레시 워케이션</TitleDiv>
          <SubTitleDiv>“계절의 시작, 자연이 전하는 에너지를 느끼며 새로운 아이디어를 발견하세요.”</SubTitleDiv>
          <div>
         <HomeMainSlide w={1700} h={380} main={false}imgPaths={homeSummerSlide}></HomeMainSlide>
          </div>
          <TitleDiv>가을 : 단풍 아래에서 사색과 창의력을 키우는 워케이션</TitleDiv>
          <SubTitleDiv>“계절의 시작, 자연이 전하는 에너지를 느끼며 새로운 아이디어를 발견하세요.”</SubTitleDiv>
          <div>
          <HomeMainSlide w={1700} h={380} main={false}imgPaths={homeAutumnSlide}></HomeMainSlide>
          </div>
          <TitleDiv>겨울 : 따뜻한 공간에서 집중과 휴식을 동시에 하는 워케이션</TitleDiv>
          <SubTitleDiv>“계절의 시작, 자연이 전하는 에너지를 느끼며 새로운 아이디어를 발견하세요.”</SubTitleDiv>
          <div>
          <HomeMainSlide w={1700} h={380} main={false}imgPaths={homeWinterSlide}></HomeMainSlide>
          </div>
    </Layout>
  );
};

export default Main;
