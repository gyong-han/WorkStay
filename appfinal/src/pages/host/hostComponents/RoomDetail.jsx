import React from "react";
import styled from "styled-components";
import AttachmentUpload from "./AttachmentUpload";

const RoomDiv = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: (10, 1fr);
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

const DataInput3 = styled.input`
  display: inline-block;
  border: none;
  border-bottom: 1px solid black;
  background-color: #fafafa;
  margin-left: 10px;
  width: ${(props) => {
    return props.width;
  }};
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  line-height: 5;
  text-align: center;
  margin-right: ${(props) => {
    return props.right;
  }};
  margin-top: ${(props) => {
    return props.top;
  }};
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const Span = styled.span`
  font-size: 25px;
  margin-left: 20px;
  margin-right: 20px;
`;

const Span2 = styled.span`
  font-size: 20px;
  margin-top: 10px;
`;

const TextArea = styled.textarea`
  height: 150px;
  margin-top: 35px;
  border-radius: 5px;
  resize: none;
  font-family: "Pretendard-Regular";
  font-size: 1.2rem;
`;

const DataTitle2 = styled.div`
  color: red;
  font-size: 15px;
  font-weight: 300;
  margin-top: 10px;
  margin-left: 60px;
`;

const CheckBoxArea = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  margin-top: 40px;
`;

const CheckDiv = styled.div`
  margin-top: 10px;
  display: flex; /* 수정: 수평 정렬을 위해 flexbox 추가 */
  align-items: center; /* 수정: 체크박스와 텍스트를 세로로 정렬 */

  & > input {
    visibility: hidden;
  }

  & > label {
    position: relative;
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 10px;
    background: #fcfff4;
    border-radius: 4px;
    box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);

    &:after {
      content: "";
      width: 9px;
      height: 5px;
      position: absolute;
      top: 2px; /* 수정: 체크 아이콘 위치 조정 */
      left: 2px;
      border: 3px solid #333;
      border-top: none;
      border-right: none;
      background: transparent;
      opacity: 0;
      transform: rotate(-45deg);
    }

    &:hover:after {
      opacity: 0.5;
    }
  }

  & > input:checked + label:after {
    opacity: 1;
  }
`;

