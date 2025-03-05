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
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 10px;
  letter-spacing: 1px;
`;

const ImgTag = styled.img`
  width: 390px;
  height: 270px;
`;

const formatPhoneNumber = (phone) => {
  phone = String(phone);
  if (phone.length > 10) {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  } else if (phone.length > 9) {
    return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
  } else {
    return phone.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
  }
};

const DataCard = ({ title, address, phone, sns, img, click }) => {
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
          <TextDiv size="13px">{formatPhoneNumber(phone)}</TextDiv>
          <TextDiv size="13px">{sns}</TextDiv>
          <div></div>
        </DataArea>
        <ImgTag src={img} />
      </DataDiv>
    </>
  );
};

export default DataCard;
