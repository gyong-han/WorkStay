import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import HostBtn from "../host/hostComponents/HostBtn";
import { jwtDecode } from "jwt-decode";
import Alert from "../../components/Alert";
import { BASE_URL } from "../../components/service/config";

const HomeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
`;
const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 0.5fr 0.3fr 2fr 0.5fr;
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

const DataInput2 = styled.input`
  display: inline-block;
  border: none;
  background-color: #fafafa;
  width: 250px;
  height: 25px;
  outline: none;
  font-size: 25px;
  font-weight: 400;
  text-align: center;
  margin-top: ${(props) => {
    return props.top;
  }};
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

const Span = styled.span`
  font-size: 25px;
  margin-left: 20px;
  margin-right: 20px;
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
  }

  & > input:checked + label:after {
    opacity: 1;
  }
`;

const StyledImg = styled.img`
  margin-top: 40px;
  width: 100px;
  height: 100px;
  margin-right: 10px;
  transition: transform 0.3s ease; //화면전환 부드럽게 해줌
  cursor: pointer;
  &:hover {
    transform: scale(2);
  }
`;

const TextDiv = styled.div`
  margin-top: 40px;
  height: ${(props) => props.height};
  font-size: 20px;
  font-weight: 400;
  margin-right: ${(props) => props.right};
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

const SpaceEnrollReqDetail = () => {
  const { enrollReqNo } = useParams();
  const [hostVo, setHostvo] = useState({});
  const [spaceVo, setSpaceVo] = useState({});
  const [featuresList, setFeaturesList] = useState([]);
  const [spaceFloorPlan, setSpaceFloorPlan] = useState({});
  const [spaceThumbNail, setSpaceThumbNail] = useState({});
  const [spaceAttachList, setSpaceAttachList] = useState([]);
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);
  const [isAlertOpen3, setIsAlertOpen3] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setRole(decodedToken.pageNick); // 상태 업데이트
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fd = new FormData();
    fd.append("enrollReqNo", enrollReqNo);
    fetch(`${BASE_URL}/api/admin/spaceEnrollReqDetail`, {
      method: "POST",
      headers: {},
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setHostvo(data.hostVo);
        setSpaceVo(data.spaceVo);
        setFeaturesList(data.featuresList);
        setSpaceFloorPlan(data.spaceFloorPlan);
        setSpaceThumbNail(data.spaceThumbNail);
        setSpaceAttachList(data.spaceAttachList);
      });
  }, []);

  const approve = () => {
    const fd = new FormData();
    fd.append("hostNo", hostVo.no);
    fd.append("spaceNo", enrollReqNo);
    fetch(`${BASE_URL}/api/admin/approveSpace`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data > 0) {
          setIsAlertOpen(true);
        }
      });
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navigate("/adminMenu/spaceEnrollReq");
    window.scrollTo(0, 0);
  };

  const companion = () => {
    const fd = new FormData();
    fd.append("spaceNo", enrollReqNo);
    fetch(`${BASE_URL}/api/admin/companionSpace`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data > 0) {
          setIsAlertOpen2(true);
        }
      });
  };

  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
    navigate("/adminMenu/spaceEnrollReq");
    window.scrollTo(0, 0);
  };

  const cancelEnroll = () => {
    const fd = new FormData();
    fd.append("spaceNo", enrollReqNo);
    fetch(`${BASE_URL}/api/host/cancelEnrollSpace`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data > 0) {
          setIsAlertOpen3(true);
        }
      });
  };

  const handleAlertClose3 = () => {
    setIsAlertOpen3(false);
    navigate("/hostMenu/hostMgmtMenu/spaceApprovalMgmt");
    window.scrollTo(0, 0);
  };

  const moveMenu = () => {
    navigate("/hostMenu/hostMgmtMenu/spaceApprovalMgmt");
    window.scrollTo(0, 0);
  };

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

  const statusNo = spaceVo.statusNo;
  return (
    <>
      <>
        <form>
          <HomeDiv>
            <div></div>
            <MainDiv>
              <div>
                <HeaderDiv
                  size="40px"
                  color="black"
                  weight="600"
                  margin="20px"
                  marginBot="70px"
                >
                  스페이스 입점 요청
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
                  value={spaceVo.name}
                  top="40px"
                />
                <DataTitle top="40px">스페이스 주소 *</DataTitle>

                <DataInput type="text" top="40px" value={spaceVo.address} />

                <DataTitle top="40px">스페이스 전화번호 *</DataTitle>
                <DataInput
                  type="text"
                  name="phone"
                  value={formatPhoneNumber(spaceVo.phone)}
                  top="40px"
                />
                <DataTitle top="40px">스페이스 SNS *</DataTitle>
                <DataInput
                  type="text"
                  name="sns"
                  value={spaceVo.sns}
                  top="40px"
                />
                <DataTitle top="40px">스페이스 업종명 *</DataTitle>
                <DataInput
                  type="text"
                  name="business_type"
                  value={spaceVo.businessTypeName}
                  top="40px"
                />
                <DataTitle top="40px">사업자 등록번호 *</DataTitle>
                <DataInput
                  type="text"
                  name="brn"
                  value={formatBrn(spaceVo.brn)}
                  top="40px"
                />
                <DataTitle top="40px">스테이 태그라인 *</DataTitle>
                <DataInput
                  type="text"
                  name="tagline"
                  value={spaceVo.tagline}
                  top="40px"
                />
                <DataTitle top="40px">스페이스 소개 *</DataTitle>
                <TextDiv height="150px">{spaceVo.introduction}</TextDiv>
                <DataTitle top="40px">스페이스 수용인원 *</DataTitle>
                <div>
                  <DataInput2
                    type="text"
                    name="standard_guest"
                    top="40px"
                    value={`기준 : ${spaceVo.standardGuest}명`}
                  />
                  <Span>/</Span>
                  <DataInput2
                    type="text"
                    name="max_guest"
                    top="40px"
                    value={`최대 : ${spaceVo.maxGuest}명`}
                  />
                </div>
                <DataTitle top="40px">스페이스 가격 *</DataTitle>
                <div>
                  <DataInput2
                    type="text"
                    name="daytime_price"
                    top="40px"
                    value={`낮 : ${Number(
                      spaceVo.daytimePrice
                    ).toLocaleString()}원`}
                  />
                  <Span>/</Span>
                  <DataInput2
                    type="text"
                    name="night_price"
                    top="40px"
                    value={`낮 : ${Number(
                      spaceVo.nightPrice
                    ).toLocaleString()}원`}
                  />
                </div>
                <DataTitle top="40px">스페이스 편의시설 *</DataTitle>
                <CheckBoxArea>
                  <CheckDiv>
                    <input
                      type="checkbox"
                      value="1"
                      id="checkbox1"
                      checked={featuresList.includes("1")}
                    />
                    <label for="checkbox1" />
                    <span>무료 주차</span>
                  </CheckDiv>
                  <CheckDiv>
                    <input
                      type="checkbox"
                      value="2"
                      id="checkbox2"
                      checked={featuresList.includes("2")}
                    />
                    <label for="checkbox2" />
                    <span>와이파이</span>
                  </CheckDiv>
                  <CheckDiv>
                    <input
                      type="checkbox"
                      value="3"
                      id="checkbox3"
                      checked={featuresList.includes("3")}
                    />
                    <label for="checkbox3" />
                    <span>회의실</span>
                  </CheckDiv>
                  <CheckDiv>
                    <input
                      type="checkbox"
                      value="4"
                      id="checkbox4"
                      checked={featuresList.includes("4")}
                    />
                    <label for="checkbox4" />
                    <span>PC/모니터</span>
                  </CheckDiv>
                  <CheckDiv>
                    <input
                      type="checkbox"
                      value="5"
                      id="checkbox5"
                      checked={featuresList.includes("5")}
                    />
                    <label for="checkbox5" />
                    <span>빔 프로젝터</span>
                  </CheckDiv>
                  <CheckDiv>
                    <input
                      type="checkbox"
                      value="7"
                      id="checkbox7"
                      checked={featuresList.includes("7")}
                    />
                    <label for="checkbox7" />
                    <span>음향/마이크</span>
                  </CheckDiv>
                  <CheckDiv>
                    <input
                      type="checkbox"
                      value="8"
                      id="checkbox8"
                      checked={featuresList.includes("8")}
                    />
                    <label for="checkbox8" />
                    <span>반려동물 동반가능</span>
                  </CheckDiv>
                  <CheckDiv>
                    <input
                      type="checkbox"
                      value="11"
                      id="checkbox11"
                      checked={featuresList.includes("11")}
                    />
                    <label for="checkbox11" />
                    <span>주방</span>
                  </CheckDiv>
                  <CheckDiv>
                    <input
                      type="checkbox"
                      value="12"
                      id="checkbox12"
                      checked={featuresList.includes("12")}
                    />
                    <label for="checkbox12" />
                    <span>샤워 시설</span>
                  </CheckDiv>
                  <CheckDiv>
                    <input
                      type="checkbox"
                      value="13"
                      id="checkbox13"
                      checked={featuresList.includes("13")}
                    />
                    <label for="checkbox13" />
                    <span>정원</span>
                  </CheckDiv>
                </CheckBoxArea>
                <DataTitle top="40px">스페이스 평면도 *</DataTitle>
                <div>
                  <StyledImg src={spaceFloorPlan.filePath} alt="평면도" />
                </div>
                <DataTitle top="40px">스페이스 대표사진 *</DataTitle>
                <div>
                  <StyledImg src={spaceThumbNail.filePath} alt="대표사진진" />
                </div>
                <div>
                  <DataTitle top="40px">스페이스 사진 첨부파일 *</DataTitle>
                </div>
                <div>
                  {spaceAttachList.map((data) => {
                    return <StyledImg src={data.filePath} alt="첨부파일" />;
                  })}
                </div>
              </SpaceDiv>
              <BtnArea>
                <div></div>
                {role === "HOST" || role === "GUEST" ? (
                  <>
                    <HostBtn
                      top="90px"
                      border="none"
                      width="300px"
                      height="60px"
                      font="25px"
                      backColor="#2B8C44"
                      str="목록가기"
                      color="white"
                      f={moveMenu}
                    />
                    <HostBtn
                      border="1px solid #2B8C44"
                      top="90px"
                      width="300px"
                      height="60px"
                      font="25px"
                      backColor="white"
                      str="입점 철회하기"
                      color={statusNo === 3 ? "gray" : "black"}
                      f={statusNo === 3 ? undefined : cancelEnroll}
                    />
                  </>
                ) : (
                  <>
                    <HostBtn
                      top="90px"
                      width="300px"
                      height="50px"
                      font="25px"
                      border="none"
                      backColor="#2B8C44"
                      str="반려하기"
                      color="white"
                      f={companion}
                    />
                    <HostBtn
                      border="1px solid #2B8C44"
                      top="90px"
                      width="300px"
                      height="50px"
                      font="25px"
                      backColor="white"
                      str="승인하기"
                      color="black"
                      f={approve}
                    />
                  </>
                )}

                <div></div>
              </BtnArea>
            </MainDiv>
          </HomeDiv>
        </form>
        {isAlertOpen && (
          <Backdrop>
            <Alert
              title="공간 입점 승인"
              titleColor="#049dd9"
              message="입점 승인되었습니다."
              buttonText="확인"
              buttonColor="#049dd9"
              onClose={handleAlertClose}
            />
          </Backdrop>
        )}
        {isAlertOpen2 && (
          <Backdrop>
            <Alert
              title="공간 입점 반려"
              titleColor="#049dd9"
              message="입점 반려되었습니다."
              buttonText="확인"
              buttonColor="#049dd9"
              onClose={handleAlertClose2}
            />
          </Backdrop>
        )}
        {isAlertOpen3 && (
          <Backdrop>
            <Alert
              title="공간 입점 철회회"
              titleColor="#049dd9"
              message="입점 철회되었습니다."
              buttonText="확인"
              buttonColor="#049dd9"
              onClose={handleAlertClose3}
            />
          </Backdrop>
        )}
      </>
    </>
  );
};

export default SpaceEnrollReqDetail;
