import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { SiNaver } from "react-icons/si";
import { FaYoutube } from "react-icons/fa";

const FooterWrapper = styled.footer`
  background-color: #d9d9d9;
  box-sizing: border-box;
  padding: 50px 30px;
  width: 100%;
`;

const FooterContent = styled.div`
  max-width: 1500px;
  width: 100%;
  margin: 0 auto;
  display: grid;
`;

const FooterServiceContainer = styled.div`
  display: block;
`;

const FooterMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: 35px;
`;

const FooterInfoContainer = styled.div`
  display: grid;
  justify-content: space-between;
`;

const MText = styled.span`
  font-family: "Pretendard-Medium";
`;

const LText = styled.span`
  font-family: "Pretendard-Light";
`;

const DetailText = styled.span`
  font-family: "Pretendard-Light";
  font-size: 0.7rem;
`;

const Logos = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  gap: 10px;
`;

const EnrollSpan = styled.span`
  margin-right: 10px;
  cursor: pointer;

  &:hover {
    color: #2b8c44;
  }
`;

const Footer = () => {
  const navigate = useNavigate();

  function enrollStay() {
    navigate("/enroll/stay");
    window.scrollTo(0, 0);
  }

  function enrollSpace() {
    navigate("/enroll/space");
    window.scrollTo(0, 0);
  }

  return (
    <FooterWrapper>
      <FooterContent>
        <FooterServiceContainer>
          <MText>고객센터 </MText>
          <LText>10:00 - 18:00 / 주말 및 공휴일 제외</LText>
          <Link></Link>
        </FooterServiceContainer>
        <FooterMainContainer>
          <FooterInfoContainer>
            <div>
              <EnrollSpan onClick={enrollStay}>숙소입점 </EnrollSpan>
              <EnrollSpan> | </EnrollSpan>
              <EnrollSpan onClick={enrollSpace}> 공간입점</EnrollSpan>
            </div>
            <br />
            <DetailText>
              상호명 : (주) 워크스테이 | 대표자 : 홍석일 | 주소 : 서울특별시
              테헤란로 130, 6F 362호 | 사업자등록번호 : 181-20-01010 |
              통신판매업신고 : 제2025-서울종로-0307호 |
            </DetailText>
            <DetailText>
              관광사업자등록 : 일반여행업 2025-000003호(강남구청) | 전화 :
              0813-0321 | 전자우편 : help@workstay.com
            </DetailText>
            <br />
            <DetailText>
              (주) 워크스테이는 통신판매 중개사로서 통신판매의 당사자가 아니며
              상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매사에게
              있습니다.
            </DetailText>
            <DetailText>CopyrightⓒWORKSTAY</DetailText>
          </FooterInfoContainer>
          <Logos>
            <FaFacebookF size={15} />
            <FaInstagram />
            <SiNaver />
            <FaYoutube />
          </Logos>
        </FooterMainContainer>
      </FooterContent>
    </FooterWrapper>
  );
};

export default Footer;
