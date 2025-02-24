import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import PictureSlide from "../../../components/listcomponents/PictureSlide";
import BookmarkIcon from "../../../components/bookmark/BookmarkIcon";

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

const StayListCard = (props) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    // console.log(props.no);
    navigate(`/${props.url}/detail/${props.no}`);
  };

  const Price = props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <Layout no={props.no}>
      <TextWrapper>
        <InerDiv onClick={clickHandler}>
          <TitleDiv>{props.title}</TitleDiv>
          <BookmarkDiv>
            <BookmarkIcon />
          </BookmarkDiv>
          <div></div>
          <div></div>
          <AreaDiv>{props.address}</AreaDiv>
          <PeopleDiv>
            기준 {props.min}명 (최대 {props.max}명)
          </PeopleDiv>
          <PriceDiv>₩{Price}</PriceDiv>
          <div></div>
          <div></div>
          <ReservationDiv>예약하기</ReservationDiv>
        </InerDiv>
      </TextWrapper>
      <PictureSlide
        w={""}
        h={"235"}
        imgPaths={props.imgPaths}
        main={false}
      ></PictureSlide>
    </Layout>
  );
};

export default StayListCard;
