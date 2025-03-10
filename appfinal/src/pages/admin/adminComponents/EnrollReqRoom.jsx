import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

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
  background-color: #fafafa;
  width: 800px;
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  padding-left: 5px;
  margin-top: ${(props) => {
    return props.top;
  }};
`;

const DataInput2 = styled.input`
  display: inline-block;
  border: none;
  background-color: #fafafa;
  width: 130px;
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  margin-top: ${(props) => {
    return props.top;
  }};
  margin-left: ${(props) => {
    return props.left;
  }};
`;

const DataInput3 = styled.input`
  display: inline-block;
  border: none;
  background-color: #fafafa;
  margin-left: 10px;
  width: 80px;
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  text-align: center;
  margin-right: ${(props) => {
    return props.right;
  }};
  margin-top: ${(props) => {
    return props.top;
  }};
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
  }

  & > input:checked + label:after {
    opacity: 1;
  }
`;

const StyledImg = styled.img`
  margin-top: 40px;
  width: 100px;
  height: 100px;
  margin-right: 10px;
  transition: transform 0.3s ease; //화면전환 부드럽게 해줌
  cursor: pointer;
  &:hover {
    transform: scale(2);
  }
`;

const TextDiv = styled.div`
  margin-top: 40px;
  height: ${(props) => props.height};
  font-size: 20px;
  font-weight: 400;
  margin-right: ${(props) => props.right};
`;

const EnrollReqRoom = ({
  roomVo,
  featuresArr,
  roomFloorPlanArr,
  roomThumbNailArr,
  roomAttachArr,
  no,
}) => {
  const [pageNick, setPageNick] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const pageNick = decodedToken.pageNick;
      setPageNick(pageNick);
    }
  }, []);

  return (
    <>
      <RoomDiv>
        <EnrollHeader>독채 정보</EnrollHeader>
        <div></div>
        <DataTitle top="40px">독채 이름 *</DataTitle>
        <DataInput
          type="text"
          name="name"
          value={roomVo.name}
          top="40px"
          readOnly
        />

        <DataTitle top="40px">독채 수용인원 *</DataTitle>
        <div>
          <DataInput2
            type="text"
            name="standard_guest"
            top="40px"
            value={`기준 : ${roomVo.standardGuest}명`}
            readOnly
          />
          <Span>/</Span>
          <DataInput2
            type="text"
            name="max_guest"
            top="40px"
            left="15px"
            value={`최대 : ${roomVo.maxGuest}명`}
            readOnly
          />
        </div>
        <DataTitle top="40px">독채 가격 *</DataTitle>
        <DataInput
          type="text"
          name="price"
          top="40px"
          value={`${Number(roomVo.price).toLocaleString()}원`}
          readOnly
        />
        <DataTitle top="40px">독채 편의시설 *</DataTitle>
        <CheckBoxArea>
          <CheckDiv>
            <input
              type="checkbox"
              value="1"
              id={`checkbox1-${no}`}
              checked={featuresArr.includes("1")}
              readOnly
            />
            <label for={`checkbox1-${no}`} />
            <span>무료 주차</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="2"
              id={`checkbox2-${no}`}
              checked={featuresArr.includes("2")}
              readOnly
            />
            <label for={`checkbox2-${no}`} />
            <span>와이파이</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="3"
              id={`checkbox3-${no}`}
              checked={featuresArr.includes("3")}
              readOnly
            />
            <label for={`checkbox3-${no}`} />
            <span>회의실</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="4"
              id={`checkbox4-${no}`}
              checked={featuresArr.includes("4")}
              readOnly
            />
            <label for={`checkbox4-${no}`} />
            <span>PC/모니터</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="5"
              id={`checkbox5-${no}`}
              checked={featuresArr.includes("5")}
              readOnly
            />
            <label for={`checkbox5-${no}`} />
            <span>빔 프로젝터</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="6"
              id={`checkbox6-${no}`}
              checked={featuresArr.includes("6")}
              readOnly
            />
            <label for={`checkbox6-${no}`} />
            <span>개별 BBQ데크</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="7"
              id={`checkbox7-${no}`}
              checked={featuresArr.includes("7")}
              readOnly
            />
            <label for={`checkbox7-${no}`} />
            <span>음향/마이크</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="8"
              id={`checkbox8-${no}`}
              checked={featuresArr.includes("8")}
              readOnly
            />
            <label for={`checkbox8-${no}`} />
            <span>반려동물 동반가능</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="9"
              id={`checkbox9-${no}`}
              checked={featuresArr.includes("9")}
              readOnly
            />
            <label for={`checkbox9-${no}`} />
            <span>실내 스파</span>
          </CheckDiv>
          <CheckDiv>
            <input
              type="checkbox"
              value="10"
              id={`checkbox10-${no}`}
              checked={featuresArr.includes("10")}
              readOnly
            />
            <label for={`checkbox10-${no}`} />
            <span>야외 수영장</span>
          </CheckDiv>
        </CheckBoxArea>

        <DataTitle top="40px">독채 침대 *</DataTitle>
        <div>
          <Span2>싱글 사이즈 : </Span2>
          <DataInput3
            type="number"
            name="singleSize"
            top="40px"
            value={roomVo.singleSize}
            readOnly
          />
          <Span>/</Span>
          <Span2>더블 사이즈 : </Span2>
          <DataInput3
            type="number"
            name="doubleSize"
            top="40px"
            value={roomVo.doubleSize}
            readOnly
          />
          <Span>/</Span>
          <Span2>퀸 사이즈 : </Span2>
          <DataInput3
            type="number"
            name="queenSize"
            top="40px"
            value={roomVo.queenSize}
            readOnly
          />
        </div>

        <DataTitle top="40px">독채 소개 *</DataTitle>
        <TextDiv height="150px">{roomVo.introduction}</TextDiv>

        <DataTitle top="40px">독채 평면도 *</DataTitle>
        <div>
          <StyledImg src={roomFloorPlanArr.filePath} alt="평면도" />
        </div>

        <DataTitle top="40px">독채 대표사진 *</DataTitle>
        <div>
          <StyledImg src={roomThumbNailArr.filePath} alt="평면도" />
        </div>

        <div>
          <DataTitle top="40px">독채 사진 첨부파일 *</DataTitle>
          {pageNick === "ADMIN" ? (
            <></>
          ) : (
            <DataTitle2>*최소 3장 이상</DataTitle2>
          )}
        </div>
        <div>
          {roomAttachArr.map((data, idx) => {
            return <StyledImg key={idx} src={data.filePath} alt="첨부파일" />;
          })}
        </div>
      </RoomDiv>
    </>
  );
};

export default EnrollReqRoom;
