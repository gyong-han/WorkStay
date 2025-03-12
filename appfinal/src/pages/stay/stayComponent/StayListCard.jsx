import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PictureSlide from "../../../components/listcomponents/PictureSlide";
import BookmarkIcon from "../../../components/bookmark/BookmarkIcon";
import { useEffect, useState } from "react";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import {
  delBookmark,
  getBookmark,
  setBookmarkInsert,
} from "../../../components/service/stayService";
import Alert from "../../../components/Alert";

const Layout = styled.div`
  width: 615px;
  height: 235px;
  display: grid;
  grid-template-columns: 215px 400px;
  grid-template-rows: 1fr;
`;

const TextWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const InerDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 2fr 0.5fr;
  grid-template-rows: 50px 50px 1fr 1fr 1fr 1fr 1fr;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 25px;
  font-weight: 600;
`;

const BookmarkDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center center;
`;

const AreaDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  grid-column: span 2;
`;
const PeopleDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  grid-column: span 2;
`;

const PriceDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 15px;
  grid-column: span 2;
`;

const ReservationDiv = styled.div`
  display: flex;
  justify-content: start;
  width: 100%;
  height: 100%;
  padding-left: 5px;
  font-size: 18px;
  text-decoration: underline solid #202020;
  cursor: pointer;
  grid-column: span 2;
`;

const BookMarkDiv = styled.div`
  margin-top: 10px;
  width: 25px;
  height: 25px;
  color: #049dd9;
  & > svg {
    width: 25px;
    height: 25px;
  }
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

const StayListCard = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    navigate(`/${props.url}/detail/${props.no}/refund-policy`);
  };

  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const [bookMark, setBookMark] = useState(false);

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
    stayNo: props.no,
  };

  useEffect(() => {
    if (!token) {
      return;
    }
    const x = async () => {
      const data = await getBookmark(dataObjByGet);
      if (data == "true") {
        setBookMark(true);
      } else {
        setBookMark(false);
      }
    };
    x();
  }, [bookMark]);

  //클릭함수
  const ClickHandler = () => {
    if (!token) {
      return;
    }
    const dataObj = {
      memberNo: userData.no,
      stayNo: props.no,
    };

    if (bookMark === true) {
      setBookMark(false);
      delBookmark(dataObj);
      setIsAlertOpen(true);
    } else {
      setBookMark(true);
      setBookmarkInsert(dataObj);
      setIsAlertOpen2(true);
    }
  };

  const extractProvinceCity = (address) => {
    if (!address) return "";

    const parts = address.split(" ");

    if (parts.length >= 2) {
      return `${parts[0]} ${parts[1]}`;
    }

    return address;
  };

  const Price = props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Layout no={props.no}>
      <TextWrapper>
        <InerDiv>
          <TitleDiv>{props.title}</TitleDiv>
          <BookMarkDiv
            onClick={(e) => {
              e.stopPropagation();
              ClickHandler();
            }}
          >
            {!bookMark ? <IoBookmarkOutline /> : <IoBookmark />}
          </BookMarkDiv>
          <div></div>
          <AreaDiv>{extractProvinceCity(props.address)}</AreaDiv>
          <PeopleDiv>
            기준 {props.min}명 (최대 {props.max}명)
          </PeopleDiv>
          <PriceDiv>₩{Price}</PriceDiv>
          <div></div>
          <div></div>
          <ReservationDiv onClick={clickHandler}>예약하기</ReservationDiv>
        </InerDiv>
      </TextWrapper>
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
    </Layout>
  );
};

export default StayListCard;
