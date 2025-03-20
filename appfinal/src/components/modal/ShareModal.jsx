import React, { useState } from "react";
import styled from "styled-components";
import { VscShare } from "react-icons/vsc";
import KakaoShareSpace from "./KaKaoShareSpace";
import Alert from "../Alert";
import KakaoShareStay from "./KakaoShareStay";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.display ? props.display : "none")};
  justify-content: center;
  align-items: center;
  z-index: 9998;
`;

const MainDiv = styled.div`
  width: 400px;
  height: 200px;
  background-color: white;
  /* border: 2px solid #049dd9; */
  border-radius: 10px;

  display: grid;
  grid-template-rows: 30px 1fr;
  grid-template-columns: 1fr;
  place-items: center;
  z-index: 9999;
  & > div:nth-child(2) {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 50px 60px 20px;
    justify-items: center;

    & > div:nth-child(6) > img,
    & > div:nth-child(7) > svg {
      width: 60px;
      height: 45px;
      border-radius: 10px;
    }
    & > div:nth-child(10),
    & > div:nth-child(11) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;
const TitleDiv = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: 45px 1fr 45px;
  grid-template-rows: 1fr;
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  & > div:nth-child(2) {
    margin-top: 15px;
    font-size: 25px;
    font-weight: 600;
  }
`;

const ModalCloseBtn = styled.button`
  width: 20px;
  height: 20px;
  border: none;
  background-color: white;
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

const ShareModal = ({ closeModal, modalStatus, no, type }) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setIsAlertOpen(true);
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    closeModal();
  };

  return (
    <Layout display={modalStatus}>
      <MainDiv>
        <TitleDiv>
          <div></div>
          <div>공유하기</div>
          <div>
            <ModalCloseBtn onClick={closeModal}>X</ModalCloseBtn>
          </div>
        </TitleDiv>
        <div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div>
            {type === "stay" ? (
              <KakaoShareStay no={no} />
            ) : (
              <KakaoShareSpace no={no} />
            )}
          </div>
          <div>
            <VscShare onClick={handleCopy} />
          </div>
          <div></div>
          <div></div>
          <div>카카오톡</div>
          <div onClick={handleCopy}>주소복사</div>
          <div></div>
          {isAlertOpen && (
            <Backdrop>
              <Alert
                title="URL"
                titleColor="#049dd9"
                message="URL이 복사되었습니다."
                buttonText="확인"
                buttonColor="#049dd9"
                onClose={handleAlertClose}
              />
            </Backdrop>
          )}
        </div>
      </MainDiv>
    </Layout>
  );
};

export default ShareModal;
