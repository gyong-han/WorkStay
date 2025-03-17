import PictureSlide from "./PictureSlide";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import Alert from "../Alert";
import { BASE_URL } from "../service/config";

const Layout = styled.div`
  width: 616px;
  height: 235px;
  display: grid;
  grid-template-columns: 210px 406px;
  grid-template-rows: 1fr;
`;
const InerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 25px 1fr 1fr 10px 1fr 1fr;
`;
const TitleArea = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
  grid-template-rows: 1fr;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 25px;
  font-weight: bold;
`;
const AreaDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 400;
`;
const PeopleDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  font-weight: 400;
`;
const MorningPackagePriceDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  display: flex;
  align-items: end;
  letter-spacing: 1px;
`;
const NightPackagePriceDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  margin-top: 3px;
  letter-spacing: 1px;
`;

const ReservationDiv = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 5px;
  font-size: 18px;
  text-decoration: underline solid #202020;
  margin-top: 17px;
`;
const BookMarkDiv = styled.div`
  margin-top: 5px;
  width: 30px;
  height: 30px;
  color: #049dd9;
  & > svg {
    width: 25px;
    height: 25px;
    margin-top: 6px;
  }
`;

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
const ListCard = (props) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const [bookMark, setBookMark] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let userData = "";
  if (token) {
    userData = jwtDecode(token);
  }

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };
  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
  };

  const dataObjByGet = {
    memberNo: userData.no,
    spaceNo: props.no,
  };
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(`${BASE_URL}/space/getbookmarkInfo`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(dataObjByGet),
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data == "true") {
          setBookMark(true);
        } else {
          setBookMark(false);
        }
      });
  }, [bookMark]);

  //클릭함수
  const ClickHandler = () => {
    if (!token) {
      return;
    }
    const dataObj = {
      memberNo: userData.no,
      spaceNo: props.no,
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
          setIsAlertOpen(true);
          // console.log(data);
        });
    }
  };

  const clickHandler = () => {
    navigate(`/${props.url}/detail/${props.no}`);
  };

  const morningPrice = props.morning
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const nightPrice = props.night
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Layout no={props.no}>
      <InerDiv onClick={clickHandler}>
        <TitleArea>
          <TitleDiv>{props.title}</TitleDiv>
          <BookMarkDiv
            onClick={(e) => {
              e.stopPropagation();
              ClickHandler();
            }}
          >
            {!bookMark ? <IoBookmarkOutline /> : <IoBookmark />}
          </BookMarkDiv>
        </TitleArea>
        <div></div>
        <AreaDiv>{props.address}</AreaDiv>
        <PeopleDiv>
          기준 {props.min}명 (최대 {props.max}명)
        </PeopleDiv>
        <MorningPackagePriceDiv>낮패키지₩{morningPrice}</MorningPackagePriceDiv>
        <NightPackagePriceDiv>밤패키지₩{nightPrice}</NightPackagePriceDiv>
        <ReservationDiv>예약하기</ReservationDiv>
      </InerDiv>
      <PictureSlide
        w={""}
        h={"235"}
        imgPaths={props.imgPaths}
        main={false}
      ></PictureSlide>
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
  );
};

export default ListCard;
