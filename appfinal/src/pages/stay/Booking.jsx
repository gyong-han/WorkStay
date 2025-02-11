import React, { useState } from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa6";
import Btn from "../../components/Btn";
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  place-items: center;
  padding: 100px;
`;

const BookingText = styled.div`
  letter-spacing: 10px;
  font-size: 3rem;
  font-weight: 700;
`;

const Date = styled.div`
  font-size: 1.5rem;
  margin-top: 70px;
`;

const LineDiv = styled.div`
  border: 1px solid #d9d9d9;
  width: 1400px;
  margin-top: 20px;
`;

const ReservationText = styled.div`
  font-size: 2rem;
  font-weight: 500;
  margin-top: 40px;
`;

const TempLine = styled.div`
  border-bottom: 3px solid #202020;
  width: 1270px;
  text-align: center;
  margin-top: 20px;
`;

const ReservationLine = styled.div`
  border-bottom: 1px solid #d9d9d9;
  width: 1200px;
`;

const ReservationWrapper = styled.div`
  width: 1250px;
  padding: 30px;
  box-sizing: border-box;
`;

const ReservationDiv = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 500px 1fr;
  place-content: center;
  align-items: center;
  padding: 15px;
`;

const InfoText = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
`;
const Info = styled.span`
  font-size: 1.2rem;
`;

const Request = styled.textarea`
  width: 650px;
  height: 250px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  background-color: #fafafa;
  padding: 10px;
  font-family: "Pretendard-Regular";
  font-size: 1.2rem;
`;

const ChargeText = styled.div`
  display: grid;
  width: 650px;
  grid-template-columns: 1fr 1fr;
  font-size: 1.2rem;
  padding: 5px;
  & > span:nth-child(2) {
    text-align: end;
  }
`;

const ChargeDate = styled.div`
  display: grid;
  width: 640px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  color: #bbbbbb;
  padding: 5px;
  font-size: 1.1rem;
  font-weight: 200;
  & > span:nth-child(2) {
    text-align: end;
  }
`;

const ChargeLine = styled.div`
  border-bottom: 1px solid #202020;
  width: 680px;
`;

const RadioBtn = styled.input.attrs({ type: "radio" })`
  width: 20px;
  height: 20px;
  border: 1px solid #202020;
  background-color: #fafafa;
  border-color: #202020;
  font-size: 1.2rem;
  border-radius: 50%;
  outline: none;
  accent-color: #202020;
  cursor: pointer;
  margin-right: 10px;

  &:checked {
    background-color: #fafafa;
    border-color: #202020;
    accent-color: #202020;
  }
`;

const UserAgreeWrapper = styled.div`
  display: grid;
  align-items: center;
  width: 1000px;
`;

const UserAgree = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  text-align: center;
`;

const AllAgree = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 10px;
`;

const Agree = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  padding: 10px;
  cursor: pointer;
`;

const Agreement = styled.div`
  width: 100%;
  padding: 10px;
  /* margin-top: 20px; */
  background-color: red;
  border-radius: 5px;
`;

const CheckBtn = styled.input.attrs({ type: "checkbox" })`
  width: 25px;
  height: 25px;
  border: 1px solid #202020;
  background-color: #fafafa;
  accent-color: #202020;
  cursor: pointer;
  margin-right: 10px;
`;

const ProvisionDiv = styled.div`
  display: grid;
  grid-template-rows: auto;
  width: 1000px;
`;

const ProvisionSpan = styled.span`
  width: 1000px;
  text-align: center;
`;

const PaddingDiv = styled.div`
  padding: 30px;
`;

