import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HostApprovalCard from "../../hostComponents/HostApprovalCard";

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

const MySpaceMgmt = () => {
  const [dataArr, setDataArr] = useState([]);
  useEffect(() => {
    const fd = new FormData();
    fd.append("hostNo", "1");
    fetch("http://127.0.0.1:8080/api/host/mySpace", {
      method: "POST",
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data);
      });
  }, []);
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="330px">내 공간 목록</StatusSpan>
        </div>
        {dataArr.map((vo, idx) => {
          return <HostApprovalCard key={idx} status="1" vo={vo} id={vo.no} />;
        })}
      </MainDiv>
    </>
  );
};

export default MySpaceMgmt;
