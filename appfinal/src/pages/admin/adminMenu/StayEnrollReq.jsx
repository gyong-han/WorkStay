import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../../components/table/Table";
import { useNavigate } from "react-router-dom";

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

const StayEnrollReq = () => {
  window.scrollTo(0, 0);
  const [dataArr, setDataArr] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/admin/stayEnrollReqList", {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data);
      });
  }, []);

  const moveDetail = (no) => {
    navigate(`/adminMenu/stayEnrollReqDetail/${no}`);
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="300px">숙소 입접 요청 목록</StatusSpan>
        </div>
        <div>
          <Table
            th1="이름"
            th2="이메일"
            th3="전화번호"
            th4="숙소명"
            dataArr={dataArr}
            f={moveDetail}
          />
        </div>
      </MainDiv>
    </>
  );
};

export default StayEnrollReq;
