import styled from "styled-components";
import { BiMessageAltDetail } from "react-icons/bi";
import { RxShare2 } from "react-icons/rx";
import PictureSlide from "../../components/listcomponents/PictureSlide";
import Map from "../../components/map/Map";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Calendar from "../../components/FilterBar/Calendal";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddress,
  setStayData,
  setStayLoginMemberNo,
  setStayVo,
} from "../../redux/staySlice";
import {
  setRoomData,
  setRoomVo,
  setStayReservationDate,
  setStayReservationDone,
} from "../../redux/roomSlice";
import {
  delBookmark,
  getBookmark,
  getStayDetail,
  setBookmarkInsert,
} from "../../components/service/stayService";
import {
  getRoomListAll,
  isAvailable,
} from "../../components/service/roomService";
import Notification from "./stayComponent/noti/Notification";
import RoomSlider from "../room/roomComponent/RoomSlider";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import Alert from "../../components/Alert";
import { RiInstagramLine } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import ShareModal from "../../components/modal/ShareModal";

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

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const InfoDiv = styled.div`
  width: 270px;
  height: 270px;
  background-color: white;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 25px 25px 1fr;
  z-index: 999;
  margin-right: 950px;
  margin-bottom: 200px;
  position: absolute;
  justify-items: center;

  & > div {
    width: 80%;
    height: 90%;
    display: flex;
    align-items: center;
  }
  & > div:nth-child(1) {
    padding-top: 10px;
    font-size: 25px;
    font-weight: 600;
  }
  & > div:nth-child(2) {
    font-size: 25px;
  }
  & > div:nth-child(3),
  & > div:nth-child(4),
  & > div:nth-child(5) {
    display: flex;
    align-items: end;
    color: #999;
  }
`;

const InfomationDiv = styled.div`
  width: 100%;
  height: 100%;
  gap: 20px;
  & > svg {
    color: #999;
  }
  & > svg:hover {
    color: black;
  }
  & > svg:nth-child(1) {
    width: 20px;
    height: 20px;
  }
`;

