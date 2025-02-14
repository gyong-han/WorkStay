import styled from 'styled-components';
import { BiMessageAltDetail } from "react-icons/bi";
import { RxShare2 } from "react-icons/rx";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import PictureSlide from '../../components/listcomponents/PictureSlide';
import { MdOutlineKeyboardArrowDown } from "react-icons/md"
import PackageDisplay from '../../components/package/PackageDisplay';
import Map from '../../components/map/Map';
import Infomation from '../../components/Infomation';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CalendarTime from '../../components/FilterBar/CalendalTime';

const Layout =styled.div`
width: 100%;
height: 100%;
display: grid;
grid-template-columns: 1fr;
grid-template-rows: 120px 550px 100px 700px 450px 100px 549px 50px 650px;

&>div:nth-child(3){
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1500px 1fr;
  grid-template-rows: 1fr;

  font-size: 18px;
  font-weight: 400;
}
&>div:nth-child(5){
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1500px 1fr;
  grid-template-rows: 450px;

  &>div:nth-child(2){
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2b8c437b;
    color: #FAFAFA;
  }

}

&>div:nth-child(6){
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 700px 1fr;
  grid-row: 1fr;
  

  &>div:nth-child(2){
    display: flex;
    align-items: end;
    justify-content: center;
    text-align: center;
    font-size: 20px;
  }
}
  &>div:nth-child(7){
    
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
  &>div:nth-child(1)>span{
    font-size: 18px;
  }
`;
const InconTitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns:1fr 1fr 1fr;
  grid-template-rows: 3fr 1fr;

& > div:nth-child(1), 
& > div:nth-child(2),
& > div:nth-child(3){
  display: flex;
  align-items: end;
  justify-content: center;
  font-size: 35px;
}
& > div:nth-child(4), 
& > div:nth-child(5),
& > div:nth-child(6){
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
    border-bottom: 2px solid #D9D9D9;
`;

const PackageDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 300px 450px 50px 450px 200px;
  grid-template-rows :1fr ;
  justify-content: center;
  align-items: center;

  &>div:nth-child(1){
    width: 100%;
    height: 100%;
    margin-top: 240px;
    font-size: 40px;
    font-weight: 600;

    
    
  }
`;




const FindSpaceDetail = () => {
  const [bookMark,setBookMark] = useState();
  const [detailData,setDetailData] = useState({});

  const {x} = useParams();
  // console.log(x);

  useEffect(()=>{
    fetch(("http://127.0.0.1:8080/space/detail"),{
      method:"POST",
      headers:{
        "content-type" : "application/json"
      },
      body:JSON.stringify(x),
    })
    .then((resp)=>resp.json())
    .then((data)=>{
      console.log("data ::: ",data);
      setDetailData(data);
    })
  },[])

  
  

  const park = "4";
  let parking=""
  if(park==="4"){
    parking = "스페이스 건물 외부 전용 주차장에 주차 가능합니다";
  }else{
    parking = "스페이스 공간 주차불가능";
  }

  
  const name=detailData.name;
  const adress="서울특별시 강남구 테헤란로 130";

  const navi=()=>{
    console.log("hello");
    
  }


  return (
    <Layout>
      <TitleDiv>
        <div>
          <h1>{detailData.name}</h1>
          <span>{detailData.address}</span>
        </div>
        <div></div>
        <InconTitleDiv>
          <div><BiMessageAltDetail /></div>
          <div><RxShare2 /></div>
          
          <div onClick={() => setBookMark(!bookMark)}>
             {bookMark ? <IoBookmark/> : <IoBookmarkOutline/>}
          </div>
          <div>메세지</div>
          <div>공유하기</div>
          <div>북마크</div>
        </InconTitleDiv>
        </TitleDiv>
      <div>
        {/* <PictureSlide w={'1500'} h={'500'} 

      main={true}
      >
      </PictureSlide> */}
      </div>
      <div>
        <div></div>
        <DateDiv><CalendarTime type={"text"}>날짜를 선택해주세요<MdOutlineKeyboardArrowDown /></CalendarTime></DateDiv>
        <div></div>
      </div>
      <PackageDiv>
        <div>PACKAGE</div>
        <div>
          <PackageDisplay img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAwcf09BODgX7VbhRf07dq9mBKXiQwQxzG-Q&s"}
            title={"낮 패키지"} standard={"6"} max={"12"} price={"120000"} navigatorHandler={navi} url={"/findspace/spacebooking/1"} ></PackageDisplay>
        </div>
        <div></div>
        <div>
          <PackageDisplay img={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPVr3w8Pov0BQ0sJlrmKaS-P8Nz8ONNF-VUQ&s"}
            title={"밤 패키지"} standard={"4"} max={"8"} price={"150000"} navigatorHandler={navi} url={"/findspace/spacebooking/1"} ></PackageDisplay>
       </div>
        <div></div>
      </PackageDiv>
      <div>
        <div></div>
        <div>{detailData.Infomation}</div>
        <div></div>
      </div>
      <div>
        <div></div>
        <div>
          {name}의 위치는 [{adress}]입니다.
          <br></br>
          {parking}
        </div>
        <div></div>
      </div>
      <div><Map adress={adress} name={name}>space</Map></div>
      <div></div>
      <Infomation morning={150000} night={820000} standard={10} max={20}></Infomation>
    </Layout>
  );
};

export default FindSpaceDetail;