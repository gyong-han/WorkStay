import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import {
  getMemberNo,
  getReservationInfo,
} from "../../components/service/roomService";
import { setStayReservationInfo } from "../../redux/roomSlice";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
  /* justify-items: center;
  align-items: center; */
  place-items: center;
`;

const MainText = styled.div`
  font-size: 3rem;
  font-family: "Pretendard-SemiBold";
  font-weight: 700;
  letter-spacing: 10px;
  margin-top: 150px;
  margin-bottom: 20px;
`;

const SubText = styled.div`
  font-size: 2.3rem;
  text-align: center;
`;

const LineDiv = styled.div`
  width: 1300px;
  border-bottom: 1px solid #d9d9d9;
  margin-top: 50px;
`;

const ReservationWrapper = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-top: 50px;
  width: 1300px;
`;

const InfoWrapper = styled.div`
  display: grid;
  grid-template-rows: auto;
`;

const UserInfoWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* justify-content: space-around; */
  place-items: center;
  width: 1300px;
  margin-top: 30px;
`;

const UserWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  /* justify-content: space-around; */
  place-items: center;
  /* text-align: center; */
  width: 1300px;
  margin-top: 15px;
`;

const Title = styled.div`
  font-weight: 600;
  font-size: 2rem;
`;

const SubTitle = styled.div`
  font-weight: 600;
  font-size: 1.5rem;
`;

const Img = styled.div`
  width: 400px;
  height: 250px;
  background-image: ${(props) => `url(${props.bgImage})`};
  background-size: cover;
  background-repeat: no-repeat;
`;

const Info = styled.div`
  font-size: 1.2rem;
`;

const Cost = styled.div`
  font-size: 1.5rem;
`;

const Info1 = styled.div`
  font-size: 1.2rem;
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr;
  margin-top: 50px;
`;

const Reservations = () => {
  // const [Info, setInfo] = useState({});
  const rd1 = localStorage.getItem("roomdata");
  const rData = JSON.parse(rd1);
  const dispatch = useDispatch();

  const rd = new FormData();
  const [memberInfo, setMemberInfo] = useState({});

  rd.append("roomNo", rData.roomNo);
  rd.append("roomName", rData.roomName);
  rd.append("stayNo", rData.stayNo);
  rd.append("stayName", rData.stayName);
  rd.append("adult", rData.adult);
  rd.append("child", rData.child);
  rd.append("baby", rData.baby);
  rd.append("request", rData.request);
  rd.append("useDay", rData.useDay);
  rd.append("checkIn", rData.checkIn);
  rd.append("checkOut", rData.checkOut);
  rd.append("filePath", rData.filePath);

  const price = rData.amount;
  const priceWon = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const roomVo = useSelector((state) => state.room);

  const RoomReservation = async () => {
    const insertData = await RoomReservation(rData);

    const getInfo = await getReservationInfo(rd);
    dispatch(setStayReservationInfo(getInfo));

    const getMemberInformation = await getMemberNo(rData.memberNo);
    setMemberInfo(getMemberInformation);
  };
  useEffect(() => {
    RoomReservation();
  }, []);

  const cleaned = memberInfo.phone.replace(/\D/g, "");
  const formattedPhoneNumber = cleaned.replace(
    /(\d{3})(\d{4})(\d{4})/,
    "$1-$2-$3"
  );

  return (
    <>
      <Wrapper>
        <MainText>RESERVATIONS</MainText>
        <SubText>감사합니다. 예약이 완료되었습니다.</SubText>
        <LineDiv />
        <ReservationWrapper>
          <InfoWrapper>
            <Title>{rData.stayName}</Title>
            <Info>{rData.useDay}</Info>
            <Info>
              {rData.roomName} / 성인 {rData.adult}명 / 아동 {rData.child}명 /
              유아 {rData.baby}명
            </Info>
            <Cost>₩{priceWon}</Cost>
            <Info>예약 확정({rData.payDay})</Info>
          </InfoWrapper>
          <Img bgImage={rData.filePath}></Img>
        </ReservationWrapper>
        <LineDiv />
        <UserInfoWrapper>
          <SubTitle>예약번호</SubTitle>
          <SubTitle>이름</SubTitle>
          <SubTitle>휴대전화번호</SubTitle>
          <SubTitle>이메일</SubTitle>
        </UserInfoWrapper>
        <UserWrapper>
          <Info1>{roomVo.reservationNo}</Info1>
          <Info1>{memberInfo.name}</Info1>
          <Info1>{formattedPhoneNumber}</Info1>
          <Info1>{memberInfo.email}</Info1>
        </UserWrapper>
        <LineDiv />
        <ButtonWrapper>
          <Btn b="none">예약상세보기</Btn>
          <div></div>
          <Btn bg="#fafafa" c="#202020">
            예약 취소
          </Btn>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

export default Reservations;