const FindStayDetail = () => {
  const [bookMark, setBookMark] = useState(false);
  const [no, setNo] = useState();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const [isAlertOpen3, setIsAlertOpen3] = useState(false);
  const [modalStatus, setModalStatus] = useState("");
  const [result, setResult] = useState([]);
  const { x } = useParams();
  const stayVo = useSelector((state) => state.stay);
  const roomVoList = useSelector((state) => state.room.rooms);
  const roomVo = useSelector((state) => state.room);
  const reservationDate = useSelector((state) => state.room.reservationDate);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const StayDetail = async () => {
    const stayDetail = await getStayDetail(x);
    const roomListData = await getRoomListAll(x);

    dispatch(setStayVo(stayDetail));
    dispatch(setRoomVo(roomListData));
    dispatch(setStayData(stayDetail));
    dispatch(setRoomData(roomListData));
    // dispatch(setAddress(stayDetail));
  };

  const navi = useNavigate();

  let y = "";

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        // dispatch(setStayLoginMemberNo(decodedToken.no));
        y = decodedToken.no;
        setNo(y);
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, [bookMark]);

  const bookmarkData = async () => {
    const dataObj = { memberNo: y, stayNo: x };
    const data = await getBookmark(dataObj);

    if (data == "true") {
      setBookMark(true);
    } else {
      setBookMark(false);
    }
  };

  const available = async () => {
    const checkAvailable = await isAvailable(x);
    dispatch(setStayReservationDone(checkAvailable));
  };

  const bookmarkInsert = () => {
    const dataObj = {
      memberNo: no,
      stayNo: stayVo.no,
    };

    const token = localStorage.getItem("token");

    if (!token) {
      setIsAlertOpen3(true);
    }

    if (bookMark == true) {
      setBookMark(false);
      delBookmark(dataObj);
      setIsAlertOpen(true);
    } else {
      setBookMark(true);
      setBookmarkInsert(dataObj);
      setIsAlertOpen2(true);
    }
  };

  // 북마크 알림창
  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navi(`/findstay/detail/${x}`);
  };

  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
    navi(`/findstay/detail/${x}`);
  };

  // 로그인으로 보내는 알림
  const handleAlertClose3 = () => {
    setIsAlertOpen3(false);
    navi(`/login`);
  };

  // share Modal
  const openModal = () => {
    setModalStatus("flex");
  };
  const closeModal = () => {
    setModalStatus("");
  };

  const cleaned = stayVo.phone ? stayVo.phone.replace(/\D/g, "") : "";
  const formattedPhoneNumber = cleaned
    ? cleaned.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")
    : "번호 없음";

  useEffect(
    (x) => {
      StayDetail();
      available();
    },
    [x]
  );

  useEffect(() => {
    bookmarkData();
  }, []);

  const handleDateChange = (selectedDate) => {
    if (
      !reservationDate ||
      reservationDate[0] !== selectedDate[0] ||
      reservationDate[1] !== selectedDate[1]
    ) {
      // console.log("📌 변경된 날짜:", selectedDate);
      dispatch(setStayReservationDate(selectedDate)); // Redux 저장
    }
  };

  const park = "4";
  let parking = "";
  if (park === "4") {
    parking = "스테이 건물 전용 주차장에 주차 가능합니다";
  } else {
    parking = "스테이 공간 주차불가능";
  }

  return (
    <>
      <ShareModal
        type="stay"
        closeModal={closeModal}
        modalStatus={modalStatus}
        no={x}
      />
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
            <div onClick={openModal}>
              <RxShare2 />
            </div>
            <div onClick={bookmarkInsert}>
              {!bookMark ? (
                <IoBookmarkOutline color="#049dd9" />
              ) : (
                <IoBookmark color="#049dd9" />
              )}
            </div>
            <div>메세지</div>
            <div onClick={openModal}>공유하기</div>
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
            <Calendar type="text" setDateRange={handleDateChange}>
              <span>
                {reservationDate[0] && reservationDate[1]
                  ? `${reservationDate[0]} ~ ${reservationDate[1]}`
                  : "날짜를 선택해주세요."}
              </span>
            </Calendar>
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
        <div>
          <InfoDiv>
            <div>HELLO.</div>
            <div>{stayVo.name}</div>
            <div>({stayVo.address})</div>
            <div>{formattedPhoneNumber}</div>
            <div>{stayVo.sns}</div>
            <InfomationDiv>
              <RiInstagramLine />
              <SiNaver />
            </InfomationDiv>
          </InfoDiv>
          <MapDiv>
            <Map address={stayVo.address} name={stayVo.name}></Map>
          </MapDiv>
        </div>
        <div></div>
        <Notification x={x} rooms={roomVoList} stay={stayVo}></Notification>
        {isAlertOpen && (
          <Backdrop>
            <Alert
              title="북마크"
              titleColor="#049dd9"
              message="북마크가 해제되었습니다."
              buttonText="확인"
              buttonColor="#049dd9"
              onClose={handleAlertClose}
            />
          </Backdrop>
        )}
        {isAlertOpen2 && (
          <Backdrop>
            <Alert
              title="북마크"
              titleColor="#049dd9"
              message="북마크가 등록되었습니다."
              buttonText="확인"
              buttonColor="#049dd9"
              onClose={handleAlertClose2}
            />
          </Backdrop>
        )}
        {isAlertOpen3 && (
          <Backdrop>
            <Alert
              title="로그인"
              titleColor="#049dd9"
              message="로그인 후 이용해주세요."
              buttonText="확인"
              buttonColor="#049dd9"
              onClose={handleAlertClose3}
            />
          </Backdrop>
        )}
      </Layout>
    </>
  );
};

export default FindStayDetail;
