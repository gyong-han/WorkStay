import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import { setReservationInfo } from "../../redux/spaceSlice";

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
  background-image: url(https://images.stayfolio.com/system/pictures/images/000/144/470/original/017d972b55f43f2bfd9cb3a91ec9641020e2f6f3.jpg?1663912019);
  background-size: cover;
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

const SpaceReservation = () => {
  // const [Info, setInfo] = useState({});
  const spaceVo = useSelector((state)=>state.space);

  const dispatch = useDispatch();
  const price = spaceVo.packageType === '낮 패키지'?spaceVo.daytimePrice :spaceVo.nightPrice;
  const priceWon = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const packageNo = spaceVo.packageType === '낮 패키지'?1:2;


  const fd = new FormData();
  fd.append("packageNo",packageNo);
  fd.append("spaceNo",spaceVo.no);
  fd.append("useDay",spaceVo.reservationDate);  

  useEffect(()=>{
    fetch(("http://127.0.0.1:8080/space/getTimeNow"),{
      method:"POST",
      body:fd,
    }).then((resp)=>resp.json())
    .then((data)=>{
      console.log(data);
      dispatch(setReservationInfo(data));
    })
  },[price,spaceVo])

  return (
    <>
      <Wrapper>
        <MainText>RESERVATIONS</MainText>
        <SubText>감사합니다. 예약이 완료되었습니다.</SubText>
        <LineDiv />
        <ReservationWrapper>
          <InfoWrapper>
            <Title>{spaceVo.name}</Title>
            <Info>{spaceVo.reservationDate}</Info>
            <Info>{spaceVo.packageType} / 성인 {spaceVo.adult}명 / 아동 {spaceVo.child}명 / 유아 {spaceVo.baby}명</Info>
            <Cost>₩{priceWon}</Cost>
            <Info>예약 확정({spaceVo.payDay})</Info>
          </InfoWrapper>
          <Img></Img>
        </ReservationWrapper>
        <LineDiv />
        <UserInfoWrapper>
          <SubTitle>예약번호</SubTitle>
          <SubTitle>이름</SubTitle>
          <SubTitle>휴대전화번호</SubTitle>
          <SubTitle>이메일</SubTitle>
        </UserInfoWrapper>
        <UserWrapper>
          <Info1>{spaceVo.reservationNo}</Info1>
          <Info1>이예은</Info1>
          <Info1>010-1234-5678</Info1>
          <Info1>gamza@gamil.com</Info1>
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

export default SpaceReservation;
