import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import PackageDetailCard from "../../components/package/PackageDetailCard";
import Btn from "../../components/Btn";
import CalendarTime from "../../components/FilterBar/CalendalTime";
import { useDispatch, useSelector } from "react-redux";
import Notification from "./stayComponent/noti/Notification";
import RoomDetailCard from "../room/roomComponent/RoomDetailCard";
import { getRoomDetail } from "../../components/service/roomService";
import { setRoomVo } from "../../redux/roomSlice";
import { setStayVo } from "../../redux/staySlice";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 60px 700px 150px 150px 150px 100px 1fr;

  & > div:nth-child(1) {
    display: flex;
    justify-content: center;
  }
`;

const DateDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
  border-bottom: 2px solid #d9d9d9;

  & > div:nth-child(1) {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }

  & > div:nth-child(1) > div:nth-child(1) {
    width: 500px;
    font-weight: 600;
    font-size: 30px;
  }
`;

const CalendarLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const ThirdDiv = styled.div`
  border-bottom: 2px solid #d9d9d9;
`;

const ContentLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  border-bottom: 2px solid #d9d9d9;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 24px;
`;

const IconLayoutDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 155px);
  justify-content: center;
  align-items: center;
`;

const FindStayBooking = () => {
  const { x } = useParams();
  const dispatch = useDispatch();
  const stayVo = useSelector((state) => state.stay);
  const roomVo = useSelector((state) => state.room);

  const StayBooking = async () => {
    const setRoomDetail = await getRoomDetail(x);
    dispatch(setRoomVo(setRoomDetail));
    dispatch(setStayVo(setRoomDetail));
  };

  useEffect(
    (x) => {
      StayBooking();
    },
    [x]
  );

  return (
    <Layout>
      <div>
        <h1>BOOKING</h1>
      </div>
      <DateDiv>
        <div>
          <div>{stayVo.name}</div>
          <CalendarLayout>
            <CalendarTime type={"text"}>
              날짜를 선택해주세요
              <MdOutlineKeyboardArrowDown />
            </CalendarTime>
          </CalendarLayout>
          <div>
            <Link to={"/findstay/booking/1"}>
              <Btn w={150} h={35} bg={"#049DD9"} size={"15px"}>
                예약하기
              </Btn>
            </Link>
          </div>
        </div>
      </DateDiv>
      <ThirdDiv>
        {/* <RoomDetailCard
          title={`${x}`}
          information={"ROOM INFORMATION"}
          imgPaths={stayVo.attachmentFilePaths}
        ></RoomDetailCard> */}
      </ThirdDiv>
      <ContentLayout>
        <TitleDiv>FEATURES</TitleDiv>
        <IconLayoutDiv>
          <div>와이파이</div>
          <div>모니터</div>
          <div>빔프로젝터</div>
        </IconLayoutDiv>
      </ContentLayout>
      <ContentLayout>
        <TitleDiv>AMENITIES</TitleDiv>
        <IconLayoutDiv>
          <div>빅테이블</div>
          <div>캡슐커피머신</div>
          <div>전기포트</div>
          <div>냉장고</div>
          <div>화이트보드</div>
          <div>스피커</div>
          <div>빔프로젝터</div>
          <div>전자레인지</div>
          <div>일회용 칫솔</div>
          <div>일회용 치약</div>
        </IconLayoutDiv>
      </ContentLayout>
      <ContentLayout>
        <TitleDiv>ADD-ON SERVICES</TitleDiv>
        <IconLayoutDiv>
          <div></div>
        </IconLayoutDiv>
      </ContentLayout>
      <div></div>
      {/* <Notification x={x} rooms={room} stay={stay} /> */}
    </Layout>
  );
};

export default FindStayBooking;
