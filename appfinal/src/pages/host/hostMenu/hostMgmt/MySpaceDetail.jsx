import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import HostBtn from "../../hostComponents/HostBtn";
import AttachmentUpload from "../../hostComponents/AttachmentUpload";
import { jwtDecode } from "jwt-decode";
import Alert from "../../../../components/Alert";
import { BASE_URL } from "../../../../components/service/config";

const HomeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
`;
const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 0.3fr 0.3fr;
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
  color: ${(props) => props.color};
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const DataInput3 = styled.input`
  display: inline-block;
  border: none;
  border-bottom: 1px solid black;
  background-color: #fafafa;
  width: ${(props) => {
    return props.width;
  }};
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  line-height: 5;
  text-align: center;
  margin-top: ${(props) => {
    return props.top;
  }};
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
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
  color: gray;
`;

const Hr = styled.hr`
  margin-bottom: 30px;
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
  color: ${(props) => props.color};
`;

const Span2 = styled.span`
  font-size: 20px;
  color: red;
  margin-left: 970px;
  width: 110px;
  cursor: pointer;
`;

const BtnArea = styled.div`
  margin-top: 80px;
  margin-bottom: 80px;
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
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

const MySpaceDetail = () => {
  const { spaceNum } = useParams();
  const [formData, setFormData] = useState({
    business_type_no: "1",
  });
  const [featuresArr, setFeaturesArr] = useState([]);
  const [fileData, setFileData] = useState({});
  const navigate = useNavigate();
  const [hostNo, setHostNo] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const [isAlertOpen3, setIsAlertOpen3] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setHostNo(decodedToken.no);
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, []);

  useEffect(() => {
    fetch(`${BASE_URL}/api/host/mySpaceDetail`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(spaceNum),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFormData(data.spaceVo);
        setFeaturesArr(data.featuresList);
        setFileData(data.attachMap);
      });
  }, []);

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

  const editSpace = () => {
    const fd = new FormData();
    fd.append("hostNo", hostNo);
    fd.append("no", spaceNum);
    fd.append("phone", formData.phone);
    fd.append("sns", formData.sns);
    fd.append("tagline", formData.tagline);
    fd.append("introduction", formData.introduction);
    fd.append("standardGuest", formData.standardGuest);
    fd.append("maxGuest", formData.maxGuest);
    fd.append("daytimePrice", formData.daytimePrice);
    fd.append("nightPrice", formData.nightPrice);
    fd.append("features", featuresArr);
    if (fileData.thumbnail instanceof File) {
      fd.append("thumbnail", fileData.thumbnail);
    }
    fileData.attachment.forEach(
      (file) => file instanceof File && fd.append("attachment", file)
    );
    fetch(`${BASE_URL}/api/host/modifyMySpace`, {
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

  const deleteSpace = () => {
    fetch(`${BASE_URL}/api/host/deleteMySpace`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(spaceNum),
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data > 0) {
          setIsAlertOpen2(true);
        } else {
          setIsAlertOpen3(true);
        }
      });
  };

  const formatBrn = (brn) => {
    brn = String(brn);
    return brn.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
  };

  const moveList = () => {
    navigate("/hostMenu/hostMgmtMenu/mySpaceMgmt");
    window.scrollTo(0, 0);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navigate("/hostMenu/hostMgmtMenu/mySpaceMgmt");
    window.scrollTo(0, 0);
  };

  const handleAlertClose2 = () => {
    setIsAlertOpen(false);
    navigate("/hostMenu/hostMgmtMenu/mySpaceMgmt");
    window.scrollTo(0, 0);
  };

  const handleAlertClose3 = () => {
    setIsAlertOpen(false);
    navigate("/hostMenu/hostMgmtMenu/mySpaceMgmt");
    window.scrollTo(0, 0);
  };

  return (
    <>
      <form>
        <HomeDiv>
          <div></div>
          <MainDiv>
            <div>
              <HeaderDiv
                size="50px"
                color="black"
                weight="600"
                margin="20px"
                marginBot="70px"
              >
                내 공간 관리
              </HeaderDiv>
              <Span2 onClick={deleteSpace}>입점 삭제하기</Span2>
              <Hr />
            </div>
            <SpaceDiv>
              <EnrollHeader>스페이스 정보</EnrollHeader>
              <div></div>
              <DataTitle top="40px">스페이스 이름 *</DataTitle>
              <DataInput
                color="gray"
                type="text"
                name="name"
                top="40px"
                value={formData.name}
              />
              <DataTitle top="40px">스페이스 주소 *</DataTitle>
              <DataInput
                color="gray"
                type="text"
                name="address"
                top="40px"
                value={formData.address}
              />
              <DataTitle top="40px">스페이스 전화번호 *</DataTitle>
              <DataInput
                type="number"
                name="phone"
                top="40px"
                value={formData.phone}
                onChange={handleChange}
              />
              <DataTitle top="40px">스페이스 SNS *</DataTitle>
              <DataInput
                type="text"
                name="sns"
                top="40px"
                value={formData.sns}
                onChange={handleChange}
              />
              <DataTitle top="40px">스페이스 업종명 *</DataTitle>
              <div>
                <DataSelect
                  name="business_type_no"
                  value={formData.businessTypeNo}
                  readOnly
                >
                  <option value="1">숙박</option>
                  <option value="2">공간 대여</option>
                </DataSelect>
              </div>
              <DataTitle top="40px">사업자 등록번호 *</DataTitle>
              <DataInput
                color="gray"
                type="text"
                name="brn"
                top="40px"
                value={formatBrn(formData.brn)}
              />
              <DataTitle top="40px">스테이 태그라인 *</DataTitle>
              <DataInput
                type="text"
                name="tagline"
                top="40px"
                value={formData.tagline}
                onChange={handleChange}
              />
              <DataTitle top="40px">스페이스 소개 *</DataTitle>
              <TextArea
                name="introduction"
                placeholder="스테이의 구조, 컨셉, 스토리 등을 자유롭게 작성해 주세요. (최소 50자)"
                value={formData.introduction}
                onChange={handleChange}
              />
              <DataTitle top="40px">스페이스 수용인원 *</DataTitle>
              <div>
                <Span>기준 : </Span>
                <DataInput3
                  width="60px"
                  type="number"
                  name="standardGuest"
                  top="40px"
                  Value={formData.standardGuest}
                  onChange={handleChange}
                />
                <Span>/</Span>
                <Span>최대 : </Span>
                <DataInput3
                  width="60px"
                  type="number"
                  name="maxGuest"
                  top="40px"
                  value={formData.maxGuest}
                  onChange={handleChange}
                />
              </div>
              <DataTitle top="40px">스페이스 가격 *</DataTitle>
              <div>
                <Span>낮 : </Span>
                <DataInput3
                  width="130px"
                  type="number"
                  name="daytimePrice"
                  top="40px"
                  value={formData.daytimePrice}
                  onChange={handleChange}
                />
                <Span>/</Span>
                <Span>밤 : </Span>
                <DataInput3
                  width="130px"
                  type="number"
                  name="nightPrice"
                  top="40px"
                  value={formData.nightPrice}
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
              <div>
                <DataTitle top="40px">스페이스 평면도 *</DataTitle>
              </div>

              <div>
                <AttachmentUpload
                  fileData={fileData}
                  setFileData={setFileData}
                  name="space_floor_plan"
                  func="true"
                  isDisabled="true"
                  color="gray"
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
              <div></div>
              <HostBtn
                border="none"
                width="300px"
                height="50px"
                font="25px"
                backColor="#2B8C44"
                str="목록가기"
                color="white"
                f={moveList}
              />
              <HostBtn
                border="1px solid #2B8C44"
                width="300px"
                height="50px"
                font="25px"
                backColor="white"
                str="수정하기"
                color="black"
                f={editSpace}
              />
            </BtnArea>
          </MainDiv>
        </HomeDiv>
      </form>
      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="내 공간 수정"
            titleColor="#049dd9"
            message="수정 요청되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}

      {isAlertOpen2 && (
        <Backdrop>
          <Alert
            title="내 공간 입점삭제"
            titleColor="#049dd9"
            message="입점 삭제되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose2}
          />
        </Backdrop>
      )}

      {isAlertOpen3 && (
        <Backdrop>
          <Alert
            title="내 공간 입접삭제"
            titleColor="red"
            message="입점 삭제 불가능합니다. 이용 완료되지 않은 예약 내역이 있습니다."
            buttonText="확인"
            buttonColor="red"
            onClose={handleAlertClose3}
          />
        </Backdrop>
      )}
    </>
  );
};

export default MySpaceDetail;
