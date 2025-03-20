import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { jwtDecode } from "jwt-decode";
import PagingDiv from "../../../../components/paging/PagingDiv";
import PagingFooter from "../../../../components/paging/PagingFooter";
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
    width: 180px;
    height: 30px;
  }
  & > thead > tr > th:nth-child(3) {
    width: 250px;
    height: 30px;
  }
  & > thead > tr > th:nth-child(4) {
    width: 250px;
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

const StayReservMgmt = () => {
  window.scrollTo(0, 0);
  const [status, setStatus] = useState("5");
  const [dataArr, setDataArr] = useState([]);
  const navigate = useNavigate();
  const [hostNo, setHostNo] = useState("");
  const [pageVo, setPageVo] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let pno = queryParams.get("pno");
  if (pno === null) {
    pno = 1;
  }

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
    pno = 1;
  }, [status]);

  const handleStatus = (e) => {
    setStatus(e.target.id);
  };

  const reservDetail = (reservNo) => {
    navigate(`/hostMenu/hostMgmtMenu/stayReserv/detail/${reservNo}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (hostNo == "") {
      return;
    }
    const fd = new FormData();
    fd.append("hostNo", hostNo);
    fd.append("status", status);
    fetch(`${BASE_URL}/api/host/room/reservList?pno=${pno}`, {
      method: "POST",
      headers: {},
      body: fd,
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data.voList);
        setPageVo(data.pageVo);
      });
  }, [hostNo, status, pno]);

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
                <th>숙소명</th>
                <th>객실</th>
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
                    <td>{data.roomName}</td>
                    <td>{data.useDay}</td>
                  </tr>
                );
              })}
            </tbody>
          </StyledTable>
        </div>
      </MainDiv>
      <PagingDiv>
        <div></div>
        <PagingFooter pageVo={pageVo} url="/hostMenu/hostMgmtMenu" />
        <div></div>
      </PagingDiv>
    </>
  );
};

export default StayReservMgmt;