const RoomDetail = ({
  no,
  formDataArr,
  setFormDataArr,
  featuresArr,
  setFeaturesArr,
  fileData,
  setFileData,
}) => {
  const handleCheckbox = (value, no) => {
    setFeaturesArr((prev) => {
      const updatedArray = [...prev]; // 기존 배열 복사
      updatedArray[no] = updatedArray[no] ? [...updatedArray[no]] : []; // 기존 값 유지
      if (updatedArray[no].includes(value)) {
        updatedArray[no] = updatedArray[no].filter((item) => item !== value); // 체크 해제
      } else {
        updatedArray[no].push(value); // 체크 추가
      }
      return updatedArray;
    });
  };
  return (
    <>
      <RoomDiv>
        <EnrollHeader>독채 정보</EnrollHeader>
        <div></div>
        <DataTitle top="40px">독채 이름 *</DataTitle>
        <DataInput
          type="text"
          name="name"
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
          <Span>기준 : </Span>
          <DataInput3
            width="60px"
            type="number"
            name="standardGuest"
            top="40px"
            value={formDataArr[no].standardGuest}
            onChange={(e) => {
              setFormDataArr((prev) => {
                prev[no][e.target.name] = e.target.value;
                return [...prev];
              });
            }}
          />
          <Span>/</Span>
          <Span>최대 : </Span>
          <DataInput3
            width="60px"
            type="number"
            name="maxGuest"
            top="40px"
            value={formDataArr[no].maxGuest}
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
        <CheckBoxArea>
          <CheckDiv>
            <input
              type="checkbox"
              value="1"
              id={`checkbox1-${no}`}
              onChange={() => handleCheckbox("1", no)}
              checked={featuresArr[no]?.includes("1")}
            />
            <label for={`checkbox1-${no}`} />
            <span>무료 주차</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="2"
              id={`checkbox2-${no}`}
              onChange={() => handleCheckbox("2", no)}
              checked={featuresArr[no]?.includes("2")}
            />
            <label for={`checkbox2-${no}`} />
            <span>와이파이</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="3"
              id={`checkbox3-${no}`}
              onChange={() => handleCheckbox("3", no)}
              checked={featuresArr[no]?.includes("3")}
            />
            <label for={`checkbox3-${no}`} />
            <span>회의실</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="4"
              id={`checkbox4-${no}`}
              onChange={() => handleCheckbox("4", no)}
              checked={featuresArr[no]?.includes("4")}
            />
            <label for={`checkbox4-${no}`} />
            <span>PC/모니터</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="5"
              id={`checkbox5-${no}`}
              onChange={() => handleCheckbox("5", no)}
              checked={featuresArr[no]?.includes("5")}
            />
            <label for={`checkbox5-${no}`} />
            <span>빔 프로젝터</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="6"
              id={`checkbox6-${no}`}
              onChange={() => handleCheckbox("6", no)}
              checked={featuresArr[no]?.includes("6")}
            />
            <label for={`checkbox6-${no}`} />
            <span>개별 BBQ데크</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="7"
              id={`checkbox7-${no}`}
              onChange={() => handleCheckbox("7", no)}
              checked={featuresArr[no]?.includes("7")}
            />
            <label for={`checkbox7-${no}`} />
            <span>음향/마이크</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="8"
              id={`checkbox8-${no}`}
              onChange={() => handleCheckbox("8", no)}
              checked={featuresArr[no]?.includes("8")}
            />
            <label for={`checkbox8-${no}`} />
            <span>반려동물 동반가능</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="9"
              id={`checkbox9-${no}`}
              onChange={() => handleCheckbox("9", no)}
              checked={featuresArr[no]?.includes("9")}
            />
            <label for={`checkbox9-${no}`} />
            <span>실내 스파</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="10"
              id={`checkbox10-${no}`}
              onChange={() => handleCheckbox("10", no)}
              checked={featuresArr[no]?.includes("10")}
            />
            <label for={`checkbox10-${no}`} />
            <span>야외 수영장</span>
          </CheckDiv>
        </CheckBoxArea>

        <DataTitle top="40px">독채 침대 *</DataTitle>
        <div>
          <Span2>싱글 사이즈 : </Span2>
          <DataInput3
            width="80px"
            type="number"
            name="singleSize"
            top="40px"
            min="0"
            value={formDataArr[no].singleSize}
            onChange={(e) => {
              setFormDataArr((prev) => {
                prev[no][e.target.name] = e.target.value;
                return [...prev];
              });
            }}
          />
          <Span>/</Span>
          <Span2>더블 사이즈 : </Span2>
          <DataInput3
            width="80px"
            type="number"
            name="doubleSize"
            top="40px"
            min="0"
            value={formDataArr[no].doubleSize}
            onChange={(e) => {
              setFormDataArr((prev) => {
                prev[no][e.target.name] = e.target.value;
                return [...prev];
              });
            }}
          />
          <Span>/</Span>
          <Span2>퀸 사이즈 : </Span2>
          <DataInput3
            width="80px"
            type="number"
            name="queenSize"
            top="40px"
            min="0"
            value={formDataArr[no].queenSize}
            onChange={(e) => {
              setFormDataArr((prev) => {
                prev[no][e.target.name] = e.target.value;
                return [...prev];
              });
            }}
          />
        </div>

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
        <div>
          <AttachmentUpload
            fileData={fileData}
            setFileData={setFileData}
            name="roomFloorPlan"
            func="false"
            no={no}
            isDisabled="true"
            color="gray"
          />
        </div>

        <DataTitle top="40px">독채 대표사진 *</DataTitle>
        <div>
          <AttachmentUpload
            fileData={fileData}
            setFileData={setFileData}
            name="thumbnail"
            func="false"
            no={no}
          />
        </div>
        <div>
          <DataTitle top="40px">독채 사진 첨부파일 *</DataTitle>
        </div>
        <div>
          <AttachmentUpload
            fileData={fileData}
            setFileData={setFileData}
            name="attachment"
            isMultiple="true"
            func="false"
            no={no}
          />
        </div>
      </RoomDiv>
    </>
  );
};

export default RoomDetail;
