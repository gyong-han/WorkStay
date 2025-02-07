import React, { useState } from "react";
import styled from "styled-components";
import Address from "../../../components/address/Address";
import HostBtn from "../hostComponents/HostBtn";
import { useNavigate } from "react-router-dom";

const HomeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
`;

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 1fr 0.3fr 2fr 0.5fr;
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
  border-bottom: 1px solid black;
  background-color: #fafafa;
  width: 800px;
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  line-height: 5;
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
  grid-template-rows: (8, 1fr);
`;

const DataList = styled.input`
  border: 0.5px solid black;
  width: 150px;
  height: 30px;
  font-size: 20px;
  font-weight: 400;
  margin-top: 37px;
  border-radius: 8px;
  line-height: 3;
  text-align: center;
  appearance: none;
  background: url("https://cdn.iconscout.com/icon/premium/png-256-thumb/triangle-down-5065327-4219907.png?f=webp")
    no-repeat right;
  background-size: 13px;
`;

const TextArea = styled.textarea`
  height: 150px;
  margin-top: 35px;
  border-radius: 5px;
`;

const BtnArea = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  display: grid;
  place-items: center;
`;

const SecondEnrollStay = () => {
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const changeValue = (e) => {
    let inputValue = e.target.value;

    // 숫자만 입력 허용 & 10자리 제한 적용
    inputValue = inputValue.replace(/\D/g, "").slice(0, 10);
    setValue(inputValue);
    handleChange(e);
  };

  //fetch함수
  const f01 = () => {
    console.log("formData : ", formData);
    navigate("/enroll/stay/third/1");
  };

  return (
    <>
      <HomeDiv>
        <div></div>
        <MainDiv>
          <div>
            <HeaderDiv size="50px" color="black" margin="30px" weight="600">
              Do you want to be a host?
            </HeaderDiv>
            <HeaderDiv
              size="40px"
              color="#2B8C44"
              weight="500"
              margin="10px"
              marginBot="70px"
            >
              스테이 신청
            </HeaderDiv>
          </div>
          <UserDiv>
            <EnrollHeader>호스트 정보</EnrollHeader>
            <div></div>
            <DataTitle>호스트 성함 *</DataTitle>
            <div>
              <DataInput type="text" value={"홍길동"} readOnly />
            </div>
            <DataTitle top="15px">호스트 전화번호 *</DataTitle>
            <div>
              <DataInput
                type="number"
                value={"01011112222"}
                top="15px"
                readOnly
              />
            </div>
            <DataTitle top="20px">호스트 이메일 *</DataTitle>
            <div>
              <DataInput
                type="email"
                value={"khAcademy362@kh.co.kr"}
                top="20px"
                readOnly
              />
            </div>
          </UserDiv>
          <div>
            <Hr />
          </div>
          <StayDiv>
            <EnrollHeader>스페이스 정보</EnrollHeader>
            <div></div>
            <DataTitle top="40px">스테이 이름 *</DataTitle>
            <DataInput
              type="text"
              name="name"
              placeholder="스테이 이름을 입력해주세요."
              top="40px"
              onChange={handleChange}
            />
            <DataTitle top="40px">스테이 주소 *</DataTitle>
            <div>
              <Address
                w1="600px"
                w2="800px"
                t1="30px"
                t2="20px"
                setFormData={setFormData}
              />
            </div>
            <DataTitle top="40px">스테이 전화번호 *</DataTitle>
            <DataInput
              type="phone"
              name="phone"
              placeholder="스테이 전화번호를 입력해주세요."
              top="40px"
              onChange={handleChange}
            />
            <DataTitle top="40px">스테이 SNS *</DataTitle>
            <DataInput
              type="text"
              name="sns"
              placeholder="스테이 공간/브랜드를 볼 수 있는 웹사이트 및 SNS를 입력해주세요."
              top="40px"
              onChange={handleChange}
            />
            <DataTitle top="40px">스테이 업종명 *</DataTitle>
            <div>
              <DataList
                list="business_type"
                name="business_type_no"
                onChange={handleChange}
              />
              <datalist id="business_type">
                <option value="스테이1" />
                <option value="스테이2" />
              </datalist>
            </div>
            <DataTitle top="40px">사업자 등록번호 *</DataTitle>
            <DataInput
              type="number"
              name="brn"
              placeholder="사업자 등록번호 10글자를 입력해주세요."
              top="40px"
              value={value}
              onChange={changeValue}
            />
            <DataTitle top="40px">스테이 소개 *</DataTitle>
            <TextArea
              name="introduction"
              placeholder="스테이의 구조, 컨셉, 스토리 등을 자유롭게 작성해 주세요. (최소 50자)"
              onChange={handleChange}
            />
          </StayDiv>
          <BtnArea>
            <HostBtn
              width="400px"
              height="50px"
              font="25px"
              backColor="#2B8C44"
              str="다음"
              f={f01}
            />
          </BtnArea>
        </MainDiv>
        <div></div>
      </HomeDiv>
    </>
  );
};

export default SecondEnrollStay;
