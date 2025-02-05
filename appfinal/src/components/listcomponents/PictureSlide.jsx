// PictureSlide.jsx
import React, { useEffect, useState} from 'react';
import styled from 'styled-components';


const SlideContainer = styled.div`
  position: relative;
  width: ${(props)=>{return props.w || "400"}}px;
  height: ${(props)=>{return props.h || "230"}}px;
  overflow: hidden;
  
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
`;

const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  ${(props) => (props.left ? 'left: 10px' : 'right: 10px')};
  transform: translateY(-50%);
  font-size: 30px;
  background-color: rgba(0, 0, 0, 0);
  color: #FAFAFA;
  border: none;
  padding: 10px;
  cursor: pointer;
  z-index: 1;
`;

const PictureSlide = ({w,h,img1,img2,img3,img4,main}) => {
  const[isPlaying,setIsPlaying] = useState(false);
  


// 슬라이드 이미지 배열
const slideImages = [
  img1,
  img2,
  img3,
  img4,
];
  // 화면넘길때마다 가질 인덱스 구성
  const [slideIdx, setSlideIdx] = useState(0);

  // 화면 넘기면 인덱스에 1값 더해서 인덱스 1로 만든뒤 슬라이드 창으로 나눠서 마지막페이지 구하기
  const goToNextSlide = () => {
    setSlideIdx((props) => (props + 1) % slideImages.length);
  };

  const goToPreviousSlide = () => {
    setSlideIdx(
      (props) => (props - 1 + slideImages.length) % slideImages.length
    );
    
  };
  
  
  useEffect(() => {
    
    if(!main){
      return;
    }
    if(main){
      const interval = setInterval(() => {
        setSlideIdx((prev) => (prev + 1) % slideImages.length);
        //5초마다 
      }, 5000);
      return () => clearInterval(interval);
    }
    
    
  }, []);




  return (
    <SlideContainer w={w} h={h}>
      <Slide>
        <SlideImage src={slideImages[slideIdx]} alt={`Slide ${slideIdx + 1}`} />
      </Slide>
      <ArrowButton left onClick={goToPreviousSlide} >
        ❮
      </ArrowButton>
      <ArrowButton onClick={goToNextSlide} >❯</ArrowButton>
    </SlideContainer>
  );
};

export default PictureSlide;



