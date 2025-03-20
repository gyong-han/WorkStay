import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HostApprovalCard from "../../hostComponents/HostApprovalCard";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "../../../../components/service/config";

const MainDiv = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
`;

const StatusSpan = styled.span`
  font-size: 25px;
  margin-left: ${(props) => {
    return props.left;
  }};
`;

const MyStayMgmt = () => {
  window.scrollTo(0, 0);
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

  useEffect(() => {
    if (hostNo == "") {
      return;
    }
    const fd = new FormData();
    fd.append("hostNo", hostNo);
    fetch(`${BASE_URL}/api/host/myStay`, {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data);
      });
  }, [hostNo]);

  const moveDetail = (stayNum) => {
    navigate(`myStayDetail/${stayNum}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="330px">내 숙소 목록</StatusSpan>
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

export default MyStayMgmt;
