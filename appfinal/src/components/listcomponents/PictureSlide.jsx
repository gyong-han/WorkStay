// PictureSlide.jsx
import React, { useEffect, useState} from 'react';
import styled from 'styled-components';


const SlideContainer = styled.div`
  position: relative;
  width: ${(props) => props.w || "400"}px;
  height: ${(props) => props.h || "230"}px;
  overflow: hidden;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  transition: transform 0.3s ease-in-out;  /* 슬라이드 전환 애니메이션 추가 */
  transform: translateX(${(props) => -props.index * 100}%);  /* 인덱스에 따라 이동 */
`;

const SlideImage = styled.img`
  width: ${(props) => props.w || "400"}px;
  height: ${(props) => props.h || "230"}px;
  object-fit: fill;
  
  
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

const Xdiv = styled.div`
  width: 100%;
  height: 100%;
`;

const PictureSlide = ({w,h,imgPaths,main}) => {
  



  // 화면넘길때마다 가질 인덱스 구성
  const [slideIdx, setSlideIdx] = useState(0);

  // 화면 넘기면 인덱스에 1값 더해서 인덱스 1로 만든뒤 슬라이드 창으로 나눠서 마지막페이지 구하기
  const goToNextSlide = () => {
    setSlideIdx((props) => (props + 1) % imgPaths.length);
  };

  const goToPreviousSlide = () => {
    setSlideIdx(
      (props) => (props - 1 + imgPaths.length) % imgPaths.length
    );
    
  };
  
  
  useEffect(() => {
    if (!main) {
        return;
    }
    
    const interval = setInterval(() => {
        setSlideIdx((prev) => (prev + 1) % imgPaths.length);
    }, 5000);

    return () => clearInterval(interval);
}, [main, imgPaths.length]); 




  return (
    <SlideContainer w={w} h={h}>
      <Slide index={slideIdx}>
        {imgPaths.map((src, idx) => (
          <Xdiv key={idx}><SlideImage src={src} alt={`Slide ${idx + 1}`} w={w} h={h} /></Xdiv>
        ))}
      </Slide>
      <ArrowButton left onClick={goToPreviousSlide} >
        ❮
      </ArrowButton>
      <ArrowButton onClick={goToNextSlide} >❯</ArrowButton>
    </SlideContainer>
  );
};

export default PictureSlide;



