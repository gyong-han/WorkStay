import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import DataCard from "./adminComponents/DataCard";
import { BASE_URL } from "../../components/service/config";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto 200px;
`;

const StatusSpan = styled.span`
  font-size: 20px;
  margin-left: ${(props) => {
    return props.left;
  }};
  font-weight: 500;
`;

const HostDataArea = styled.div`
  display: grid;
  grid-template-rows: 300px auto auto;
  margin-top: 10px;
`;

const HostArea = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
`;

const HostTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
`;

const HostData = styled.div`
  font-size: 20px;
  border-bottom: 1px solid black;
  width: 500px;
  margin-top: 10px;
  padding-left: 3px;
`;

const DataArea = styled.div`
  margin-top: ${(props) => props.top};
  display: grid;
  grid-template-rows: 40px 300px;
`;

const DataTitle = styled.div`
  border-left: 3px solid black;
  font-size: 25px;
  display: flex;
  align-items: center;
  padding-left: 20px;
  font-weight: 600;
`;
const DataContent = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: 50px 50px 710px 20px 100px;
`;

const ArrowDiv = styled.div`
  height: 50px;
  display: flex;
  font-size: 50px;
  place-self: center;
  justify-content: ${(props) => {
    return props.justify;
  }};
  cursor: pointer;
`;

const HostDetail = () => {
  const { hostNo } = useParams();

  const [stayIdx, setStayIdx] = useState(0);
  const [stayData, setStayData] = useState({});
  const [stayList, setStayList] = useState([]);

  const [spaceIdx, setSpaceIdx] = useState(0);
  const [spaceData, setSpaceData] = useState({});
  const [spaceList, setSpaceList] = useState([]);

  const [hostData, setHostData] = useState({});

  const nextStayData = () => {
    setStayIdx((prev) => (prev === stayList.length - 1 ? 0 : prev + 1));
  };

  const preStayData = () => {
    setStayIdx((prev) => (prev === 0 ? stayList.length - 1 : prev - 1));
  };

  const nextSpaceData = () => {
    setSpaceIdx((prev) => (prev === spaceList.length - 1 ? 0 : prev + 1));
  };

  const preSpaceData = () => {
    setSpaceIdx((prev) => (prev === 0 ? spaceList.length - 1 : prev - 1));
  };

  useEffect(() => {
    const fd = new FormData();
    fd.append("hostNo", hostNo);
    fetch(`${BASE_URL}/api/admin/hostDetail`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setHostData(data.hostVo);
        setStayList(data.stayList);
        setSpaceList(data.spaceList);
      });
  }, []);

  useEffect(() => {
    if (stayList.length > 0) {
      setStayData(stayList[stayIdx]);
    }
  }, [stayIdx, stayList]);

  useEffect(() => {
    if (spaceList.length > 0) {
      setSpaceData(spaceList[spaceIdx]);
    }
  }, [spaceIdx, stayList]);

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

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="320px">호스트 상세조회</StatusSpan>
        </div>
        <HostDataArea>
          <HostArea>
            <div>
              <HostTitle>이름</HostTitle>
              <HostData>{hostData.hostName}</HostData>
            </div>
            <div>
              <HostTitle>전화번호</HostTitle>
              <HostData>{formatPhoneNumber(hostData.phone)}</HostData>
            </div>
            <div>
              <HostTitle>이메일</HostTitle>
              <HostData>{hostData.email}</HostData>
            </div>
          </HostArea>
          {stayList.length > 0 ? (
            <DataArea top="40px">
              <DataTitle>숙소</DataTitle>
              <DataContent>
                <ArrowDiv justify="right" onClick={preStayData}>
                  ❮
                </ArrowDiv>
                <div></div>
                <DataCard
                  title={stayData.name}
                  address={stayData.address}
                  phone={stayData.phone}
                  sns={stayData.sns}
                  img={stayData.filePath}
                />
                <div></div>
                <ArrowDiv justify="left" onClick={nextStayData}>
                  ❯
                </ArrowDiv>
              </DataContent>
            </DataArea>
          ) : (
            <></>
          )}
          {spaceList.length > 0 ? (
            <DataArea top="80px">
              <DataTitle>공간</DataTitle>
              <DataContent>
                <ArrowDiv justify="center" onClick={preSpaceData}>
                  ❮
                </ArrowDiv>
                <div></div>
                <DataCard
                  title={spaceData.name}
                  address={spaceData.address}
                  phone={spaceData.phone}
                  sns={spaceData.sns}
                  img={spaceData.filePath}
                />
                <div></div>
                <ArrowDiv justify="left" onClick={nextSpaceData}>
                  ❯
                </ArrowDiv>
              </DataContent>
            </DataArea>
          ) : (
            <></>
          )}
        </HostDataArea>
      </MainDiv>
    </>
  );
};

export default HostDetail;
