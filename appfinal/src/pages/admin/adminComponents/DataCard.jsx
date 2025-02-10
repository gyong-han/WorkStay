import React from "react";
import styled from "styled-components";

const DataDiv = styled.div`
  width: 710px;
  height: 270px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 320px 390px;
`;

const DataArea = styled.div`
  background-color: #202020;
  display: grid;
  grid-template-rows: 20px 40px 110px 35px 20px 20px 25px;
  color: white;
  padding-left: 20px;
  align-items: center;
`;

const TextDiv = styled.div`
  font-size: ${(props) => {
    return props.size;
  }};
  font-weight: ${(props) => {
    return props.weight;
  }};
`;

const ImgTag = styled.img`
  width: 390px;
  height: 270px;
`;

const DataCard = ({ title, address, phone, email, img }) => {
  return (
    <>
      <DataDiv>
        <DataArea>
          <div></div>
          <TextDiv size="30px" weight="500">
            {title}
          </TextDiv>
          <div></div>
          <TextDiv size="15px" weight="500">
            {address}
          </TextDiv>
          <TextDiv size="13px">{phone}</TextDiv>
          <TextDiv size="13px">{email}</TextDiv>
          <div></div>
        </DataArea>
        <ImgTag src={img} />
      </DataDiv>
    </>
  );
};

export default DataCard;
