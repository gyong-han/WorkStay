import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import PagingDiv from "../../../components/paging/PagingDiv";
import PagingFooter from "../../../components/paging/PagingFooter";
import { BASE_URL } from "../../../components/service/config";

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
  & > tbody > tr:hover {
    color: #2b8c44;
  }
  & > tbody > tr > td {
    height: 40px;
    cursor: pointer;
  }
`;

const StayEditReq = () => {
  const [formData, setFormData] = useState([]);
  const navigate = useNavigate();
  const [pageVo, setPageVo] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let pno = queryParams.get("pno");
  if (pno === null) {
    pno = 1;
  }

  useEffect(() => {
    fetch(`${BASE_URL}/api/admin/stayEditReq?pno=${pno}`, {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setFormData(data.voList);
        setPageVo(data.pageVo);
      });
  }, [pno]);

  const formatPhoneNumber = (phone) => {
    return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
  };

  const moveDetail = (stayNo) => {
    navigate(`stayEditReqDetail/${stayNo}`);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="300px">숙소 수정 요청 목록</StatusSpan>
        </div>

        <div>
          <StyledTable>
            <thead>
              <tr>
                <th>이름</th>
                <th>숙소명</th>
                <th>전화번호</th>
                <th>수정요청일</th>
              </tr>
            </thead>
            <tbody>
              {formData.map((data, idx) => {
                return (
                  <tr
                    key={idx}
                    onClick={() => {
                      moveDetail(data.no);
                    }}
                  >
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
      <PagingDiv>
        <div></div>
        <PagingFooter pageVo={pageVo} url="/adminMenu/stayEditReq" />
        <div></div>
      </PagingDiv>
    </>
  );
};

export default StayEditReq;
