import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HostBtn from "../host/hostComponents/HostBtn";
import EnrollReqRoom from "./adminComponents/EnrollReqRoom";
import styled from "styled-components";
import EditReqRoom from "./adminComponents/EditReqRoom";
import Alert from "../../components/Alert";
import { BASE_URL } from "../../components/service/config";

const HomeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
`;

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 150px auto 200px 150px;
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
  margin-top: 60px;
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

const RoomEditReqDetail = () => {
  const { roomNum } = useParams();
  const [roomVo, setRoomVo] = useState({});
  const [featuresArr, setFeaturesArr] = useState([]);
  const [roomFloorPlan, setRoomFloorPlan] = useState({});
  const [roomThumbNail, setRoomThumbNail] = useState({});
  const [roomAttachList, setRoomAttachList] = useState([]);
  const navigate = useNavigate();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isAlertOpen2, setIsAlertOpen2] = useState(false);

  useEffect(() => {
    const fd = new FormData();
    fetch(`${BASE_URL}/api/admin/roomEditReqDetail`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(roomNum),
    })
      .then((resp) => resp.json())
      .then((data) => {
        setRoomVo(data.roomVo);
        setFeaturesArr(data.featuresList);
        setRoomFloorPlan(data.roomFloorPlan);
        setRoomThumbNail(data.roomThumbNail);
        setRoomAttachList(data.roomAttachList);
      });
  }, []);

  const approve = () => {
    fetch(`${BASE_URL}/api/admin/approveEditRoom`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(roomNum),
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
    navigate("/adminMenu/roomEditReq");
    window.scrollTo(0, 0);
  };

  const companion = () => {
    fetch(`${BASE_URL}/api/admin/companionEditRoom`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(roomNum),
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data > 0) {
          setIsAlertOpen2(true);
        }
      });
  };

  const handleAlertClose2 = () => {
    setIsAlertOpen2(false);
    navigate("/adminMenu/roomEditReq");
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
              독채 수정 요청
            </HeaderDiv>
          </div>
          <div>
            <EditReqRoom
              roomVo={roomVo}
              featuresArr={featuresArr}
              roomFloorPlan={roomFloorPlan}
              roomThumbNail={roomThumbNail}
              roomAttachList={roomAttachList}
            />
          </div>
          <BtnArea>
            <div></div>
            <HostBtn
              border="none"
              width="300px"
              height="50px"
              font="25px"
              top="100px"
              backColor="#2B8C44"
              str="반려하기"
              color="white"
              f={companion}
            />
            <HostBtn
              border="1px solid #2B8C44"
              width="300px"
              height="50px"
              font="25px"
              top="100px"
              backColor="white"
              str="승인하기"
              color="black"
              f={approve}
            />
            <div></div>
          </BtnArea>
        </MainDiv>

        <div></div>
      </HomeDiv>
      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="독채 수정 승인"
            titleColor="#049dd9"
            message="수정 승인되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
      {isAlertOpen2 && (
        <Backdrop>
          <Alert
            title="독채 수정 반려"
            titleColor="#049dd9"
            message="수정 반려되었습니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose2}
          />
        </Backdrop>
      )}
    </>
  );
};

export default RoomEditReqDetail;
