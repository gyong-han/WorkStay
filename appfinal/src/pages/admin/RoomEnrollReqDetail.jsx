import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EnrollReqRoom from "./adminComponents/EnrollReqRoom";
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
  grid-template-rows: 150px auto 250px 150px;
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

const BtnArea = styled.div`
  margin-top: 80px;
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: 0.5fr 1fr 1fr 0.5fr;
  place-items: center;
`;

const Hr = styled.hr`
  margin-top: 170px;
  margin-bottom: 50px;
  background-color: #d9d9d9;
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

const RoomEnrollReqDetail = () => {
  const { enrollReqNo } = useParams();
  const [roomVoArr, setRoomVoArr] = useState([]);
  const [featuresArr, setFeaturesArr] = useState([]);
  const [roomFloorPlanArr, setRoomFloorPlanArr] = useState([]);
  const [roomThumbNailArr, setRoomThumbNailArr] = useState([]);
  const [roomAttachArr, setRoomAttachArr] = useState([]);
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
        setRole(decodedToken.pageNick);
      } catch (error) {
        console.error("토큰 디코딩 실패:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fd = new FormData();
    fd.append("stayNo", enrollReqNo);
    fetch(`${BASE_URL}/api/admin/roomEnrollReqDetail`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        {
          data.map((data) => {
            setRoomVoArr((prev) => [...prev, data.roomVo]);
            setFeaturesArr((prev) => [...prev, data.featuresList]);
            setRoomFloorPlanArr((prev) => [...prev, data.roomFloorPlan]);
            setRoomThumbNailArr((prev) => [...prev, data.roomThumbNail]);
            setRoomAttachArr((prev) => [...prev, [...data.roomAttachList]]);
          });
        }
      });
  }, []);

  const approve = () => {
    const fd = new FormData();
    fd.append("hostNo", roomVoArr[0].hostNo);
    fd.append("stayNo", enrollReqNo);
    fetch(`${BASE_URL}/api/admin/approveStay`, {
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
    navigate("/adminMenu/stayEnrollReq");
    window.scrollTo(0, 0);
  };

  const companion = () => {
    const fd = new FormData();
    fd.append("stayNo", enrollReqNo);
    fetch(`${BASE_URL}/api/admin/companionStay`, {
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
    navigate("/adminMenu/stayEnrollReq");
    window.scrollTo(0, 0);
  };

  const cancelEnroll = () => {
    const fd = new FormData();
    fd.append("stayNo", enrollReqNo);
    fetch(`${BASE_URL}/api/host/cancelEnrollStay`, {
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
    navigate("/hostMenu/hostMgmtMenu/stayApprovalMgmt");
    window.scrollTo(0, 0);
  };

  const moveMenu = () => {
    navigate("/hostMenu/hostMgmtMenu/stayApprovalMgmt");
    window.scrollTo(0, 0);
  };

  const statusNo = roomVoArr.length > 0 ? roomVoArr[0].statusNo : null;
  return (
    <>
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
              독채 입점 신청
            </HeaderDiv>
          </div>
          <div>
            {roomVoArr.map((vo, idx) => {
              return (
                <>
                  {idx === 0 ? <></> : <Hr />}
                  <EnrollReqRoom
                    key={idx}
                    roomVo={vo}
                    featuresArr={featuresArr[idx]}
                    roomFloorPlanArr={roomFloorPlanArr[idx]}
                    roomThumbNailArr={roomThumbNailArr[idx]}
                    roomAttachArr={roomAttachArr[idx]}
                    no={idx}
                  />
                </>
              );
            })}
          </div>
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
                  color={statusNo === "3" ? "gray" : "black"} // 🔥 statusNo가 3이면 "gray" 아니면 "black"
                  f={statusNo === "3" ? undefined : cancelEnroll} // 🔥 statusNo가 3이면 버튼 비활성화
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

        <div></div>
      </HomeDiv>
      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="숙소 입점 승인"
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
            title="숙소 입점 반려"
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
            title="숙소 입점 철회"
            titleColor="#049dd9"
            message="입점 철회되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose3}
          />
        </Backdrop>
      )}
    </>
  );
};

export default RoomEnrollReqDetail;
