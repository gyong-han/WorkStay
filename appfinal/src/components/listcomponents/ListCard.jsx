import PictureSlide from './PictureSlide';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

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
const BookMarkDiv = styled.div`
  margin-top: 5px;
  width: 30px;
  height: 30px;
  &>svg{
    width: 30px;
    height: 30px;
  }
`;


const ListCard = (props) => {
  const [bookMark,setBookMark] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const userData= jwtDecode(token);
  
  const dataObjByGet = {
    memberNo : userData.no,
    spaceNo :props.no,
  }
    useEffect(()=>{
      fetch(("http://localhost:8080/space/getbookmarkInfo"),{
        method :"POST",
        headers : {
          "content-type" : "application/json",
        },
        body : JSON.stringify(dataObjByGet),
        
      })
      .then((resp)=>resp.text())
      .then((data)=>{
        if(data=="true"){
          setBookMark(true);
        }else{
          setBookMark(false)
        }
      })
    },[bookMark])
  
  //클릭함수
  const ClickHandler = ()=>{
    const dataObj = {
      memberNo : userData.no,
      spaceNo :props.no,

    }

    if(bookMark === true){
      setBookMark(false);
      fetch(("http://localhost:8080/space/bookmarkdel"),{
        method :"POST",
        headers : {
          "content-type" : "application/json",
        },
        body : JSON.stringify(dataObj),
        
      })
      .then((resp)=>resp.text())
      .then((data)=>{
        // console.log("삭제된데이터수:",data);
      })
      
      alert("북마크가 해지되었습니다.")
    }else{
      setBookMark(true);
      fetch(("http://localhost:8080/space/bookmark"),{
        method :"POST",
        headers : {
          "content-type" : "application/json",
        },
        body : JSON.stringify(dataObj),
        
      })
      .then((resp)=>resp.text())
      .then((data)=>{
        // console.log(data);
    
      });
      alert("마이페이지 찜목록에 저장되었습니다.");
    }
  }

   const clickHandler = ()=>{
      navigate(`/${props.url}/detail/${props.no}`)
    }
  
  const morningPrice= props.morning.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const nightPrice = props.night.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  return (
    <Layout no={props.no}>
      <InerDiv  onClick={clickHandler}>
      <TitleArea>
        <TitleDiv>{props.title}</TitleDiv>
        <BookMarkDiv onClick={(e) => {
                e.stopPropagation();
                ClickHandler();
              }}>{!bookMark ? <IoBookmarkOutline/> : <IoBookmark/>}</BookMarkDiv>
        </TitleArea>
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
