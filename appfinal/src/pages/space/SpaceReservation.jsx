import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import { setReservationInfo } from "../../redux/spaceSlice";
import { getInfomation, getMemberInfo, inputReservation } from "../../components/service/spaceServcie";
import { useNavigate } from "react-router-dom";
import KakaoMsg from "../../components/kakaopage/KakaoMsg";

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
  background-image: url(${(props)=>props.urls?props.urls:"https://images.stayfolio.com/system/pictures/images/000/144/470/original/017d972b55f43f2bfd9cb3a91ec9641020e2f6f3.jpg?1663912019"});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  `;

const Info = styled.div`
  font-size: 1.2rem;
`;

const Info2 = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
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

const KakaoBtnLayout = styled.div`
    display: grid;
    margin-left: 200px;
    grid-template-columns: 50px 1fr;
    grid-template-rows: 1fr;
    background-color: #FEE500;
    align-items: center;
    border:none;
    border-radius: 10px;
    width: 220px;
    height: 45px;

    &>div:nth-child(1)>img{
      width: 25px;
      height: 25px;
 
      object-fit: cover; 
    }
    &>div:nth-child(1){
      margin-left: 15px;
      margin-top: 5px;
    }
  `;

const SpaceReservation = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  const fd1 = localStorage.getItem("fd");
  const fdData = JSON.parse(fd1);  
  

  const fd = new FormData();
  const [memberInfo,setMemberInfo] = useState({});
  
  fd.append("packageNo",fdData.packageNo);
  fd.append("spaceNo",fdData.spaceNo);
  fd.append("useDay",fdData.useDay);  


  const dispatch = useDispatch();
  const price = fdData.amount;
  const priceWon = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const spaceVo = useSelector((state)=>state.space);

  const Reservation  = async ()=>{
    
    
    const insertData  = await inputReservation(fdData);
    
    const getInfo = await getInfomation(fd);
    dispatch(setReservationInfo(getInfo));

    const getMemberInformation = await getMemberInfo(fdData.memberNo);
    setMemberInfo(getMemberInformation);
    
  };
  useEffect(()=>{
    Reservation ();
  },[])

  const cleaned = memberInfo.phone?.replace(/\D/g, '') || ''; 
  const formattedPhoneNumber = cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
  const navi = useNavigate();
  const clickHandle = ()=>{
    navi(`/hostMenu/spaceReserv/spacedetail?reno=${spaceVo.reservationNo}`);
  }
  const clickHandler = ()=>{
    navi(`/hostMenu/spaceReserv/spacedetail/spacecancle?no=${fdData.memberNo}&reno=${spaceVo.reservationNo}`);
  }


  return (
    <>
      <Wrapper>
        <MainText>RESERVATIONS</MainText>
        <SubText>감사합니다. 예약이 완료되었습니다.</SubText>
        <LineDiv />
        <ReservationWrapper>
          <InfoWrapper>
            <Title>{fdData.name}</Title>
            <Info>{fdData.useDay}</Info>
            <Info>{fdData.packageNo===1?"낮 패키지":"밤 패키지"} / 성인 {fdData.adult}명 / 아동 {fdData.child}명 / 유아 {fdData.baby}명</Info>
            <Cost>₩{priceWon}</Cost>
            <Info2><div>예약 확정({spaceVo.payDay})</div><KakaoBtnLayout><div><img src="https://cdn-icons-png.flaticon.com/512/2111/2111466.png" alt="" /></div><KakaoMsg vo = {spaceVo}></KakaoMsg></KakaoBtnLayout></Info2>
          </InfoWrapper>
          <Img urls={fdData.filePath}></Img>
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
          <Info1>{memberInfo.name}</Info1>
          <Info1>{formattedPhoneNumber}</Info1>
          <Info1>{memberInfo.email}</Info1>
        </UserWrapper>
        <LineDiv />
        <ButtonWrapper>
          <Btn b="none" f={clickHandle}>예약상세보기</Btn>
          <div></div>
          <Btn bg="#fafafa" c="#202020" f={clickHandler}>
            예약 취소
          </Btn>
          <div></div>
      
        </ButtonWrapper>
      </Wrapper>
    </>
  );


};
export default SpaceReservation;
