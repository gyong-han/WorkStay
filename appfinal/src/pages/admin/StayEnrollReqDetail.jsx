import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HostBtn from "../host/hostComponents/HostBtn";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../components/service/config";

const HomeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
`;

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 0.3fr 1fr 0.3fr 2fr 0.5fr;
`;

const HeaderDiv = styled.div`
  text-align: center;
  font-weight: ${(props) => {
    return props.weight;
  }};
  color: ${(props) => {
    return props.color;
  }};
  font-size: ${(props) => {
    return props.size;
  }};
  margin-top: ${(props) => {
    return props.margin;
  }};
  margin-bottom: ${(props) => {
    return props.marginBot;
  }};
  padding: 0px;
`;

const UserDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 3fr;
`;

const EnrollHeader = styled.div`
  font-size: 25px;
  color: #2b8c44;
  font-weight: 600;
`;

const DataTitle = styled.div`
  font-size: 25px;
  font-weight: 300;
  margin-top: ${(props) => {
    return props.top;
  }};
`;

const DataInput = styled.input`
  border: none;
  background-color: #fafafa;
  width: 800px;
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  padding-left: 5px;
  margin-top: ${(props) => {
    return props.top;
  }};
`;

const Hr = styled.hr`
  margin-top: 40px;
  background-color: #d9d9d9;
`;

const StayDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: (10, 1fr);
`;

const BtnArea = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  display: grid;
  place-items: center;
`;

const RadioDiv = styled.div`
  display: flex; /* 수정: 수평 정렬을 위해 flexbox 추가 */
  align-items: center; /* 수정: 체크박스와 텍스트를 세로로 정렬 */
  margin-top: 40px;

  & > input {
    visibility: hidden;
  }

  & > label {
    position: relative;
    width: 20px;
    height: 20px;
    cursor: pointer;
    margin-right: 10px;
    background: #fcfff4;
    border-radius: 4px;
    box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);

    &:after {
      content: "";
      width: 14px;
      height: 8px;
      position: absolute;
      top: 2px;
      left: 2px;
      border: 3px solid #333;
      border-top: none;
      border-right: none;
      background: transparent;
      opacity: 0;
      transform: rotate(-45deg);
    }
  }

  & > input:checked + label:after {
    opacity: 1;
  }
`;

const RadioArea = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
`;

const TextDiv = styled.div`
  margin-top: 40px;
  height: ${(props) => props.height};
  font-size: 20px;
  font-weight: 400;
  margin-right: ${(props) => props.right};
`;

const StayEnrollReqDetail = () => {
  const [hostVo, setHostVo] = useState({});
  const [stayVo, setStayVo] = useState({});
  const { enrollReqNo } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fd = new FormData();
    fd.append("enrollReqNo", enrollReqNo);
    fetch(`${BASE_URL}/api/admin/stayEnrollReqDetail`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setHostVo(data.hostVo);
        setStayVo(data.stayVo);
      });
  }, []);

  const formatPhoneNumber = (phone) => {
    phone = String(phone);
    if (phone.length > 10) {
      return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
    } else if (phone.length > 9) {
      return phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3");
    } else {
      return phone.replace(/(\d{2})(\d{3})(\d{4})/, "$1-$2-$3");
    }
  };

  const formatBrn = (brn) => {
    brn = String(brn);
    return brn.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
  };

  const moveRoomDetail = () => {
    navigate(`/adminMenu/roomEnrollReqDetail/${stayVo.no}`);
  };

  return (
    <>
      <HomeDiv>
        <div></div>
        <MainDiv>
          <div>
            <HeaderDiv
              size="40px"
              color="#black"
              weight="600"
              margin="20px"
              marginBot="70px"
            >
              스테이 입점 신청
            </HeaderDiv>
          </div>
          <UserDiv>
            <EnrollHeader>호스트 정보</EnrollHeader>
            <div></div>
            <DataTitle>호스트 성함 *</DataTitle>
            <div>
              <DataInput type="text" value={hostVo.name} readOnly />
            </div>
            <DataTitle top="15px">호스트 전화번호 *</DataTitle>
            <div>
              <DataInput
                type="text"
                value={formatPhoneNumber(hostVo.phone)}
                top="15px"
                readOnly
              />
            </div>
            <DataTitle top="20px">호스트 이메일 *</DataTitle>
            <div>
              <DataInput
                type="email"
                value={hostVo.email}
                top="20px"
                readOnly
              />
            </div>
          </UserDiv>
          <div>
            <Hr />
          </div>
          <StayDiv>
            <EnrollHeader>스테이 정보</EnrollHeader>
            <div></div>
            <DataTitle top="40px">스테이 이름 *</DataTitle>
            <DataInput type="text" name="name" value={stayVo.name} top="40px" />

            <DataTitle top="40px">스테이 주소 *</DataTitle>
            <DataInput type="text" top="40px" value={stayVo.address} />

            <DataTitle top="40px">스테이 전화번호 *</DataTitle>
            <DataInput
              type="text"
              name="phone"
              value={formatPhoneNumber(stayVo.phone)}
              top="40px"
            />
            <DataTitle top="40px">스테이 SNS *</DataTitle>
            <DataInput type="text" name="sns" value={stayVo.sns} top="40px" />
            <DataTitle top="40px">스테이 업종명 *</DataTitle>
            <DataInput
              type="text"
              name="business_type"
              value={stayVo.businessTypeName}
              top="40px"
            />
            <DataTitle top="40px">사업자 등록번호 *</DataTitle>
            <DataInput
              type="text"
              name="brn"
              value={formatBrn(stayVo.brn)}
              top="40px"
            />
            <DataTitle top="40px">스테이 태그라인 *</DataTitle>
            <DataInput
              type="text"
              name="tagline"
              value={stayVo.tagline}
              top="40px"
            />
            <DataTitle top="40px">스테이 소개 *</DataTitle>
            <TextDiv height="150px">{stayVo.introduction}</TextDiv>
            <DataTitle top="40px">추천 계절 *</DataTitle>
            <RadioArea>
              <RadioDiv>
                <input
                  type="radio"
                  name="season"
                  id="봄"
                  checked={stayVo.season === "봄"}
                />
                <label for="spring" />
                <span>봄</span>
              </RadioDiv>
              <RadioDiv>
                <input
                  type="radio"
                  name="season"
                  id="여름"
                  checked={stayVo.season === "여름"}
                />
                <label for="summer" />
                <span>여름</span>
              </RadioDiv>
              <RadioDiv>
                <input
                  type="radio"
                  name="season"
                  id="가을"
                  checked={stayVo.season === "가을"}
                />
                <label for="fall" />
                <span>가을</span>
              </RadioDiv>
              <RadioDiv>
                <input
                  type="radio"
                  name="season"
                  id="겨울"
                  checked={stayVo.season === "겨울"}
                />
                <label for="winter" />
                <span>겨울</span>
              </RadioDiv>
            </RadioArea>
          </StayDiv>
          <BtnArea>
            <HostBtn
              border="none"
              width="400px"
              height="50px"
              font="25px"
              color="white"
              backColor="#2B8C44"
              str="다음"
              f={moveRoomDetail}
            />
          </BtnArea>
        </MainDiv>
        <div></div>
      </HomeDiv>
    </>
  );
};

export default StayEnrollReqDetail;
