import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

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
    width: 100px;
    height: 35px;
  }
  & > thead > tr > th:nth-child(2) {
    width: 280px;
    height: 30px;
  }
  & > thead > tr > th:nth-child(3) {
    width: 250px;
    height: 30px;
  }
  & > thead > tr > th:nth-child(4) {
    width: 150px;
    height: 30px;
  }
  & > thead > tr > th:nth-child(5) {
    width: 200px;
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

const SpaceReservMgmt = () => {
  window.scrollTo(0, 0);
  const [status, setStatus] = useState("5");
  const [dataArr, setDataArr] = useState([]);
  const navigate = useNavigate();

  const handleStatus = (e) => {
    setStatus(e.target.id);
  };

  const reservDetail = (reservNo) => {
    navigate(`/hostMenu/hostMgmtMenu/spaceReserv/detail/${reservNo}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const fd = new FormData();
    fd.append("hostNo", "1");
    fd.append("status", status);
    fetch("http://127.0.0.1:8080/api/host/space/reservList", {
      method: "POST",
      headers: {},
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data);
      });
  }, [status]);

  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan
            left="280px"
            id="5"
            onClick={handleStatus}
            isSelected={status === "5"}
            colorSelected="green"
          >
            예약 확정
          </StatusSpan>
          <StatusSpan left="20px"> | </StatusSpan>
          <StatusSpan
            left="20px"
            id="6"
            onClick={handleStatus}
            isSelected={status === "6"}
            colorSelected="red"
          >
            예약 취소
          </StatusSpan>
        </div>
        <div>
          <StyledTable>
            <thead>
              <tr>
                <th>이름</th>
                <th>전화번호</th>
                <th>공간명</th>
                <th>패키지</th>
                <th>예약일</th>
              </tr>
            </thead>
            <tbody>
              {dataArr.map((data, idx) => {
                return (
                  <tr
                    key={idx}
                    onClick={() => {
                      reservDetail(data.no);
                    }}
                  >
                    <td>{data.hostName}</td>
                    <td>{formatPhoneNumber(data.phone)}</td>
                    <td>{data.name}</td>
                    <td>{data.packageName}</td>
                    <td>{data.useDay}</td>
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

export default SpaceReservMgmt;
