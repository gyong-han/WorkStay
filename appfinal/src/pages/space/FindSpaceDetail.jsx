import styled from "styled-components";
import { BiMessageAltDetail } from "react-icons/bi";
import { RxShare2 } from "react-icons/rx";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import PictureSlide from "../../components/listcomponents/PictureSlide";
import PackageDisplay from "../../components/package/PackageDisplay";
import Map from "../../components/map/Map";
import Infomation from "../../components/Infomation";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CalendarTime from "../../components/FilterBar/CalendalTime";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoginMemberNo,
  setPackageType,
  setReservationDone,
  setSpaceVo,
} from "../../redux/spaceSlice";
import PackageReservationDone from "../../components/package/PackageReservationDone";
import { getBookmarkInfo } from "../../components/service/spaceServcie";
import ShareModal from "../../components/modal/ShareModal";
import { RiInstagramLine } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import Alert from "../../components/Alert";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../components/service/config";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;
const Layout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 120px 550px 100px 700px 450px 100px 549px 50px 650px;

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

    & > div:nth-child(2) {
      width: 100%;
      height: 100%;
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 80px 40px 1fr;
      background-color: #2b8c437b;

      color: #fafafa;
      & > div:nth-child(1),
      & > div:nth-child(2) {
        justify-content: center;
        align-items: center;
        display: flex;
      }
      & > div:nth-child(1) {
        font-size: 30px;
        font-weight: bold;
      }
      & > div:nth-child(3) {
        padding-top: 50px;
        padding-left: 100px;
        padding-right: 100px;
        text-align: center;
        font-size: 20px;
      }
    }
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
  & > div:nth-child(3) {
    color: #049dd9;
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

const FindSpaceDetail = () => {
  const [bookMark, setBookMark] = useState(false);
  const dispatch = useDispatch();
  const { x } = useParams();
  const spaceVo = useSelector((state) => state.space);
  const [packageNo, setPackageNo] = useState("");
  const [modalStatus, setModalStatus] = useState("");
  const token = localStorage.getItem("token");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);


  
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      // console.log("decodedToken: ", decodedToken.no);
      dispatch(setLoginMemberNo(decodedToken.no));
    } catch (error) {
      console.error("토큰 디코딩 실패:", error);
    }
  }
  //알림창
  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };
  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
  };

  //Gallery Modal 관련
  const openModal = () => {
    setModalStatus("flex");
  };
  const closeModal = () => {
    setModalStatus("");
  };

  const bookmarkdata = async () => {
    const dataObj = {
      memberNo: spaceVo.memberNo, //로그인 정보 가져오자
      spaceNo: x,
    };
    const data = await getBookmarkInfo(dataObj);
    const inData = JSON.parse(data);
    // console.log("첫번째로 가져온거 ~~~ ",inData);
    setBookMark(inData);
  };

  useEffect(() => {
    fetch(`${BASE_URL}/space/detail`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(x),
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("디테일 데이터 시점  ::: ",data);
        dispatch(setSpaceVo(data));
      });
    bookmarkdata();
  }, [x, dispatch]);

  useEffect(() => {
    fetch(`${BASE_URL}/space/isAvailable`, {
      method: "POST",
      body: x,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("DATA111::",data);
        dispatch(setReservationDone(data));
      });
  }, [x]);

  useEffect(() => {
    const fd = new FormData();
    fd.append("no", x);
    fd.append("useDay", spaceVo.reservationDate);
    if (!spaceVo.reservationDate) {
      return;
    }
    fetch(`${BASE_URL}/space/packagedone`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        // console.log("DATA222::",data);
        setPackageNo(data.packageNo);
      });
  }, [x, spaceVo]);

  /////////////////////////////////////////////////////클릭함수
  const bookmarkInsert = () => {
    const dataObj = {
      memberNo: spaceVo.memberNo, //로그인 정보 가져오자
      spaceNo: spaceVo.no,
    };
    if (bookMark === true) {
      setBookMark(false);
      fetch(`${BASE_URL}/space/bookmarkdel`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataObj),
      })
        .then((resp) => resp.text())
        .then((data) => {
          setIsAlertOpen2(true);
          // console.log("삭제된데이터수:",data);
        });
    } else {
      setBookMark(true);
      fetch(`${BASE_URL}/space/bookmark`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(dataObj),
      })
        .then((resp) => resp.text())
        .then((data) => {
          // console.log(data);
          setIsAlertOpen(true);
        });
    }
  };

  const park = "4";
  let parking = "";
  if (park === "4") {
    parking = "스페이스 건물 외부 전용 주차장에 주차 가능합니다";
  } else {
    parking = "스페이스 공간 주차불가능";
  }

  const cleaned = spaceVo.phone.replace(/\D/g, "");
  const formattedPhoneNumber = cleaned.replace(
    /(\d{3})(\d{4})(\d{4})/,
    "$1-$2-$3"
  );
  const morningPrice = spaceVo.daytimePrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const nigthPrice = spaceVo.nightPrice
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    useEffect(() => {
      window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ShareModal closeModal={closeModal} modalStatus={modalStatus} no={x} />
      <Layout>
        <TitleDiv>
          <div>
            <h1>{spaceVo.name}</h1>
            <span>{spaceVo.address}</span>
          </div>
          <div></div>
          {token ? (
            <>
              <InconTitleDiv>
                <div>
                  <BiMessageAltDetail />
                </div>
                <div onClick={openModal}>
                  <RxShare2 />
                </div>

                <div onClick={bookmarkInsert}>
                  {!bookMark ? <IoBookmarkOutline /> : <IoBookmark />}
                </div>
                <div>메세지</div>
                <div onClick={openModal}>공유하기</div>
                <div onClick={bookmarkInsert}>북마크</div>
              </InconTitleDiv>
            </>
          ) : (
            <div></div>
          )}
        </TitleDiv>
        <div>
          <PictureSlide
            w={"1500"}
            h={"500"}
            imgPaths={spaceVo.attachmentFilePaths}
            main={true}
          ></PictureSlide>
        </div>
        <div>
          <div></div>
          <DateDiv>
            {!spaceVo.reservationDate ? (
              <CalendarTime type={"text"}>날짜를 입력해주세요.</CalendarTime>
            ) : (
              <CalendarTime type={"text"}>
                {spaceVo.reservationDate}
              </CalendarTime>
            )}
          </DateDiv>
          <div></div>
        </div>
        <PackageDiv>
          <div>PACKAGE</div>
          <div>
            {packageNo != "2" ? (
              <PackageDisplay
                img={
                  "https://vrthumb.clipartkorea.co.kr/2023/04/12/pc0040625240.jpg"
                }
                titleHandler={() => {
                  dispatch(setPackageType({ packageType: "낮 패키지" }));
                }}
                title={"낮 패키지"}
                standard={"6"}
                max={"12"}
                price={spaceVo.daytimePrice}
                url={`/findspace/spacebooking/${x}`}
                imgPaths={spaceVo.attachmentFilePaths}
              ></PackageDisplay>
            ) : (
              <PackageReservationDone
                img={
                  "https://cdn.ownerclan.com/qiMNa49EgFO3USYFFjlxWueE4HXsJLKBIV9e1~D4~Y4/marketize/auto/as/v1.jpg"
                }
              ></PackageReservationDone>
            )}
          </div>
          <div></div>
          <div>
            {packageNo != "1" ? (
              <PackageDisplay
                img={
                  "https://png.pngtree.com/background/20230424/original/pngtree-meeting-inside-a-conference-room-with-business-people-picture-image_2457183.jpg"
                }
                titleHandler={() => {
                  dispatch(setPackageType({ packageType: "밤 패키지" }));
                }}
                title={"밤 패키지"}
                standard={"4"}
                max={"8"}
                price={spaceVo.nightPrice}
                url={`/findspace/spacebooking/${x}`}
                imgPaths={spaceVo.attachmentFilePaths}
              ></PackageDisplay>
            ) : (
              <PackageReservationDone
                img={
                  "https://cdn.ownerclan.com/qiMNa49EgFO3USYFFjlxWueE4HXsJLKBIV9e1~D4~Y4/marketize/auto/as/v1.jpg"
                }
              ></PackageReservationDone>
            )}
          </div>
          <div></div>
        </PackageDiv>
        <div>
          <div></div>
          <div>
            <div>{spaceVo.tagline}</div>
            <div>{spaceVo.name}</div>
            <div>{spaceVo.introduction}</div>
          </div>
          <div></div>
        </div>
        <div>
          <div></div>
          <div>
            {spaceVo.name}의 위치는 [{spaceVo.address}]입니다.
            <br></br>
            {parking}
          </div>
          <div></div>
        </div>
        <div>
          <InfoDiv>
            <div>HELLO.</div>
            <div>{spaceVo.name}</div>
            <div>({spaceVo.address})</div>
            <div>{formattedPhoneNumber}</div>
            <div>{spaceVo.sns}</div>
            <InfomationDiv>
              <RiInstagramLine />
              <SiNaver />
            </InfomationDiv>
          </InfoDiv>
          <Map address={spaceVo.address} name={spaceVo.name}>
            space
          </Map>
        </div>
        <div></div>
        <Infomation
          morning={morningPrice}
          night={nigthPrice}
          standard={spaceVo.standardGuest}
          max={spaceVo.maxGuest}
        ></Infomation>
        {isAlertOpen && (
          <Backdrop>
            <Alert
              title="북마크"
              titleColor="#049dd9"
              message="북마크가 등록되었습니다."
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
              message="북마크가 해지되었습니다."
              buttonText="확인"
              buttonColor="#049dd9"
              onClose={handleAlertClose2}
            />
          </Backdrop>
        )}
      </Layout>
    </>
  );
};

export default FindSpaceDetail;