const Booking = () => {
  const termsData = [
    {
      id: 1,
      text: "(필수) 개인정보 제 3자 제공 동의",
      details: "개인정보를 제3자에게 제공하는 내용입니다. 감자는 맛있습니다.",
    },
    {
      id: 2,
      text: "(필수) 미성년자(청소년) 투숙 기준 동의",
      details: "미성년자의 숙박 기준과 동의 절차에 대한 내용입니다.",
    },
    {
      id: 3,
      text: "(필수) 환불 규정에 동의",
      details: "환불 가능 기간과 수수료에 대한 내용을 포함합니다.",
    },
  ];
  const [checkedItems, setCheckedItems] = useState([]);
  const [openDetails, setOpenDetails] = useState(null);

  // 전체 체크박스 클릭 시
  const handleAllCheck = (checked) => {
    if (checked) {
      setCheckedItems(termsData.map((item) => item.id));
    } else {
      setCheckedItems([]);
    }
  };

  // 개별 체크박스 클릭 시
  const handleSingleCheck = (checked, id) => {
    if (checked) {
      setCheckedItems((prev) => [...prev, id]);
    } else {
      setCheckedItems((prev) => prev.filter((item) => item !== id));
    }
  };

  // 상세보기 토글
  const toggleDetails = (id) => {
    setOpenDetails((prev) => (prev === id ? null : id));
  };

  // const navi = useNavigate();

  return (
    <Layout>
      <BookingText>BOOKING</BookingText>
      <Date>
        날짜를 선택해주세요.
        <FaAngleDown />
      </Date>
      <LineDiv />
      <ReservationText>Reservations</ReservationText>
      <TempLine />
      <ReservationWrapper>
        <ReservationDiv>
          <InfoText>예약 스테이</InfoText>
          <Info>온숲 / Room A1</Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>예약일</InfoText>
          <Info>2025-01-20 ~ 2025-01-23</Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>이름</InfoText>
          <Info>홍길동</Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>휴대전화</InfoText>
          <Info>010-1111-1111</Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>이메일</InfoText>
          <Info>gamza@naver.com</Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>인원</InfoText>
          <Info>온숲 / Room A1</Info>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>요청사항</InfoText>
          <Request
            placeholder="사전에 협의되지 않은 상업 사진 및 영상 촬영은 불가합니다.
상업적 용도의 촬영은 별도 대관료를 책정하여 운영하고 있습니다."
          />
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <div>
            <InfoText>요금상세</InfoText>
          </div>
          <div>
            <ChargeText>
              <span>객실요금</span>
              <span>₩180,000</span>
            </ChargeText>
            <ChargeDate>
              <span>2025-01-20</span>
              <span>₩180,000</span>
            </ChargeDate>
            <ChargeDate>
              <span>2025-01-20</span>
              <span>₩180,000</span>
            </ChargeDate>
            <ChargeLine />
          </div>
          <div></div>
          <ChargeText>
            <span></span>
            <span>₩180,000</span>
          </ChargeText>
        </ReservationDiv>
        <ReservationLine />
        <ReservationDiv>
          <InfoText>결제방법 선택</InfoText>
          <div>
            <RadioBtn checked name="payment" />
            <Info>결제 방식 선택</Info>
          </div>
        </ReservationDiv>
        <ReservationLine />
      </ReservationWrapper>
      <UserAgreeWrapper>
        <UserAgree>
          <span>사용자 약관 동의</span>
        </UserAgree>
        <AllAgree>
          <CheckBtn
            name="agreement"
            onChange={(e) => handleAllCheck(e.target.checked)}
            checked={checkedItems.length === termsData.length}
          />
          <span>사용자 전체 약관 동의</span>
        </AllAgree>
        {termsData.map((item) => (
          <Agree key={item.id}>
            <div>
              <CheckBtn
                onChange={(e) => handleSingleCheck(e.target.checked, item.id)}
                checked={checkedItems.includes(item.id)}
              />
            </div>
            <div>
              <label onClick={() => toggleDetails(item.id)}>{item.text}</label>
              {openDetails === item.id && <Agreement>{item.details}</Agreement>}
            </div>
          </Agree>
        ))}
      </UserAgreeWrapper>
      <PaddingDiv>
        <Btn w={"500px"}>결제하기</Btn>
      </PaddingDiv>
      <ProvisionDiv>
        <ProvisionSpan>
          (주) 워크스테이는 통신판매중개업자로서 통신판매의 당사자가 아니며
          상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게
          있습니다.
        </ProvisionSpan>
        <ProvisionSpan>
          예약 전 각 스테이의 이용규칙, 취소 및 환불 규정을 반드시 확인 하시기
          바랍니다.
        </ProvisionSpan>
      </ProvisionDiv>
    </Layout>
  );
};

export default Booking;
