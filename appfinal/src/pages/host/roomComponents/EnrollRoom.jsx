import React from "react";
import styled from "styled-components";

const RoomDiv = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: (9, 1fr);
`;

const EnrollHeader = styled.div`
  font-size: 25px;
  color: #2b8c44;
  font-weight: 600;
`;

const DataTitle = styled.div`
  font-size: 25px;
  font-weight: 300;
  margin-top: ${(props) => {
    return props.top;
  }};
`;

const DataInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  background-color: #fafafa;
  width: 800px;
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  line-height: 5;
  padding-left: 5px;
  margin-top: ${(props) => {
    return props.top;
  }};
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DataInput2 = styled.input`
  display: inline-block;
  border: none;
  border-bottom: 1px solid black;
  background-color: #fafafa;
  width: 250px;
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  line-height: 5;
  text-align: center;
  margin-top: ${(props) => {
    return props.top;
  }};
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Span = styled.span`
  font-size: 25px;
  margin-left: 20px;
  margin-right: 20px;
`;

const TextArea = styled.textarea`
  height: 150px;
  margin-top: 35px;
  border-radius: 5px;
  resize: none;
`;

const DataTitle2 = styled.div`
  color: red;
  font-size: 15px;
  font-weight: 300;
  margin-top: 10px;
  margin-left: 60px;
`;

const EnrollRoom = ({ no, formDataArr, setFormDataArr }) => {
  return (
    <>
      <RoomDiv>
        <EnrollHeader>독채 정보</EnrollHeader>
        <div></div>
        <DataTitle top="40px">독채 이름 *</DataTitle>
        <DataInput
          type="text"
          name="name"
          placeholder="독채 이름을 입력해주세요."
          value={formDataArr[no].name}
          onChange={(e) => {
            setFormDataArr((prev) => {
              prev[no][e.target.name] = e.target.value;
              return [...prev];
            });
          }}
          top="40px"
        />
        <DataTitle top="40px">독채 수용인원 *</DataTitle>
        <div>
          <DataInput2
            type="number"
            name="standard_guest"
            top="40px"
            placeholder="최소 수용인원"
            value={formDataArr[no].standard_guest}
            onChange={(e) => {
              setFormDataArr((prev) => {
                prev[no][e.target.name] = e.target.value;
                return [...prev];
              });
            }}
          />
          <Span>/</Span>
          <DataInput2
            type="number"
            name="max_guest"
            top="40px"
            placeholder="최대 수용인원"
            value={formDataArr[no].max_guest}
            onChange={(e) => {
              setFormDataArr((prev) => {
                prev[no][e.target.name] = e.target.value;
                return [...prev];
              });
            }}
          />
        </div>
        <DataTitle top="40px">독채 가격 *</DataTitle>
        <DataInput
          type="number"
          name="price"
          placeholder="독채 가격을 입력해주세요."
          top="40px"
          value={formDataArr[no].price}
          onChange={(e) => {
            setFormDataArr((prev) => {
              prev[no][e.target.name] = e.target.value;
              return [...prev];
            });
          }}
        />
        <DataTitle top="40px">독채 편의시설 *</DataTitle>
        <DataInput2
          type="number"
          name="features_no"
          top="40px"
          placeholder="라디오 버튼"
        />

        <DataTitle top="40px">독채 소개 *</DataTitle>
        <TextArea
          name="introduction"
          placeholder="독채의 구조, 컨셉, 스토리 등을 자유롭게 작성해 주세요. (최소 50자)"
          value={formDataArr[no].introduction}
          onChange={(e) => {
            setFormDataArr((prev) => {
              prev[no][e.target.name] = e.target.value;
              return [...prev];
            });
          }}
        />
        <DataTitle top="40px">독채 평면도 *</DataTitle>
        <DataInput2 type="file" name="space_floor_plan" top="40px" />
        <DataTitle top="40px">스페이스 대표사진 *</DataTitle>
        <DataInput2 type="file" name="thumbnail" top="40px" />
        <div>
          <DataTitle top="40px">스페이스 사진 첨부파일 *</DataTitle>
          <DataTitle2>*최소 3장 이상</DataTitle2>
        </div>
        <DataInput2 type="file" name="attachment" top="40px" />
      </RoomDiv>
    </>
  );
};

export default EnrollRoom;
