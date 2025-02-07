import React, { useState } from "react";
import styled from "styled-components";
import HostBtn from "../hostComponents/HostBtn";
import Address from "../../../components/address/Address";

const HomeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
`;
const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 0.5fr 0.5fr 0.3fr 2fr 0.5fr;
`;

const UserDiv = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr 3fr;
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

const DataTitle2 = styled.div`
  color: red;
  font-size: 15px;
  font-weight: 300;
  margin-top: 10px;
  margin-left: 60px;
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

const DataInput2 = styled.input`
  display: inline-block;
  border: none;
  border-bottom: 1px solid black;
  background-color: #fafafa;
  width: 250px;
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  line-height: 5;
  text-align: center;
  margin-top: ${(props) => {
    return props.top;
  }};
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

const Hr = styled.hr`
  margin-top: 60px;
  background-color: #d9d9d9;
`;

const SpaceDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: (14, 1fr);
`;

const TextArea = styled.textarea`
  height: 150px;
  margin-top: 35px;
  border-radius: 5px;
  resize: none;
`;

const Span = styled.span`
  font-size: 25px;
  margin-left: 20px;
  margin-right: 20px;
`;

const BtnArea = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  display: grid;
  place-items: center;
`;

const SecondEnrollSpace = () => {
  const [value, setValue] = useState("");
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const changeValue1 = (e) => {
    let inputValue = e.target.value;

    // 숫자만 입력 허용 & 10자리 제한 적용
    inputValue = inputValue.replace(/\D/g, "").slice(0, 10);
    setValue(inputValue);
    handleChange(e);
  };

  const changeValue2 = (e) => {
    let inputValue = e.target.value;

    // 숫자만 입력 허용 & 10자리 제한 적용
    inputValue = inputValue.replace(/\D/g, "").slice(0, 11);
    setValue(inputValue);
    handleChange(e);
  };

  const f01 = () => {
    console.log("formData : ", formData);
  };

  return (
    <>
      <form>
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
                스페이스 신청
              </HeaderDiv>
            </div>
            <UserDiv>
              <EnrollHeader>호스트 정보</EnrollHeader>
              <div></div>
              <DataTitle>호스트 성함 *</DataTitle>
              <div>
                <DataInput type="text" value={"홍길동"} readOnly />
              </div>
              <DataTitle>호스트 전화번호 *</DataTitle>
              <div>
                <DataInput type="number" value={"01011112222"} readOnly />
              </div>
              <DataTitle>호스트 이메일 *</DataTitle>
              <div>
                <DataInput
                  type="email"
                  value={"khAcademy362@kh.co.kr"}
                  readOnly
                />
              </div>
            </UserDiv>
            <div>
              <Hr />
            </div>
            <SpaceDiv>
              <EnrollHeader>스페이스 정보</EnrollHeader>
              <div></div>
              <DataTitle top="40px">스페이스 이름 *</DataTitle>
              <DataInput
                type="text"
                name="name"
                placeholder="스페이스 이름을 입력해주세요."
                top="40px"
                onChange={handleChange}
              />
              <DataTitle top="40px">스페이스 주소 *</DataTitle>
              <div>
                <Address
                  w1="600px"
                  w2="800px"
                  t1="30px"
                  t2="20px"
                  setFormData={setFormData}
                />
              </div>
              <DataTitle top="40px">스페이스 전화번호 *</DataTitle>
              <DataInput
                type="phone"
                name="phone"
                placeholder="스페이스 전화번호를 입력해주세요."
                top="40px"
                onChange={changeValue2}
              />
              <DataTitle top="40px">스페이스 SNS *</DataTitle>
              <DataInput
                type="text"
                name="sns"
                placeholder="스페이스 공간/브랜드를 볼 수 있는 웹사이트 및 SNS를 입력해주세요."
                top="40px"
                onChange={handleChange}
              />
              <DataTitle top="40px">스페이스 업종명 *</DataTitle>
              <div>
                <DataList
                  list="business_type"
                  name="business_type_no"
                  onChange={handleChange}
                />
                <datalist id="business_type">
                  <option value="스페이스1" />
                  <option value="스페이스2" />
                </datalist>
              </div>
              <DataTitle top="40px">사업자 등록번호 *</DataTitle>
              <DataInput
                type="number"
                name="brn"
                placeholder="사업자 등록번호 10글자를 입력해주세요."
                top="40px"
                value={value}
                onChange={changeValue1}
              />
              <DataTitle top="40px">스페이스 소개 *</DataTitle>
              <TextArea
                name="introduction"
                placeholder="스테이의 구조, 컨셉, 스토리 등을 자유롭게 작성해 주세요. (최소 50자)"
                onChange={handleChange}
              />
              <DataTitle top="40px">스페이스 수용인원 *</DataTitle>
              <div>
                <DataInput2
                  type="number"
                  name="standard_guest"
                  top="40px"
                  placeholder="최소 수용인원"
                  onChange={handleChange}
                />
                <Span>/</Span>
                <DataInput2
                  type="number"
                  name="max_guest"
                  top="40px"
                  placeholder="최대 수용인원"
                  onChange={handleChange}
                />
              </div>
              <DataTitle top="40px">스페이스 가격 *</DataTitle>
              <div>
                <DataInput2
                  type="number"
                  name="daytime_price"
                  top="40px"
                  placeholder="낮 패키지 가격"
                  onChange={handleChange}
                />
                <Span>/</Span>
                <DataInput2
                  type="number"
                  name="night_price"
                  top="40px"
                  placeholder="밤 패키지 가격"
                  onChange={handleChange}
                />
              </div>
              <DataTitle top="40px">스페이스 편의시설 *</DataTitle>
              <DataInput2
                type="number"
                name="max_guest"
                top="40px"
                placeholder="라디오 버튼"
              />
              <DataTitle top="40px">스페이스 평면도 *</DataTitle>
              <DataInput2 type="file" name="space_floor_plan" top="40px" />
              <DataTitle top="40px">스페이스 대표사진 *</DataTitle>
              <DataInput2 type="file" name="thumbnail" top="40px" />
              <div>
                <DataTitle top="40px">스페이스 사진 첨부파일 *</DataTitle>
                <DataTitle2>*최소 3장 이상</DataTitle2>
              </div>
              <DataInput2 type="file" name="f" top="40px" />
            </SpaceDiv>
            <BtnArea>
              <HostBtn
                width="400px"
                height="50px"
                font="25px"
                backColor="#2B8C44"
                str="제출하기"
                f={f01}
              />
            </BtnArea>
          </MainDiv>
        </HomeDiv>
      </form>
    </>
  );
};

export default SecondEnrollSpace;
