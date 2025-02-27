import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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

  & > thead > tr:nth-child(1) > th {
    border-bottom: 3px solid black;
  }

  & > thead > tr:nth-child(1) > th:nth-child(1) {
    width: 150px;
    height: 35px;
  }
  & > thead > tr:nth-child(1) > th:nth-child(2) {
    width: 300px;
    height: 30px;
  }
  & > thead > tr:nth-child(1) > th:nth-child(3) {
    width: 250px;
    height: 30px;
  }
  & > thead > tr:nth-child(1) > th:nth-child(4) {
    width: 280px;
    height: 30px;
  }
  & > tbody > tr > td {
    height: 40px;
  }
`;

const StayDelReq = () => {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8080/api/admin/deleteStayList", {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFormData(data);
      });
  }, []);

  const formatPhoneNumber = (phone) => {
    phone = String(phone);
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="300px">숙소 삭제 목록</StatusSpan>
        </div>
        <div>
          <StyledTable>
            <thead>
              <tr>
                <th>이름</th>
                <th>독채명</th>
                <th>전화번호</th>
                <th>삭제일</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, idx) => {
                return (
                  <tr key={idx}>
                    <td>{data.hostName}</td>
                    <td>{data.name}</td>
                    <td>{formatPhoneNumber(data.phone)}</td>
                    <td>{data.modifyDate}</td>
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

export default StayDelReq;
