import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import HostBtn from "../../hostComponents/HostBtn";
import { jwtDecode } from "jwt-decode";
import Alert from "../../../../components/Alert";
import { BASE_URL } from "../../../../components/service/config";

const HomeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
`;

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 0.2fr 0.3fr 2fr 0.5fr;
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
`;

const Hr = styled.hr`
  background-color: #d9d9d9;
  margin-bottom: 30px;
`;

const StayDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: (10, 1fr);
`;

const DataSelect = styled.select`
  color: gray;
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
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
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

const Span2 = styled.span`
  font-size: 20px;
  color: red;
  margin-left: 970px;
  width: 110px;
  cursor: pointer;
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

const MyStayDetail = () => {
  const [formData, setFormData] = useState({
    business_type_no: "1",
  });
  const navigate = useNavigate();
  const { stayNum } = useParams();
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

  useEffect(() => {
    fetch(`${BASE_URL}/api/host/myStayDetail`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(stayNum),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFormData(data);
      });
  }, []);

  // fetch함수;
  const editStay = () => {
    const fd = new FormData();
    fd.append("hostNo", hostNo);
    fd.append("no", stayNum);
    fd.append("phone", formData.phone);
    fd.append("sns", formData.sns);
    fd.append("tagline", formData.tagline);
    fd.append("season", formData.season);
    fd.append("introduction", formData.introduction);

    fetch(`${BASE_URL}/api/host/modifyMyStay`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data > 0) {
          setIsAlertOpen(true);
        } else {
        }
      });
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navigate("/hostMenu/hostMgmtMenu/myStayMgmt");
    window.scrollTo(0, 0);
  };

  const handleAlertClose2 = () => {
    setIsAlertOpen(false);
    navigate("/hostMenu/hostMgmtMenu/myStayMgmt");
    window.scrollTo(0, 0);
  };

  const handleAlertClose3 = () => {
    setIsAlertOpen(false);
    navigate("/hostMenu/hostMgmtMenu/myStayMgmt");
    window.scrollTo(0, 0);
  };

  const moveRoomDetail = () => {
    navigate(`/hostMenu/hostMgmtMenu/myStayMgmt/myRoomDetail/${stayNum}`);
    window.scrollTo(0, 0);
  };

  const formatBrn = (brn) => {
    brn = String(brn);
    return brn.replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3");
  };

  const deleteSpace = () => {
    fetch(`${BASE_URL}/api/host/deleteMyStay`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(stayNum),
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

  return (
    <>
      <HomeDiv>
        <div></div>
        <MainDiv>
          <div>
            <HeaderDiv
              size="50px"
              color="black"
              weight="600"
              margin="20px"
              marginBot="30px"
            >
              내 숙소 관리
            </HeaderDiv>
            <Span2 onClick={deleteSpace}>입점 삭제하기</Span2>
          </div>
          <div>
            <Hr />
          </div>
          <StayDiv>
            <EnrollHeader>스테이 정보</EnrollHeader>
            <div></div>
            <DataTitle top="40px">스테이 이름 *</DataTitle>
            <DataInput
              color="gray"
              type="text"
              name="name"
              top="40px"
              value={formData.name}
            />
            <DataTitle top="40px">스테이 주소 *</DataTitle>
            <DataInput
              color="gray"
              type="text"
              name="address"
              top="40px"
              value={formData.address}
              onChange={handleChange}
            />
            <DataTitle top="40px">스테이 전화번호 *</DataTitle>
            <DataInput
              type="phone"
              name="phone"
              top="40px"
              value={formData.phone}
              onChange={handleChange}
            />
            <DataTitle top="40px">스테이 SNS *</DataTitle>
            <DataInput
              type="text"
              name="sns"
              value={formData.sns}
              top="40px"
              onChange={handleChange}
            />
            <DataTitle top="40px">스테이 업종명 *</DataTitle>
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
            <DataTitle top="40px">스테이 소개 *</DataTitle>
            <TextArea
              name="introduction"
              onChange={handleChange}
              value={formData.introduction}
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
            <div></div>
            <HostBtn
              border="none"
              width="300px"
              height="50px"
              font="25px"
              backColor="#2B8C44"
              str="다음"
              color="white"
              f={moveRoomDetail}
            />
            <HostBtn
              border="1px solid #2B8C44"
              width="300px"
              height="50px"
              font="25px"
              backColor="white"
              str="수정하기"
              color="black"
              f={editStay}
            />
            <div></div>
          </BtnArea>
        </MainDiv>
        <div></div>
      </HomeDiv>

      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="내 숙소 수정"
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
            title="내 숙소 입점삭제"
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
            title="내 숙소 입점삭제"
            titleColor="red"
            message="입점 삭제 불가능합니다. 이용 완료되지 않은 예약 내역이 있습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose3}
          />
        </Backdrop>
      )}
    </>
  );
};

export default MyStayDetail;
