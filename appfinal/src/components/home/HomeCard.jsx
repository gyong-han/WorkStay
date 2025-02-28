import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
width: 100%;
height: 100%;
display: grid;
grid-template-columns:100px 1fr 30px 1fr 30px 1fr;
grid-template-rows: 1fr;
`;
const BlackDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 250px 130px;

  width: 400px;
  height: 380px;

  &>div:nth-child(2){

  }

`;

const ImgDiv = styled.img`
    width: 100%;
    height: 250px;
    background-position: center; 
  `;

const SecondDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1.5fr 1fr;
`;

const HomeCard = ({imgPath}) => {
  console.log("넘어온 이미지페스으으으으ㅡㅇ : ",imgPath[0].filePath);
  
 
  return (
    <Layout>
      {imgPath.map((vo)=>{
        return <> 
         <div></div>
         <BlackDiv>
          <ImgDiv src={vo}></ImgDiv>
          <SecondDiv>
            <div>제목</div>
            <div>북마크존</div>
            <div>지역/인원</div>
            <div>4</div>
            <div>가격</div>
            <div>6</div>
          </SecondDiv>
         </BlackDiv>
         </>
      })}
      
   
 
    </Layout>
  );
};

export default HomeCard;