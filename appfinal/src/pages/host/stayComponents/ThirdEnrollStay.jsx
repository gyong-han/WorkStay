import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HostBtn from "../hostComponents/HostBtn";
import EnrollRoom from "../roomComponents/EnrollRoom";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../../../components/Alert";
import { BASE_URL } from "../../../components/service/config";

const HomeDiv = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr 1fr;
`;

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 230px 4fr 100px 230px;
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
  place-items: center;
`;

const AddBtnArea = styled.div`
  display: grid;
  place-items: end;
`;

const Hr = styled.hr`
  margin-top: 30px;
  margin-bottom: 30px;
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

const ThirdEnrollStay = () => {
  const stayNum = useParams();
  const navigate = useNavigate();
  const [formDataArr, setFormDataArr] = useState([]);
  const [featuresArr, setFeaturesArr] = useState([]);
  const [fileData, setFileData] = useState([]);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const addRoom = () => {
    setFormDataArr((prev) => {
      return [...prev, { stayNo: stayNum.x }];
    });
    setFeaturesArr((prev) => {
      return [...prev, []];
    });
    setFileData((prev) => {
      return [...prev, {}];
    });
  };

  useEffect(() => {
    addRoom();
  }, []);

  const enrollRoom = async () => {
    const url = `${BASE_URL}/api/host/enroll/room`;
    for (let idx = 0; idx < formDataArr.length; ++idx) {
      const fd = new FormData();
      fd.append("stayNo", stayNum.x);
      fd.append("name", formDataArr[idx].name);
      fd.append("introduction", formDataArr[idx].introduction);
      fd.append("price", formDataArr[idx].price);
      fd.append("maxGuest", formDataArr[idx].max_guest);
      fd.append("standardGuest", formDataArr[idx].standard_guest);
      fd.append("singleSize", formDataArr[idx].singleSize);
      fd.append("doubleSize", formDataArr[idx].doubleSize);
      fd.append("queenSize", formDataArr[idx].queenSize);
      fd.append("features", featuresArr[idx]);
      fd.append("thumbnail", fileData[idx].thumbnail);
      fd.append("room_floor_plan", fileData[idx].room_floor_plan);
      fileData[idx].attachment.map((file) => fd.append("attachment", file));

      const resp = await fetch(url, {
        method: "POST",
        body: fd,
      });
      const data = await resp.text();
    }
    setIsAlertOpen(true);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navigate("/hostMenu/hostMgmtMenu/stayApprovalMgmt");
    window.scrollTo(0, 0);
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
              독채 신청
            </HeaderDiv>
          </div>
          <div>
            {formDataArr.map((x, idx) => {
              return (
                <>
                  {idx === 0 ? <></> : <Hr />}
                  <EnrollRoom
                    key={idx}
                    formDataArr={formDataArr}
                    setFormDataArr={setFormDataArr}
                    no={idx}
                    featuresArr={featuresArr}
                    setFeaturesArr={setFeaturesArr}
                    fileData={fileData}
                    setFileData={setFileData}
                  />
                </>
              );
            })}
          </div>
          <AddBtnArea>
            <HostBtn
              border="none"
              width="100px"
              height="30px"
              font="15px"
              backColor="#2B8C44"
              color="white"
              str="독채 추가"
              f={addRoom}
            />
          </AddBtnArea>
          <BtnArea>
            <HostBtn
              border="1px solid #2B8C44"
              width="400px"
              height="50px"
              font="25px"
              backColor="#2B8C44"
              str="제출하기"
              color="white"
              f={enrollRoom}
            />
          </BtnArea>
        </MainDiv>

        <div></div>
      </HomeDiv>
      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="내 숙소 입점신청"
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

export default ThirdEnrollStay;
