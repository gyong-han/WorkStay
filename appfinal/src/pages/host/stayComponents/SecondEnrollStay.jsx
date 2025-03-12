import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Address from "../../../components/address/Address";
import HostBtn from "../hostComponents/HostBtn";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../../components/service/config";

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
  grid-template-rows: (10, 1fr);
`;

const DataSelect = styled.select`
  border: 0.5px solid black;
  width: 150px;
  height: 30px;
  font-size: 20px;
  font-weight: 400;
  margin-top: 37px;
  border-radius: 8px;
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
  resize: none;
  font-family: "Pretendard-Regular";
  font-size: 1.2rem;
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

    &:hover:after {
      opacity: 0.5;
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

const SecondEnrollStay = () => {
  const [phone, setPhone] = useState("");
  const [brn, setbrn] = useState("");
  const [formData, setFormData] = useState({
    business_type_no: "1",
  });
  const navigate = useNavigate();
  const [hostNo, setHostNo] = useState("");
  const [hostVo, setHostVo] = useState({
    name: "",
    phone: "",
    email: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const no = decodedToken.no;
      setHostNo(decodedToken.no);
      fetch(`${BASE_URL}/api/host/getHostVo`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(no),
      })
        .then((resp) => resp.json())
        .then((data) => {
          setHostVo(data);
        });
    }
  }, [hostNo]);

  const handleChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleChange2 = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.id,
      };
    });
  };

  const changephone = (e) => {
    //\d는 숫자를 의미, \D는 그 반대
    let inputValue = e.target.value.replace(/\D/g, "").slice(0, 11);

    setPhone(inputValue);
    setFormData((prev) => {
      return {
        ...prev,
        phone: inputValue,
      };
    });
  };

  const changebrn = (e) => {
    let inputValue = e.target.value.replace(/\D/g, "").slice(0, 10);
    setbrn(inputValue);
    setFormData((prev) => {
      return {
        ...prev,
        brn: inputValue,
      };
    });
  };

  //fetch함수
  const enrollStay = () => {
    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("address", formData.address);
    fd.append("phone", formData.phone);
    fd.append("sns", formData.sns);
    fd.append("businessTypeNo", formData.business_type_no);
    fd.append("brn", formData.brn);
    fd.append("tagline", formData.tagline);
    fd.append("season", formData.season);
    fd.append("introduction", formData.introduction);
    fd.append("hostNo", hostNo);

    fetch(`${BASE_URL}/api/host/enroll/stay`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.text())
      .then((data) => {
        navigate(`/enroll/stay/third/${data}`);
        window.scrollTo(0, 0);
      });
  };

  const formatPhoneNumber = (phone) => {
    phone = String(phone);
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
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
              value={phone}
              onChange={changephone}
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
              <DataSelect name="business_type_no" onChange={handleChange}>
                <option value="1">숙박</option>
                <option value="2">공간 대여</option>
              </DataSelect>
            </div>
            <DataTitle top="40px">사업자 등록번호 *</DataTitle>
            <DataInput
              type="number"
              name="brn"
              placeholder="사업자 등록번호 10글자를 입력해주세요."
              top="40px"
              value={brn}
              onChange={changebrn}
            />
            <DataTitle top="40px">스테이 태그라인 *</DataTitle>
            <DataInput
              type="text"
              name="tagline"
              placeholder="스테이를 한줄로 소개해주세요."
              top="40px"
              onChange={handleChange}
            />
            <DataTitle top="40px">스테이 소개 *</DataTitle>
            <TextArea
              name="introduction"
              placeholder="스테이의 구조, 컨셉, 스토리 등을 자유롭게 작성해 주세요. (최소 50자)"
              onChange={handleChange}
            />
            <DataTitle top="40px">추천 계절 *</DataTitle>
            <RadioArea>
              <RadioDiv>
                <input
                  type="radio"
                  name="season"
                  id="봄"
                  onChange={handleChange2}
                  checked={formData.season === "봄"}
                />
                <label for="봄" />
                <span>봄</span>
              </RadioDiv>
              <RadioDiv>
                <input
                  type="radio"
                  name="season"
                  id="여름"
                  onChange={handleChange2}
                  checked={formData.season === "여름"}
                />
                <label for="여름" />
                <span>여름</span>
              </RadioDiv>
              <RadioDiv>
                <input
                  type="radio"
                  name="season"
                  id="가을"
                  onChange={handleChange2}
                  checked={formData.season === "가을"}
                />
                <label for="가을" />
                <span>가을</span>
              </RadioDiv>
              <RadioDiv>
                <input
                  type="radio"
                  name="season"
                  id="겨울"
                  onChange={handleChange2}
                  checked={formData.season === "겨울"}
                />
                <label for="겨울" />
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
              f={enrollStay}
            />
          </BtnArea>
        </MainDiv>
        <div></div>
      </HomeDiv>
    </>
  );
};

export default SecondEnrollStay;
