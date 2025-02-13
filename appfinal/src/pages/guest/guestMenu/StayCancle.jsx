import React, { useState } from "react";
import styled from "styled-components";
import HostBtn from "../../host/hostComponents/HostBtn";

const MainDiv = styled.div`
  display: flex;
  place-content: center;
  width: 800px;
  padding-bottom: 30px;
`;

const MainSpanDiv = styled.div`
  font-weight: 700;
  font-size: 25px;
  color: #f20530;
`;

const TitleDiv = styled.div`
  border-left: 5px solid #202020;
  padding-left: 40px;
  padding-top: 10px;
  font-size: 2rem;
  color: #202020;
  font-weight: 700;
  width: 800px;
  height: 50px;
  display: flex;
`;

const QnaDiv = styled.div`
  color: #202020;
  font-weight: 700;
  font-size: 1.2rem;
  letter-spacing: 2px;
  padding-top: 30px;
`;
const RadioDiv = styled.div`
  color: #202020;
  font-weight: 400;
  font-size: 1.2rem;
  letter-spacing: 2px;
  padding-top: 30px;
`;

const RadioInput = styled.input.attrs({ type: "radio" })`
  accent-color: #202020;
  width: 16px;
  height: 16px;
  cursor: pointer;
`;

const Textarea = styled.textarea`
  border: 1px solid #202020;
  border-radius: 10px;
  width: 800px;
  height: 200px;
  color: #202020;
  background-color: #fafafa;
  margin-left: 20px;
  display: ${(props) =>
    props.show ? "block" : "none"}; /* show가 true일 때만 표시 */

  &::placeholder {
    color: #bbbbbb;
    font-size: 1rem;
    font-weight: 400px;
    padding: 10px;
  }
`;

const BtnDiv = styled.div`
  display: grid;
  grid-template-columns: 0.1fr 0.1fr 0.1fr;
  padding-left: 100px;
  margin-bottom: 50px;
`;

const StayCancle = () => {
  const [showTextarea, setShowTextarea] = useState(false);

  const handleRadioChange = (event) => {
    if (event.target.value === "other") {
      setShowTextarea(true);
    } else {
      setShowTextarea(false);
    }
  };
  return (
    <>
      <MainDiv>
        <MainSpanDiv>예약 취소 요청</MainSpanDiv>
      </MainDiv>
      <TitleDiv>취소사유</TitleDiv>
      <QnaDiv>예약을 취소하려는 이유가 무엇인가요?</QnaDiv>
      <RadioDiv>
        <RadioInput
          type="radio"
          name="cancle"
          value="canceled"
          onChange={handleRadioChange}
        />{" "}
        여행이 취소되거나 미뤄졌어요.
      </RadioDiv>
      <RadioDiv>
        <RadioInput
          type="radio"
          name="cancle"
          value="stay"
          onChange={handleRadioChange}
        />{" "}
        예약 정보(숙소, 일정, 결제수단 등)를 변경하고 싶어요.
      </RadioDiv>
      <RadioDiv>
        <RadioInput
          type="radio"
          name="cancle"
          value="host"
          onChange={handleRadioChange}
        />{" "}
        호스트가 예약 취소를 원해요.
      </RadioDiv>
      <RadioDiv>
        <RadioInput
          type="radio"
          name="cancle"
          value="other"
          onChange={handleRadioChange}
        />{" "}
        기타 (직접 입력)
      </RadioDiv>
      <RadioDiv>
        <Textarea placeholder="취소 사유를 입력해주세요." show={showTextarea} />
      </RadioDiv>
      <BtnDiv>
        <div>
          <HostBtn
            width="250px"
            height="50px"
            font="20px"
            backColor="#049DD9"
            color="#FAFAFA"
            str="예약취소"
            top="100px"
          />
        </div>
        <div></div>
        <div>
          <HostBtn
            width="250px"
            height="50px"
            font="20px"
            backColor="#FAFAFA"
            color="#049DD9"
            str="이용 안내 및 환불 규정"
            top="100px"
          />
        </div>
      </BtnDiv>
    </>
  );
};

export default StayCancle;
