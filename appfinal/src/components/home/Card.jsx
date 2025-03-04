import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { jwtDecode } from'jwt-decode'

const BlackDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 250px 130px;
  border: 2px #D9D9D9 solid;
  border-radius: 10px;
  width: 400px;
  height: 370px;

  &>div:nth-child(2){

  }

`;

const ImgDiv = styled.img`
 border-radius: 5px;
    width: 100%;
    height: 250px;
    background-position: center; 
  `;

const SecondDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1.5fr 1fr;
  margin-left: 10px;
  &>div:nth-child(1){
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }
  &>div:nth-child(2)>svg{
    width: 30px;
    height: 30px;
  }
  &>div:nth-child(2){
    width: 30px;
    height: 30px;
    justify-self: end;
  }

  &>div:nth-child(3){
    display: flex;
    gap: 10px;
  }
  &>div:nth-child(5){
    display: flex;
    font-size: 20px;
    font-weight: 700;
    padding-bottom: 20px;
  }
  

`;

const Card = ({vo}) => {
  const [bookMark,setBookMark] = useState(false);
  const token = localStorage.getItem("token");
  const userData= jwtDecode(token);
  console.log(userData.no);
  
  
  const dataObjByGet = {
    memberNo : userData.no,
    no :vo.no,
  }
  useEffect(()=>{
    fetch(("http://localhost:8080/home/getbookmarkInfo"),{
      method :"POST",
      headers : {
        "content-type" : "application/json",
      },
      body : JSON.stringify(dataObjByGet),
      
    })
    .then((resp)=>resp.text())
    .then((data)=>{
      console.log("가져옴@@@@@@@@@@@@@@@",data);
      if(data=="true"){
        setBookMark(true);
      }else{
        setBookMark(false)
      }
    })

  },[bookMark])
  
  const ClickHandler = ()=>{

    const dataObj = {
      memberNo : userData.no,
      no :vo.no,

    }

    if(bookMark === true){
      setBookMark(false);
      fetch(("http://localhost:8080/home/bookmarkdel"),{
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
      fetch(("http://localhost:8080/home/bookmark"),{
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
  
 
  return (
         <BlackDiv>
         <ImgDiv src={vo.filePath}></ImgDiv>
          <SecondDiv>
            <div>{vo.name}</div>
            <div onClick={ClickHandler}>
              {!bookMark ? <IoBookmarkOutline/> : <IoBookmark/>}
            </div>
            <div>{vo.address}/{vo.standardGuest}~{vo.maxGuest}인</div>
            <div></div>
            <div>₩{vo.price?vo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","):null} / 박</div>
            <div></div>
          </SecondDiv>
         </BlackDiv>
  );
};

export default Card;