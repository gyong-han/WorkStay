import React, { useState } from "react";
import styled from "styled-components";
import { BASE_URL } from "../service/config";
import Alert from "../Alert";

const Button = styled.button`
  width: ${(props) => {
    return props.w || "300px";
  }};
  height: ${(props) => {
    return props.h || "60px";
  }};
  background-color: ${(props) => {
    return props.bg || "var(--main-color)";
  }};
  color: ${(props) => {
    return props.c || "#FAFAFA";
  }};
  border: ${(props) => {
    return props.b || "1px solid #049DD9";
  }};
  font-size: ${(props) => {
    return props.size || "1.5rem";
  }};
  font-weight: 600;
  cursor: pointer;
  border-radius: 5px;
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

const PaymentButton = ({ reservationData, checkInfo }) => {
  const [paymentUrl, setPaymentUrl] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const [isAlertOpen3, setIsAlertOpen3] = useState(false);
  const [isAlertOpen4, setIsAlertOpen4] = useState(false);
  const [isAlertOpen5, setIsAlertOpen5] = useState(false);

  // 결제 준비를 위한 API 호출
  const handlePayment = async () => {
    const rd = localStorage.getItem("roomdata");
    const rdData = JSON.parse(rd);

    // 필수 값 검증 (비어 있으면 경고창 띄우기)
    if (!rdData.roomNo) {
      setIsAlertOpen(true);
      return;
    }
    if (!rdData.amount) {
      setIsAlertOpen2(true);
      return;
    }
    if (!rdData.checkIn || !rdData.checkOut) {
      setIsAlertOpen3(true);
      return;
    }
    if (rdData.adult <= 0) {
      setIsAlertOpen4(true);
      return;
    }
    if (!checkInfo) {
      setIsAlertOpen5(true);
      return;
    }
    try {
      const response = await fetch(`${BASE_URL}/payment/ready`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData), // reservationData를 JSON 형식으로 전송
      });

      if (!response.ok) {
        throw new Error("네트워크 응답에 실패했습니다.");
      }

      const data = await response.json();
      const { next_redirect_pc_url } = data; // 카카오에서 리턴한 결제 페이지 URL
      setPaymentUrl(next_redirect_pc_url);

      // 결제 페이지로 리다이렉트
      window.location.href = next_redirect_pc_url; // 카카오 결제 페이지로 리다이렉트
      // window.open (
      //   next_redirect_pc_url,
      //   '_blank',
      //   'width=500,height=700'
      // );
    } catch (error) {
      console.error("결제 준비 오류:", error);
    }
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };
  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
  };
  const handleAlertClose3 = () => {
    setIsAlertOpen3(false);
  };
  const handleAlertClose4 = () => {
    setIsAlertOpen4(false);
  };
  const handleAlertClose5 = () => {
    setIsAlertOpen5(false);
  };

  return (
    <>
      <Button onClick={handlePayment}>결제하기</Button>
      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="ROOM"
            titleColor="#049dd9"
            message="방 정보를 다시 확인해주세요."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
      {isAlertOpen2 && (
        <Backdrop>
          <Alert
            title="PRICE"
            titleColor="#049dd9"
            message="총 금액을 다시 확인해주세요."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose2}
          />
        </Backdrop>
      )}
      {isAlertOpen3 && (
        <Backdrop>
          <Alert
            title="RESERVATION DATE"
            titleColor="#049dd9"
            message="예약 날짜를 다시 확인해주세요."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose3}
          />
        </Backdrop>
      )}
      {isAlertOpen4 && (
        <Backdrop>
          <Alert
            title="인원"
            titleColor="#049dd9"
            message="성인은 최소 1명 이상 투숙하여야합니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose4}
          />
        </Backdrop>
      )}
      {isAlertOpen5 && (
        <Backdrop>
          <Alert
            title="사용자 약관"
            titleColor="#049dd9"
            message="필수 약관에 모두 동의해주세요."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose5}
          />
        </Backdrop>
      )}
    </>
  );
};

export default PaymentButton;
