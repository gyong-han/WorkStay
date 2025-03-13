import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import PackageDetailCard from '../../components/package/PackageDetailCard';
import Infomation from '../../components/Infomation';
import Btn from '../../components/Btn';
import CalendarTime from '../../components/FilterBar/CalendalTime';
import { useSelector } from 'react-redux';



const Layout = styled.div`
  width:100%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 60px 700px 150px 150px 150px 100px 1fr;

&>div:nth-child(1){
  display: flex;
  justify-content: center;
}
`;

const DateDiv = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: end;
    border-bottom: 2px solid #D9D9D9;
   

&>div:nth-child(1){
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 170px 1fr 170px;
  justify-content: center;
  align-items: center;
}
`;

const CalendarLayout = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;

`;

const ThirdDiv = styled.div`
  border-bottom : 2px solid #D9D9D9;
`;

const ContentLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  border-bottom: 2px solid #D9D9D9;
`;
const TitleDiv = styled.div`
   width: 100%;
   height: 100%;
   display: flex;
   align-items: center;
   font-size: 24px;
`;

const IconLayoutDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 155px);
  justify-content: center;
  align-items: center;
`;

const FindSpaceBooking = () => {

  const{x} = useParams();
  const [selectDate,setSelectDate] = useState("");
  const spaceVo = useSelector((state)=>state.space);

  const price = spaceVo.packageType === '낮 패키지'?spaceVo.daytimePrice :spaceVo.nightPrice;
 
  useEffect(()=>{
    localStorage.removeItem('kakao_75fb27eb9d2a3889197748d9c8dcf230');
  },[])
 
  useEffect(() => {
    window.scrollTo(0, 0);
}, []);

  return (
    <Layout>
      <div><h1>BOOKING</h1></div>
      <DateDiv>
        <div>
          <div>인더플럼</div>
          <CalendarLayout>
          {!spaceVo.reservationDate ? (
          <CalendarTime type={"text"} setSelectDate={setSelectDate}>날짜를 입력해주세요.</CalendarTime>
          ) : (
            <CalendarTime type={"text"} setSelectDate={setSelectDate}>{spaceVo.reservationDate}</CalendarTime>
          )}
          </CalendarLayout>
          <div><Link to={`/findspace/booking/${x}`}><Btn w={150} h={35} bg={"#049DD9"} size={"20px"} >예약하기</Btn></Link></div>
        </div> 
        </DateDiv>
      <ThirdDiv><PackageDetailCard title={spaceVo.packageType} imgPaths ={spaceVo.attachmentFilePaths} price={price} max={spaceVo.maxGuest} min={spaceVo.standardGuest}>
        </PackageDetailCard></ThirdDiv>
      <ContentLayout>
        <TitleDiv>FEATURES</TitleDiv>
        <IconLayoutDiv>
          {spaceVo.features.map((vo,idx)=>{
            return <div key={idx}>{vo}</div>
          })}
        </IconLayoutDiv>
      </ContentLayout>
      <ContentLayout>
        <TitleDiv>AMENITIES</TitleDiv>
        <IconLayoutDiv>
          <div>빅테이블</div>
          <div>캡슐커피머신</div>
          <div>전기포트</div>
          <div>냉장고</div>
          <div>화이트보드</div>
          <div>스피커</div>
          <div>빔프로젝터</div>
          <div>전자레인지</div>
          <div>일회용 칫솔</div>
          <div>일회용 치약</div>
        </IconLayoutDiv>
      </ContentLayout>
      <ContentLayout>
        <TitleDiv>ADD-ON SERVICES</TitleDiv>
        <IconLayoutDiv>
          <div>커피와 스낵 무제한 제공</div>
        </IconLayoutDiv>
      </ContentLayout>
      <div></div>
      <Infomation morning={150000} night={820000} standard={10} max={20}></Infomation>
    </Layout>
  );
};

export default FindSpaceBooking;