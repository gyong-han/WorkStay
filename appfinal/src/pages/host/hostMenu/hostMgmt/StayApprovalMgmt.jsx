import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HostApprovalCard from "../../hostComponents/HostApprovalCard";

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
const StayApprovalMgmt = () => {
  const [status, setStatus] = useState("1");
  const [dataArr, setDataArr] = useState([]);

  const handleStatus = (e) => {
    setStatus(e.target.id);
  };

  useEffect(() => {
    const fd = new FormData();
    fd.append("status", status);
    fd.append("hostNo", "1");
    fetch("http://127.0.0.1:8080/api/host/stayApprovalList", {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data);
      });
  }, [status]);

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
          return <HostApprovalCard key={idx} status="1" vo={vo} id={vo.no} />;
        })}
      </MainDiv>
    </>
  );
};

export default StayApprovalMgmt;
