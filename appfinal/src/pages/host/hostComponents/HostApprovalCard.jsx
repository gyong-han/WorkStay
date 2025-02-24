import React from "react";
import styled from "styled-components";

const DataDiv = styled.div`
  width: 850px;
  height: 300px;
  border: 1px solid black;
  display: grid;
  grid-template-columns: 400px 450px;
  margin-top: 50px;
  margin-left: 50px;
  margin-bottom: 30px;
  border: none;
  cursor: pointer;
`;

const DataArea = styled.div`
  background-color: transparent;
  display: grid;
  grid-template-rows: 40px 30px 20px 20px 145px 45px;
  color: black;
  align-items: center;
`;

const TextDiv = styled.div`
  font-size: ${(props) => {
    return props.size;
  }};
  font-weight: ${(props) => {
    return props.weight;
  }};
  margin-top: ${(props) => props.top};
`;

const ImgTag = styled.img`
  width: 450px;
  height: 300px;
`;

const PriceDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  & > div:nth-child(2) {
    text-align: right;
    padding-right: 60px;
  }
`;

//vo 받아와서 값 넣기
const HostApprovalCard = ({ status, vo, f }) => {
  return (
    <>
      <DataDiv
        onClick={() => {
          f(vo.no);
        }}
      >
        <DataArea>
          {/* vo에서 가져온 상태에 따라 생성 여부 결정(승인:생성X / 대기,반려 : 생성O) */}
          {status == 1 ? <></> : <TextDiv size="15px">{status}</TextDiv>}

          <TextDiv size="25px" weight="600" top="10px">
            {vo.name}
          </TextDiv>
          <TextDiv size="15px" top="20px">
            {vo.address}
          </TextDiv>
          <TextDiv size="15px" top="20px">
            {vo.enrollDate}
          </TextDiv>
        </DataArea>
        <ImgTag src={vo.filePath} />
      </DataDiv>
    </>
  );
};

export default HostApprovalCard;
