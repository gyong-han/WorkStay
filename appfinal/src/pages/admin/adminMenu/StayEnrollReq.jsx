import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Table from "../../../components/table/Table";
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

const StayEnrollReq = () => {
  window.scrollTo(0, 0);
  const [dataArr, setDataArr] = useState([]);
  const navigate = useNavigate();
  const [pageVo, setPageVo] = useState({});
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  let pno = queryParams.get("pno");
  if (pno === null) {
    pno = 1;
  }

  useEffect(() => {
    fetch(`${BASE_URL}/api/admin/stayEnrollReqList?pno=${pno}`, {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data.voList);
        setPageVo(data.pageVo);
      });
  }, [pno]);

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
      <PagingDiv>
        <div></div>
        <PagingFooter pageVo={pageVo} url="/adminMenu/stayEnrollReq" />
        <div></div>
      </PagingDiv>
    </>
  );
};

export default StayEnrollReq;
