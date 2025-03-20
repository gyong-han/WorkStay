import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HostApprovalCard from "../../hostComponents/HostApprovalCard";
import { data, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../../../components/service/config";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: 25px;
  cursor: pointer;
  margin-left: ${(props) => {
    return props.left;
  }};
  color: ${(props) => (props.isSelected ? props.colorSelected : "black")};
`;
const SpaceApprovalMgmt = () => {
  window.scrollTo(0, 0);
  const [status, setStatus] = useState("1");
  const [dataArr, setDataArr] = useState([]);
  const navigate = useNavigate();
  const [hostNo, setHostNo] = useState("");

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

  const handleStatus = (e) => {
    setStatus(e.target.id);
  };

  useEffect(() => {
    if (hostNo == "") {
      return;
    }
    const fd = new FormData();
    fd.append("status", status);
    fd.append("hostNo", hostNo);
    fetch(`${BASE_URL}/api/host/spaceApprovalList`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data);
      });
  }, [hostNo, status]);

  const moveDetail = (spaceNo) => {
    navigate(`/adminMenu/spaceEnrollReqDetail/${spaceNo}`);
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan
            left="280px"
            id="1"
            onClick={handleStatus}
            isSelected={status === "1"}
            colorSelected="green"
          >
            승인 대기
          </StatusSpan>
          <StatusSpan left="20px"> | </StatusSpan>
          <StatusSpan
            left="20px"
            id="3"
            onClick={handleStatus}
            isSelected={status === "3"}
            colorSelected="red"
          >
            승인 반려
          </StatusSpan>
        </div>
        {dataArr.map((vo, idx) => {
          return (
            <HostApprovalCard
              key={idx}
              status="1"
              vo={vo}
              id={vo.no}
              f={moveDetail}
            />
          );
        })}
      </MainDiv>
    </>
  );
};

export default SpaceApprovalMgmt;
