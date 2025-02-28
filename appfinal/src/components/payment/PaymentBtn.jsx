import React, { useState } from "react";
import styled from "styled-components";

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


const PaymentBtn = ({reservationData}) => {
  const [paymentUrl, setPaymentUrl] = useState("");

  // 결제 준비를 위한 API 호출
  const handlePayment = async () => {
    const fd1 = localStorage.getItem("fd");
    const fdData = JSON.parse(fd1);  
    
  // 필수 값 검증 (비어 있으면 경고창 띄우기)
      if (!fdData.spaceNo) {
        alert("잘못된 경로입니다.");
        return;
      }
      if (!fdData.request.trim()) {
        alert("요청사항을 작성해주세요.");
        return;
      }
      if (!fdData.amount) {
        alert("결제 금액이 없습니다. 다시 시도 해주세요.");
        return;
      }
      if (!fdData.useDay) {
        alert("예약 날짜를 선택해주세요.");
        return;
      }
      if ((fdData.adult+fdData.baby+fdData.child)<=0){
        alert("인원수를 선택 해주세요.");
        return;
      }
    try {
      const response = await fetch("http://localhost:8080/payment/ready", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reservationData),  // reservationData를 JSON 형식으로 전송
      });
  
      if (!response.ok) {
        throw new Error("네트워크 응답에 실패했습니다.");
      }
  
      const data = await response.json();
      const { next_redirect_pc_url } = data;  // 카카오에서 리턴한 결제 페이지 URL
      setPaymentUrl(next_redirect_pc_url);
  
      // 결제 페이지로 리다이렉트
      window.location.href = next_redirect_pc_url;  // 카카오 결제 페이지로 리다이렉트
      // window.open (
      //   next_redirect_pc_url,
      //   '_blank',
      //   'width=500,height=700'
      // );
    } catch (error) {
      console.error("결제 준비 오류:", error);
    }
  };

    return (
        <Button onClick={handlePayment}>
            카카오페이 결제
        </Button>
    );
};

export default PaymentBtn;
