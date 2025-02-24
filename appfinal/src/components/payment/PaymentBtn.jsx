import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { setRequest } from "../../redux/spaceSlice";

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


const PaymentBtn = ({reservationData,lateFuction,request}) => {
    const [paymentUrl, setPaymentUrl] = useState("");
    const dispatch = useDispatch()

    // 결제 준비를 위한 API 호출
    const handlePayment = async () => {
  
      try {
          // dispatch(setRequest(request));

            
            const response = await axios.post("http://localhost:8080/payment/ready",reservationData);
            const { next_redirect_pc_url } = response.data;  // 카카오에서 리턴한 결제 페이지 URL
            setPaymentUrl(next_redirect_pc_url);

            // 결제 페이지로 리다이렉트
            window.location.href = next_redirect_pc_url;  // 카카오 결제 페이지로 리다이렉트
            // window.open (
            //   next_redirect_pc_url,
            //   '_blank',
            //   'width=500,height=700'
            // );
            // lateFuction();
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
