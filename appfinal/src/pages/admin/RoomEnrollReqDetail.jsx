import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EnrollReqRoom from "./adminComponents/EnrollReqRoom";
import styled from "styled-components";
import HostBtn from "../host/hostComponents/HostBtn";
import { jwtDecode } from "jwt-decode";

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
  margin-top: 100px;
  margin-bottom: 50px;
  background-color: #d9d9d9;
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
    fetch("http://127.0.0.1:8080/api/admin/roomEnrollReqDetail", {
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
    fetch("http://127.0.0.1:8080/api/admin/approveStay", {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data === 1) {
          navigate("/adminMenu");
        }
      });
  };

  const companion = () => {
    const fd = new FormData();
    fd.append("stayNo", enrollReqNo);
    fetch("http://127.0.0.1:8080/api/admin/companionStay", {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data === 1) {
          navigate("/adminMenu");
        }
      });
  };

  const cancelEnroll = () => {
    const fd = new FormData();
    fd.append("stayNo", enrollReqNo);
    fetch("http://127.0.0.1:8080/api/host/cancelEnrollStay", {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data > 0) {
          navigate("/hostMenu/hostMgmtMenu/stayApprovalMgmt");
          window.scrollTo(0, 0);
        }
      });
  };

  const moveMenu = () => {
    navigate("/hostMenu/hostMgmtMenu/stayApprovalMgmt");
    window.scrollTo(0, 0);
  };

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
            {role === "HOST" ? (
              <>
                <HostBtn
                  top="90px"
                  width="300px"
                  height="60px"
                  font="25px"
                  backColor="#2B8C44"
                  str="목록가기"
                  color="white"
                  f={moveMenu}
                />
                <HostBtn
                  top="90px"
                  width="300px"
                  height="60px"
                  font="25px"
                  backColor="white"
                  str="입점 철회하기"
                  color="black"
                  f={cancelEnroll}
                />
              </>
            ) : (
              <>
                <HostBtn
                  top="90px"
                  width="300px"
                  height="50px"
                  font="25px"
                  backColor="#2B8C44"
                  str="승인하기"
                  color="white"
                  f={approve}
                />
                <HostBtn
                  top="90px"
                  width="300px"
                  height="50px"
                  font="25px"
                  backColor="white"
                  str="반려하기"
                  color="black"
                  f={companion}
                />
              </>
            )}
            <div></div>
          </BtnArea>
        </MainDiv>

        <div></div>
      </HomeDiv>
    </>
  );
};

export default RoomEnrollReqDetail;
