import PictureSlide from './PictureSlide';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Layout = styled.div`
  width: 616px;
  height: 235px;
  display: grid;
  grid-template-columns: 210px 406px;
  grid-template-rows: 1fr;
`;
const InerDiv =styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px 25px 1fr 1fr 10px 1fr 1fr;
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  font-size: 25px;
  font-weight:bold;
`;
const AreaDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size: 18px;
  font-weight:600;
`;
const PeopleDiv = styled.div`
  width: 100%;
  height: 100%;
  font-size:20px;
  font-weight:600;
`;
const MorningPackagePriceDiv= styled.div`
  width: 100%;
  height: 100%;
  font-size:15px;
  display: flex;
  align-items: end;
`;
const NightPackagePriceDiv= styled.div`
  width: 100%;
  height: 100%;
  font-size:15px;
`;

const ReservationDiv = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 5px;
  font-size: 18px;
  text-decoration: underline solid #000000;
  
`;


const ListCard = (props) => {

  const navigate = useNavigate();

   const clickHandler = ()=>{
      console.log(props.no);
      navigate(`/${props.url}/detail/${props.no}`)
    }
  
  const morningPrice= props.morning.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const nightPrice = props.night.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return (
    <Layout no={props.no}>
      <InerDiv  onClick={clickHandler}>
        <TitleDiv>{props.title}</TitleDiv>
        <div></div>
        <AreaDiv>{props.address}</AreaDiv>
        <PeopleDiv>기준 {props.min}명 (최대 {props.max}명)</PeopleDiv>
        <MorningPackagePriceDiv>낮패키지₩{morningPrice}</MorningPackagePriceDiv>
        <NightPackagePriceDiv>밤패키지₩{nightPrice}</NightPackagePriceDiv>
        <ReservationDiv>예약하기</ReservationDiv>
      </InerDiv>
      <PictureSlide w={''} h={'235'} 
      imgPaths = {props.imgPaths}
      main={false}
      >
      </PictureSlide>
    </Layout>
  );
};

export default ListCard;
