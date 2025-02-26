import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HostBtn from "../host/hostComponents/HostBtn";
import EnrollReqRoom from "./adminComponents/EnrollReqRoom";
import styled from "styled-components";
import EditReqRoom from "./adminComponents/EditReqRoom";

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

const RoomEditReqDetail = () => {
  const { roomNum } = useParams();
  const [roomVoArr, setRoomVoArr] = useState([]);
  const [featuresArr, setFeaturesArr] = useState([]);
  const [roomFloorPlanArr, setRoomFloorPlanArr] = useState([]);
  const [roomThumbNailArr, setRoomThumbNailArr] = useState([]);
  const [roomAttachArr, setRoomAttachArr] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fd = new FormData();
    fetch("http://127.0.0.1:8080/api/admin/roomEditReqDetail", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(roomNum),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        setRoomVoArr(data.roomVo);
        setFeaturesArr(data.featuresList);
        setRoomFloorPlanArr(data.roomFloorPlan);
        setRoomThumbNailArr(data.roomThumbNail);
        setRoomAttachArr(data.roomAttachList);
      });
  }, []);

  const approve = () => {
    fetch("http://127.0.0.1:8080/api/admin/approveEditRoom", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(roomNum),
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data > 0) {
          navigate("/adminMenu/roomEditReq");
        }
      });
  };

  const companion = () => {
    fetch("http://127.0.0.1:8080/api/admin/companionEditRoom", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(roomNum),
    })
      .then((resp) => resp.text())
      .then((data) => {
        if (data > 0) {
          navigate("/adminMenu/roomEditReq");
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
              roomVo={roomVoArr}
              featuresArr={featuresArr}
              roomFloorPlanArr={roomFloorPlanArr}
              roomThumbNailArr={roomThumbNailArr}
              roomAttachArr={roomAttachArr}
            />
          </div>
          <BtnArea>
            <div></div>
            <HostBtn
              width="300px"
              height="50px"
              font="25px"
              top="100px"
              backColor="#2B8C44"
              str="승인하기"
              color="white"
              f={approve}
            />
            <HostBtn
              width="300px"
              height="50px"
              font="25px"
              top="100px"
              backColor="white"
              str="반려하기"
              color="black"
              f={companion}
            />
            <div></div>
          </BtnArea>
        </MainDiv>

        <div></div>
      </HomeDiv>
    </>
  );
};

export default RoomEditReqDetail;
