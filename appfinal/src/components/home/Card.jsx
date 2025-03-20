import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Alert from "../Alert";
import { BASE_URL } from "../service/config";

const BlackDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 250px 130px;
  border: 2px #d9d9d9 solid;
  border-radius: 10px;
  width: 400px;
  height: 370px;

  & > div:nth-child(2) {
  }
`;

const ImgDiv = styled.img`
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  width: 100%;
  height: 250px;
  background-position: center;
`;

const SecondDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 1fr 1.5fr 1fr;
  margin-left: 10px;
  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }
  & > div:nth-child(2) > svg {
    margin-top: 5px;
    width: 25px;
    height: 25px;
    color: #049dd9;
  }
  & > div:nth-child(2) {
    width: 30px;
    height: 30px;
    justify-self: end;
  }

  & > div:nth-child(3) {
    display: flex;
    gap: 10px;
  }
  & > div:nth-child(5) {
    display: flex;
    font-size: 18px;
    font-weight: 600;
    padding-bottom: 20px;
    letter-spacing: 1px;
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

const Card = ({ vo }) => {
  const [bookMark, setBookMark] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);

  const token = localStorage.getItem("token");
  let userData = "";
  if (token) {
    userData = jwtDecode(token);
  }
  const navi = useNavigate();

  const dataObjByGet = {
    memberNo: userData.no,
    no: vo.no,
  };
  useEffect(() => {
    if (!token) {
      return;
    }
    fetch(`${BASE_URL}/home/getbookmarkInfo`, {
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

  const ClickHandler = () => {
    if (!token) {
      return;
    }

    const dataObj = {
      memberNo: userData.no,
      no: vo.no,
    };

    if (bookMark === true) {
      setBookMark(false);
      fetch(`${BASE_URL}/home/bookmarkdel`, {
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
      fetch(`${BASE_URL}/home/bookmark`, {
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

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navi("/"); // 확인 버튼 누르면 로그인 페이지로 이동
  };

  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
    navi("/"); // 확인 버튼 누르면 로그인 페이지로 이동
  };
  return (
    <BlackDiv>
      <ImgDiv src={vo.filePath}></ImgDiv>
      <SecondDiv
        onClick={() => {
          navi(`/findstay/detail/${vo.no}`);
        }}
      >
        <div>{vo.name}</div>
        <div
          onClick={(e) => {
            e.stopPropagation();
            ClickHandler();
          }}
        >
          {!bookMark ? <IoBookmarkOutline /> : <IoBookmark />}
        </div>
        <div>
          {vo.address}/{vo.standardGuest}~{vo.maxGuest}인
        </div>
        <div></div>
        <div>
          ₩
          {vo.price
            ? vo.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            : null}{" "}
          / 1박
        </div>
        <div></div>
      </SecondDiv>
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
    </BlackDiv>
  );
};

export default Card;
