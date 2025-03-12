import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Footer from "../components/Footer";
import Main from "../components/Main";
import Middle from "../components/Middle";
import HomeMainSlide from "../components/home/HomeMainSlide";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../components/service/config";
import Alert from "../components/Alert";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Content = styled.div`
  flex: 1;
  background-color: #fafafa;
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

const Home = () => {
  const [isAlertOpen1, setIsAlertOpen1] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const [memberNo, setMemberNo] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setMemberNo(decodedToken.no);
      fetch(`${BASE_URL}/home/alert`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(decodedToken.no),
      })
        .then((resp) => resp.json())
        .then((data) => {
          if (data.approve === "true") {
            setIsAlertOpen1(true);
          }
          if (data.companion === "true") {
            setIsAlertOpen2(true);
          }
        });
    }
  }, [token]);

  const changeAlert = () => {
    fetch(`${BASE_URL}/home/changeAlert`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(memberNo),
    });
  };

  const handleAlertClose1 = () => {
    setIsAlertOpen1(false);
    changeAlert();
  };

  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
    changeAlert();
  };

  return (
    <>
      <HomeContainer>
        <Content>
          <Middle />
          <Main />
        </Content>
      </HomeContainer>
      {isAlertOpen1 && (
        <Backdrop>
          <Alert
            title="입점 신청 승인"
            titleColor="#049dd9"
            message="입점신청 승인내역이 있습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose1}
          />
        </Backdrop>
      )}
      {isAlertOpen2 && (
        <Backdrop>
          <Alert
            title="입점 신청 반려"
            titleColor="red"
            message="입점신청 반려내역이 있습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose2}
          />
        </Backdrop>
      )}
    </>
  );
};

export default Home;
