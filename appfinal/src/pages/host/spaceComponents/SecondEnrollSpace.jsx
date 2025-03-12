import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HostBtn from "../hostComponents/HostBtn";
import Address from "../../../components/address/Address";
import AttachmentUpload from "../hostComponents/AttachmentUpload";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Alert from "../../../components/Alert";
import { BASE_URL } from "../../../components/service/config";

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

const Hr = styled.hr`
  margin-top: 60px;
  background-color: #d9d9d9;
`;

const SpaceDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: (15, 1fr);
`;

const TextArea = styled.textarea`
  height: 150px;
  margin-top: 35px;
  border-radius: 5px;
  font-family: "Pretendard-Regular";
  font-size: 1.2rem;
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

const CheckBoxArea = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr 1fr;
  margin-top: 40px;
`;

const CheckDiv = styled.div`
  display: flex; /* 수정: 수평 정렬을 위해 flexbox 추가 */
  align-items: center; /* 수정: 체크박스와 텍스트를 세로로 정렬 */
  margin-top: 10px;

  & > input {
    visibility: hidden;
  }

  & > label {
    position: relative;
    width: 15px;
    height: 15px;
    cursor: pointer;
    margin-right: 10px;
    background: #fcfff4;
    border-radius: 4px;
    box-shadow: inset 0px 1px 1px white, 0px 1px 3px rgba(0, 0, 0, 0.5);

    &:after {
      content: "";
      width: 9px;
      height: 5px;
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

const SecondEnrollSpace = () => {
  const [phone, setPhone] = useState("");
  const [brn, setbrn] = useState("");
  const [formData, setFormData] = useState({
    business_type_no: "1",
  });
  const [featuresArr, setFeaturesArr] = useState([]);
  const [fileData, setFileData] = useState({});
  const navigate = useNavigate();
  const [hostNo, setHostNo] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
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

  const handleCheckbox = (value) => {
    setFeaturesArr((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const changephone = (e) => {
    // 숫자만 입력 허용 & 11자리 제한 적용
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
    // 숫자만 입력 허용 & 10자리 제한 적용
    let inputValue = e.target.value.replace(/\D/g, "").slice(0, 10);
    setbrn(inputValue);
    setFormData((prev) => {
      return {
        ...prev,
        brn: inputValue,
      };
    });
  };

  const enrollSpace = () => {
    const fd = new FormData();
    fd.append("hostNo", hostNo);
    fd.append("name", formData.name);
    fd.append("address", formData.address);
    fd.append("phone", formData.phone);
    fd.append("sns", formData.sns);
    fd.append("businessTypeNo", formData.business_type_no);
    fd.append("brn", formData.brn);
    fd.append("tagline", formData.tagline);
    fd.append("introduction", formData.introduction);
    fd.append("standardGuest", formData.standard_guest);
    fd.append("maxGuest", formData.max_guest);
    fd.append("daytimePrice", formData.daytime_price);
    fd.append("nightPrice", formData.night_price);
    fd.append("features", featuresArr);
    fd.append("space_floor_plan", fileData.space_floor_plan);
    fd.append("thumbnail", fileData.thumbnail);
    fileData.attachment.map((file) => fd.append("attachment", file));

    fetch(`${BASE_URL}/api/host/enroll/space`, {
      method: "POST",
      headers: {},
      body: fd,
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data > 0) {
          setIsAlertOpen(true);
        }
      });
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navigate("/hostMenu/hostMgmtMenu/spaceApprovalMgmt");
    window.scrollTo(0, 0);
  };

  const formatPhoneNumber = (phone) => {
    phone = String(phone);
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
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
                <DataInput type="text" value={hostVo.name} readOnly />
              </div>
              <DataTitle>호스트 전화번호 *</DataTitle>
              <div>
                <DataInput
                  type="text"
                  value={formatPhoneNumber(hostVo.phone)}
                  readOnly
                />
              </div>
              <DataTitle>호스트 이메일 *</DataTitle>
              <div>
                <DataInput type="email" value={hostVo.email} readOnly />
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
                type="number"
                name="phone"
                placeholder="스페이스 전화번호를 입력해주세요."
                top="40px"
                value={phone}
                onChange={changephone}
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
                placeholder="스페이스를 한줄로 소개해주세요."
                top="40px"
                onChange={handleChange}
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
              <CheckBoxArea>
                <CheckDiv>
                  <input
                    type="checkbox"
                    value="1"
                    id="checkbox1"
                    onChange={() => handleCheckbox("1")}
                    checked={featuresArr.includes("1")}
                  />
                  <label for="checkbox1" />
                  <span>무료 주차</span>
                </CheckDiv>
                <CheckDiv>
                  <input
                    type="checkbox"
                    value="2"
                    id="checkbox2"
                    onChange={() => handleCheckbox("2")}
                    checked={featuresArr.includes("2")}
                  />
                  <label for="checkbox2" />
                  <span>와이파이</span>
                </CheckDiv>
                <CheckDiv>
                  <input
                    type="checkbox"
                    value="3"
                    id="checkbox3"
                    onChange={() => handleCheckbox("3")}
                    checked={featuresArr.includes("3")}
                  />
                  <label for="checkbox3" />
                  <span>회의실</span>
                </CheckDiv>
                <CheckDiv>
                  <input
                    type="checkbox"
                    value="4"
                    id="checkbox4"
                    onChange={() => handleCheckbox("4")}
                    checked={featuresArr.includes("4")}
                  />
                  <label for="checkbox4" />
                  <span>PC/모니터</span>
                </CheckDiv>
                <CheckDiv>
                  <input
                    type="checkbox"
                    value="5"
                    id="checkbox5"
                    onChange={() => handleCheckbox("5")}
                    checked={featuresArr.includes("5")}
                  />
                  <label for="checkbox5" />
                  <span>빔 프로젝터</span>
                </CheckDiv>
                <CheckDiv>
                  <input
                    type="checkbox"
                    value="7"
                    id="checkbox7"
                    onChange={() => handleCheckbox("7")}
                    checked={featuresArr.includes("7")}
                  />
                  <label for="checkbox7" />
                  <span>음향/마이크</span>
                </CheckDiv>
                <CheckDiv>
                  <input
                    type="checkbox"
                    value="8"
                    id="checkbox8"
                    onChange={() => handleCheckbox("8")}
                    checked={featuresArr.includes("8")}
                  />
                  <label for="checkbox8" />
                  <span>반려동물 동반가능</span>
                </CheckDiv>
                <CheckDiv>
                  <input
                    type="checkbox"
                    value="11"
                    id="checkbox11"
                    onChange={() => handleCheckbox("11")}
                    checked={featuresArr.includes("11")}
                  />
                  <label for="checkbox11" />
                  <span>주방</span>
                </CheckDiv>
                <CheckDiv>
                  <input
                    type="checkbox"
                    value="12"
                    id="checkbox12"
                    onChange={() => handleCheckbox("12")}
                    checked={featuresArr.includes("12")}
                  />
                  <label for="checkbox12" />
                  <span>샤워 시설</span>
                </CheckDiv>
                <CheckDiv>
                  <input
                    type="checkbox"
                    value="13"
                    id="checkbox13"
                    onChange={() => handleCheckbox("13")}
                    checked={featuresArr.includes("13")}
                  />
                  <label for="checkbox13" />
                  <span>정원</span>
                </CheckDiv>
              </CheckBoxArea>
              <DataTitle top="40px">스페이스 평면도 *</DataTitle>
              <div>
                <AttachmentUpload
                  fileData={fileData}
                  setFileData={setFileData}
                  name="space_floor_plan"
                  func="true"
                />
              </div>
              <DataTitle top="40px">스페이스 대표사진 *</DataTitle>
              <div>
                <AttachmentUpload
                  fileData={fileData}
                  setFileData={setFileData}
                  name="thumbnail"
                  func="true"
                />
              </div>
              <div>
                <DataTitle top="40px">스페이스 사진 첨부파일 *</DataTitle>
                <DataTitle2>*최소 3장 이상</DataTitle2>
              </div>
              <div>
                <AttachmentUpload
                  fileData={fileData}
                  setFileData={setFileData}
                  name="attachment"
                  isMultiple="true"
                  func="true"
                />
              </div>
            </SpaceDiv>
            <BtnArea>
              <HostBtn
                border="none"
                width="400px"
                height="50px"
                font="25px"
                backColor="#2B8C44"
                str="제출하기"
                color="white"
                f={enrollSpace}
              />
            </BtnArea>
          </MainDiv>
        </HomeDiv>
      </form>
      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="내 공간 입점신청"
            titleColor="#049dd9"
            message="입점 신청되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
    </>
  );
};

export default SecondEnrollSpace;
