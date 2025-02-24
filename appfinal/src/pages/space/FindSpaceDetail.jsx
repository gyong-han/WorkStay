//findspaceDetial
import styled from 'styled-components';
import { BiMessageAltDetail } from "react-icons/bi";
import { RxShare2 } from "react-icons/rx";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import PictureSlide from '../../components/listcomponents/PictureSlide';
import PackageDisplay from '../../components/package/PackageDisplay';
import Map from '../../components/map/Map';
import Infomation from '../../components/Infomation';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CalendarTime from '../../components/FilterBar/CalendalTime';
import { useDispatch, useSelector } from 'react-redux';
import { setPackageType, setReservationDone, setSpaceVo } from '../../redux/spaceSlice';
import PackageReservationDone from '../../components/package/PackageReservationDone';

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
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows:80px 40px 1fr ;
    background-color: #2b8c437b;
  
    color: #FAFAFA;
    &>div:nth-child(1),
    &>div:nth-child(2){
      justify-content: center;
      align-items: center;
      display: flex;
    }
    &>div:nth-child(1){
      font-size: 30px;
      font-weight: bold;
    }
    &>div:nth-child(3){
      padding-top:50px ;
      padding-left: 100px;
      padding-right: 100px;
      text-align: center;
      font-size: 20px;
    }
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
  const dispatch = useDispatch();
  const {x} = useParams();
  const spaceVo = useSelector((state) => state.space);
  const [packageNo,setPackageNo] = useState("");
  // console.log(x);


  

  useEffect(()=>{
    fetch(("http://localhost:8080/space/detail"),{
      method:"POST",
      headers:{
        "content-type" : "application/json"
      },
      body:JSON.stringify(x),
    })
    .then((resp)=>resp.json())
    .then((data)=>{
      // console.log("data ::: ",data);
      dispatch(setSpaceVo(data));
    })
  },[x,dispatch]);

  useEffect(()=>{
    fetch(("http://localhost:8080/space/isAvailable"),{
      method:"POST",
      body:x,
    }).then((resp)=>resp.json())
    .then((data)=>{
      // console.log(data);
      dispatch(setReservationDone(data));
    })
  },[x]);

   useEffect(()=>{
    const fd = new FormData();
    fd.append("no",x);
    fd.append("useDay",spaceVo.reservationDate);
    if(!spaceVo.reservationDate){
      return;
    }
    fetch(("http://localhost:8080/space/packagedone"),{
      method:"POST",
      body:fd,
    }).then((resp)=>resp.json())
    .then((data)=>{
      console.log("DATA::",data);
      setPackageNo(data.packageNo);
    })
  },[x,spaceVo]);



  const park = "4";
  let parking=""
  if(park==="4"){
    parking = "스페이스 건물 외부 전용 주차장에 주차 가능합니다";
  }else{
    parking = "스페이스 공간 주차불가능";
  }




  return (
    <Layout>
      <TitleDiv>
        <div>
          <h1>{spaceVo.name}</h1>
          <span>{spaceVo.address}</span>
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
        <PictureSlide w={'1500'} h={'500'} 
        imgPaths={spaceVo.attachmentFilePaths}
        main={true}
      >
      </PictureSlide>
      </div>
      <div>
        <div></div>
        <DateDiv>
        {!spaceVo.reservationDate ? (
          <CalendarTime type={"text"}>날짜를 입력해주세요.</CalendarTime>
          ) : (
            <CalendarTime type={"text"} >{spaceVo.reservationDate}</CalendarTime>
          )}
        </DateDiv>
        <div></div>
      </div>
      <PackageDiv>
        <div>PACKAGE</div>
        <div>
          {packageNo != "1"?<PackageDisplay img={"https://vrthumb.clipartkorea.co.kr/2023/04/12/pc0040625240.jpg"} titleHandler={()=>{dispatch(setPackageType({packageType:"낮 패키지"}))}}
            title={"낮 패키지"} standard={"6"} max={"12"} price={spaceVo.daytimePrice}  url={`/findspace/spacebooking/${x}`} imgPaths={spaceVo.attachmentFilePaths}></PackageDisplay>:
          <PackageReservationDone img={"https://cdn.ownerclan.com/qiMNa49EgFO3USYFFjlxWueE4HXsJLKBIV9e1~D4~Y4/marketize/auto/as/v1.jpg"}></PackageReservationDone>
            
            }
          
        </div>
        <div></div>
        <div>
          {packageNo != "2"?<PackageDisplay img={"https://png.pngtree.com/background/20230424/original/pngtree-meeting-inside-a-conference-room-with-business-people-picture-image_2457183.jpg"} titleHandler={()=>{dispatch(setPackageType({packageType :"밤 패키지"}))}}
          title={"밤 패키지"} standard={"4"} max={"8"} price={spaceVo.nightPrice} url={`/findspace/spacebooking/${x}`}  imgPaths={spaceVo.attachmentFilePaths}></PackageDisplay>:
          <PackageReservationDone img={"https://cdn.ownerclan.com/qiMNa49EgFO3USYFFjlxWueE4HXsJLKBIV9e1~D4~Y4/marketize/auto/as/v1.jpg"}></PackageReservationDone>
          }
          
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
      <div><Map address={spaceVo.address} name={spaceVo.name}>space</Map></div>
      <div></div>
      <Infomation morning={150000} night={820000} standard={10} max={20}></Infomation>
    </Layout>
  );
};

export default FindSpaceDetail;