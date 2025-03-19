import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Btn from "../../components/Btn";
import { useDispatch, useSelector } from "react-redux";
import {
  getMemberNo,
  getReservationInfo,
  roomReservation,
} from "../../components/service/roomService";
import { setStayReservationInfo } from "../../redux/roomSlice";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import KakaoMsgStay from "../../components/kakaopage/KakaoMsgStay";

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
  grid-template-rows: 50px 30px 30px 40px 30px 0.5fr 1fr;
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

const KakaoWrapper = styled.div`
  display: grid;
  grid-row: 7;
  justify-content: start;
  align-items: start;
`;

const KakaoBtnLayout = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr;
  grid-template-rows: 1fr;
  background-color: #fee500;
  align-items: center;
  border: none;
  border-radius: 10px;
  width: 180px;
  height: 45px;

  & > div:nth-child(1) > img {
    width: 25px;
    height: 25px;

    object-fit: cover;
  }
  & > div:nth-child(1) {
    margin-left: 15px;
    margin-top: 5px;
  }
`;

const Reservations = () => {
  // const [Info, setInfo] = useState({});
  const rd1 = localStorage.getItem("roomdata");
  const rData = JSON.parse(rd1);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const rd = new FormData();
  const [memberInfo, setMemberInfo] = useState({});

  rd.append("roomNo", rData.roomNo);
  rd.append("roomName", rData.roomName);
  rd.append("stayNo", rData.stayNo);
  rd.append("stayName", rData.stayName);
  rd.append("memberNo", rData.memberNo);
  rd.append("adult", rData.adult);
  rd.append("child", rData.child);
  rd.append("baby", rData.baby);
  rd.append("request", rData.request);
  rd.append("checkIn", rData.checkIn);
  rd.append("checkOut", rData.checkOut);
  rd.append("filePath", rData.filePath);

  const price = rData.amount;
  const priceWon = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const roomVo = useSelector((state) => state.room);

  const RoomReservation = async () => {
    try {
      const insertData = await roomReservation(rData);
      const getInfo = await getReservationInfo(rd);
      // console.log("GET INFO :: ", getInfo);

      dispatch(setStayReservationInfo(getInfo));

      const getMemberInformation = await getMemberNo(rData.memberNo);

      setMemberInfo(getMemberInformation);
    } catch (error) {
      console.error("Error fetching member information: ", error);
    }
  };

  useEffect(() => {
    RoomReservation();
  }, []);

  const cleaned = memberInfo.phone ? memberInfo.phone.replace(/\D/g, "") : "";
  const formattedPhoneNumber = cleaned
    ? cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
    : "번호 없음";

  return (
    <>
      <Wrapper>
        <MainText>RESERVATIONS</MainText>
        <SubText>감사합니다. 예약이 완료되었습니다.</SubText>
        <LineDiv />
        <ReservationWrapper>
          <InfoWrapper>
            <Title>{rData.stayName}</Title>
            <Info>
              {rData.checkIn}~{rData.checkOut}
            </Info>
            <Info>
              {rData.name} / 성인 {rData.adult}명 / 아동 {rData.child}명 / 유아{" "}
              {rData.baby}명
            </Info>
            <Cost>₩{priceWon}</Cost>
            <Info>예약 확정({roomVo.payDay})</Info>
            <div></div>
            <KakaoWrapper>
              <KakaoBtnLayout>
                <div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111466.png"
                    alt=""
                  />
                </div>
                <div>
                  <KakaoMsgStay vo={roomVo}></KakaoMsgStay>
                </div>
              </KakaoBtnLayout>
            </KakaoWrapper>
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
          <div
            onClick={() => {
              navigate(`/hostMenu/staydetail?reno=${roomVo.reservationNo}`);
            }}
          >
            <Btn b="none">예약상세보기</Btn>
          </div>
          <div></div>
          <div
            onClick={() => {
              navigate(
                `/hostMenu/staydetail/staycancle?no=1&reno=${roomVo.reservationNo}`
              );
            }}
          >
            <Btn bg="#fafafa" c="#202020">
              예약 취소
            </Btn>
          </div>
        </ButtonWrapper>
      </Wrapper>
    </>
  );
};

export default Reservations;
