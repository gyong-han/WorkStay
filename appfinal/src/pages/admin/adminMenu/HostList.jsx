import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Table from "../../../components/table/Table";

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

const StyledTable = styled.table`
  margin-top: 10px;
  border: none;
  border-collapse: collapse;
  text-align: center;
  font-size: 20px;

  & > thead > tr > th {
    border-bottom: 3px solid black;
  }
  & > thead > tr > th:nth-child(1) {
    width: 150px;
    height: 35px;
  }
  & > thead > tr > th:nth-child(2) {
    width: 380px;
    height: 30px;
  }
  & > thead > tr > th:nth-child(3) {
    width: 250px;
    height: 30px;
  }
  & > thead > tr > th:nth-child(4) {
    width: 100px;
    height: 30px;
  }
  & > thead > tr > th:nth-child(5) {
    width: 100px;
    height: 30px;
  }
  & > tbody > tr:hover {
    color: #2b8c44;
  }
  & > tbody > tr > td {
    height: 40px;
    cursor: pointer;
  }
`;

const HostList = () => {
  const navigate = useNavigate();
  const [dataArr, setDataArr] = useState([]);

  const hostDetail = (no) => {
    navigate(`/adminMenu/hostDetail/${no}`);
  };

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/admin/hostList", {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data);
      });
  }, []);

  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="330px">호스트 목록조회</StatusSpan>
        </div>
        <div>
          <StyledTable>
            <thead>
              <tr>
                <th>이름</th>
                <th>이메일</th>
                <th>전화번호</th>
                <th>숙소</th>
                <th>공간</th>
              </tr>
            </thead>
            <tbody>
              {dataArr.map((data, idx) => {
                return (
                  <tr key={idx} onClick={() => hostDetail(data.no)}>
                    <td>{data.hostName}</td>
                    <td>{data.email}</td>
                    <td>{formatPhoneNumber(data.phone)}</td>
                    <td>{data.stayCnt}</td>
                    <td>{data.spaceCnt}</td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
        </div>
      </MainDiv>
    </>
  );
};

export default HostList;
