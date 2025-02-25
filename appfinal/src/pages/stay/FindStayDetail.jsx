import styled from "styled-components";
import { BiMessageAltDetail } from "react-icons/bi";
import { RxShare2 } from "react-icons/rx";
import PictureSlide from "../../components/listcomponents/PictureSlide";
import Map from "../../components/map/Map";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "../../components/FilterBar/Calendal";
import { useDispatch, useSelector } from "react-redux";
import { setStayData, setStayVo } from "../../redux/staySlice";
import { setRoomData, setRoomVo } from "../../redux/roomSlice";
import { getStayDetail } from "../../components/service/stayService";
import { getRoomListAll } from "../../components/service/roomService";
import Notification from "./stayComponent/noti/Notification";
import RoomSlider from "../room/roomComponent/RoomSlider";
import BookmarkIcon from "../../components/bookmark/BookmarkIcon";
import CalendarDate from "./stayComponent/CalendarDate";
import { FaAngleDown } from "react-icons/fa6";

const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 120px 550px 100px 700px 450px 100px 549px 50px 1fr;

  & > div:nth-child(3) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1500px 1fr;
    grid-template-rows: 1fr;

    font-size: 18px;
    font-weight: 400;
  }
  & > div:nth-child(5) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1500px 1fr;
    grid-template-rows: 450px;
  }

  & > div:nth-child(6) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 700px 1fr;
    grid-row: 1fr;

    & > div:nth-child(2) {
      display: flex;
      align-items: end;
      justify-content: center;
      text-align: center;
      font-size: 20px;
    }
  }
  & > div:nth-child(7) {
    width: 1500px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const TitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 275px 1fr 250px;
  grid-template-rows: 1fr;
  & > div:nth-child(1) {
    width: 800px;
  }
  & > div:nth-child(1) > span {
    font-size: 18px;
  }
`;
const InconTitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 3fr 1fr;

  & > div:nth-child(1),
  & > div:nth-child(2),
  & > div:nth-child(3) {
    display: flex;
    align-items: end;
    justify-content: center;
    font-size: 35px;
  }
  & > div:nth-child(4),
  & > div:nth-child(5),
  & > div:nth-child(6) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const DateDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: end;
  border-bottom: 2px solid #d9d9d9;
`;

const PackageDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 450px 50px 450px 200px;
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;

  & > div:nth-child(1) {
    width: 100%;
    height: 100%;
    margin-top: 240px;
    font-size: 40px;
    font-weight: 600;
  }
`;

const IntroduceWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 50px 30px 1fr;
  place-items: center center;
  background-color: #2b8c437b;
  color: #fafafa;
  padding: 30px;
  box-sizing: border-box;

  & > div:nth-child(1) {
    padding: 10px;
    font-size: 30px;
  }
  & > div:nth-child(2) {
    padding: 10px;
    font-size: 20px;
  }
`;

const MapDiv = styled.div`
  display: grid;
  width: 100%;
  place-items: center;
  margin-left: 60px;
`;

const PictureWrapper = styled.div`
  display: grid;
  place-items: center center;
`;

const FindStayDetail = () => {
  const [result, setResult] = useState([]);
  const { x } = useParams();
  const stayVo = useSelector((state) => state.stay);
  const roomVoList = useSelector((state) => state.room.rooms);
  const roomVo = useSelector((state) => state.room);
  const dispatch = useDispatch();

  const StayDetail = async () => {
    const stayDetail = await getStayDetail(x);
    const roomListData = await getRoomListAll(x);

    dispatch(setStayVo(stayDetail));
    dispatch(setRoomVo(roomListData));
    dispatch(setStayData(stayDetail));
    dispatch(setRoomData(roomListData));
  };

  useEffect(
    (x) => {
      StayDetail();
    },
    [x]
  );

  // useEffect(() => {
  //   const url = "http://localhost:8080/stay/detail";
  //   const option = {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(x),
  //   };
  //   fetch(url, option)
  //     .then((resp) => resp.json())
  //     .then((data) => {
  //       // console.log("data :: ", data);
  //       dispatch(setStayVo(data));
  //       dispatch(setRoomVo(data));
  //     });
  // }, [x, dispatch]);

  const park = "4";
  let parking = "";
  if (park === "4") {
    parking = "스테이 건물 전용 주차장에 주차 가능합니다";
  } else {
    parking = "스페이스 공간 주차불가능";
  }

  const navi = () => {
    console.log("hello");
  };

  return (
    <>
      <Layout>
        <TitleDiv>
          <div>
            <h1>{stayVo.name}</h1>
            <span>{stayVo.address}</span>
          </div>
          <div></div>
          <InconTitleDiv>
            <div>
              <BiMessageAltDetail />
            </div>
            <div>
              <RxShare2 />
            </div>
            <BookmarkIcon />
            <div>메세지</div>
            <div>공유하기</div>
            <div>북마크</div>
          </InconTitleDiv>
        </TitleDiv>
        <PictureWrapper>
          <PictureSlide
            w={"1500"}
            h={"500"}
            imgPaths={stayVo.attachmentFilePaths}
            main={true}
          ></PictureSlide>
        </PictureWrapper>
        <div>
          <div></div>
          <DateDiv>
            {!stayVo.reservationDate ? (
              <CalendarDate type={"text"}>날짜를 입력해주세요.</CalendarDate>
            ) : (
              <CalendarDate type={"text"}>
                {stayVo.reservationDate}
                <FaAngleDown />
              </CalendarDate>
            )}
          </DateDiv>
          <div></div>
        </div>
        <PackageDiv>
          <div>ROOM</div>
          <div>
            <RoomSlider rooms={roomVoList} />
          </div>
        </PackageDiv>
        <div>
          <div></div>
          <IntroduceWrapper>
            <div>{stayVo.tagline}</div>
            <div>{stayVo.name}</div>
            <div>{stayVo.introduction}</div>
          </IntroduceWrapper>
          <div></div>
        </div>
        <div>
          <div></div>
          <div>
            {stayVo.name}의 위치는 [{stayVo.address}]입니다.
            <br></br>
            {parking}
          </div>
          <div></div>
        </div>
        <MapDiv>
          <Map address={stayVo.address} name={stayVo.name}>
            {" "}
            stay
          </Map>
        </MapDiv>
        <div></div>
        <Notification x={x} rooms={roomVoList} stay={stayVo}></Notification>
      </Layout>
    </>
  );
};

export default FindStayDetail;
