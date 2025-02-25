import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import EnrollReqRoom from "../../../admin/adminComponents/EnrollReqRoom";
import HostBtn from "../../hostComponents/HostBtn";
import RoomDetail from "../../hostComponents/RoomDetail";

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

const MyRoomDetail = () => {
  const { stayNum } = useParams();
  const [formDataArr, setFormDataArr] = useState([]);
  const [featuresArr, setFeaturesArr] = useState([]);
  const [fileData, setFileData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fd = new FormData();
    fd.append("stayNum", stayNum);
    fetch("http://127.0.0.1:8080/api/host/myRoomDetail", {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        data.map((data) => {
          setFormDataArr((prev) => [...prev, data.roomVo]);
          setFeaturesArr((prev) => [...prev, data.featuresList]);
          setFileData((prev) => [...prev, { ...data.fileData }]);
        });
      });
  }, []);

  const editRoom = async () => {
    const url = "http://127.0.0.1:8080/api/host/modifyMyRoom";
    for (let idx = 0; idx < formDataArr.length; ++idx) {
      const fd = new FormData();
      fd.append("no", formDataArr[idx].no);
      fd.append("name", formDataArr[idx].name);
      fd.append("introduction", formDataArr[idx].introduction);
      fd.append("price", formDataArr[idx].price);
      fd.append("maxGuest", formDataArr[idx].maxGuest);
      fd.append("standardGuest", formDataArr[idx].standardGuest);
      fd.append("singleSize", formDataArr[idx].singleSize);
      fd.append("doubleSize", formDataArr[idx].doubleSize);
      fd.append("queenSize", formDataArr[idx].queenSize);
      fd.append("features", featuresArr[idx]);
      // fd.append("thumbnail", fileData[idx].thumbnail);
      // fd.append("room_floor_plan", fileData[idx].room_floor_plan);
      // fileData[idx].attachment.map((file) => fd.append("attachment", file));

      const resp = await fetch(url, {
        method: "POST",
        body: fd,
      });
      const data = await resp.text();
      const result = (data) => {
        console.log(data);
      };
    }
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
              내 독채 관리
            </HeaderDiv>
          </div>
          <div>
            {formDataArr.map((vo, idx) => {
              return (
                <>
                  {idx === 0 ? <></> : <Hr />}
                  <RoomDetail
                    key={idx}
                    formDataArr={formDataArr}
                    setFormDataArr={setFormDataArr}
                    featuresArr={featuresArr}
                    setFeaturesArr={setFeaturesArr}
                    fileData={fileData}
                    setFileData={setFileData}
                    no={idx}
                  />
                </>
              );
            })}
          </div>
          <BtnArea>
            <div></div>
            <HostBtn
              width="300px"
              height="50px"
              font="25px"
              top="100px"
              backColor="#2B8C44"
              str="수정하기"
              color="white"
              f={editRoom}
            />
            <HostBtn
              width="300px"
              height="50px"
              font="25px"
              top="100px"
              backColor="white"
              str="목록가기"
              color="black"
              // f={companion}
            />
            <div></div>
          </BtnArea>
        </MainDiv>

        <div></div>
      </HomeDiv>
    </>
  );
};

export default MyRoomDetail;
