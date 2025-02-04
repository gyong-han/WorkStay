import React, { useState } from "react";
import styled from "styled-components";
import Calendar from "./Calendal";
import Area from "./Area";
import People from "./People";

const LayoutDiv = styled.div`
  width: 100%;
  height: 60px;
  display: grid;
  grid-template-columns: 1fr 600px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  justify-items: center;

  & > div > button {
    width: 166px;
    height: 60px;
    border: none;
    background-color: white;
  }
`;
const BtnDiv = styled.div`
  width: 600px;
  height: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;
  border: 1px solid #049dd9;
  border-radius: 10px;
  color: #202020;
  background-color: white;

  & > div {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div > button {
    width: 85%;
    height: 100%;
    background-color: white;
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div:nth-child(2) {
    border-left: 1px solid #049dd9;
    border-right: 1px solid #049dd9;
  }
  &>div>button>img{
    
    width: 25px;
    height: 25px;
  }
`;

const Display = () => {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  const openModal1 = () => setIsModal1Open(true);
  const closeModal1 = () => setIsModal1Open(false);

  const openModal2 = () => setIsModal2Open(true);
  const closeModal2 = () => setIsModal2Open(false);

  return (
    <>
      <div>123</div>
      <LayoutDiv>
        <div></div>
        <BtnDiv>
          <div>
            <button onClick={openModal1}><img src="https://png.pngtree.com/png-vector/20190507/ourmid/pngtree-vector-location-icon-png-image_1024759.jpg"alt="" />장소</button>
            <Area isOpen={isModal1Open} onClose={closeModal1} />
          </div>
          <div>
            <Calendar></Calendar>
          </div>
          
          <div>
            <button onClick={openModal2}><img src="https://media.istockphoto.com/id/1332100919/ko/%EB%B2%A1%ED%84%B0/%EB%82%A8%EC%9E%90-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EA%B2%80%EC%9D%80-%EC%83%89-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%82%AC%EB%9E%8C-%EA%B8%B0%ED%98%B8.jpg?s=612x612&w=0&k=20&c=1Yl9GjV828rS9b9v6OZOMaFq_TNAEkhWXU_246cLNrg=" alt="" />인원</button>
            <People isOpen={isModal2Open} onClose={closeModal2} />
          </div>
        </BtnDiv>
        <div></div>
      </LayoutDiv>
    </>
  );
};

export default Display;