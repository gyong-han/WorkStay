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

const SpaceEnrollReq = () => {
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
    fetch(`${BASE_URL}/api/admin/spaceEnrollReqList?pno=${pno}`, {
      method: "POST",
    })
      .then((resp) => resp.json())
      .then((data) => {
        setDataArr(data.voList);
        setPageVo(data.pageVo);
      });
  }, [pno]);

  const moveDetail = (no) => {
    navigate(`/adminMenu/spaceEnrollReqDetail/${no}`);
  };

  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="300px">공간 입점 요청 목록</StatusSpan>
        </div>
        <div>
          <Table
            th1="이름"
            th2="이메일"
            th3="전화번호"
            th4="공간명"
            dataArr={dataArr}
            f={moveDetail}
          />
        </div>
      </MainDiv>
      <PagingDiv>
        <div></div>
        <PagingFooter pageVo={pageVo} url="/adminMenu/spaceEnrollReq" />
        <div></div>
      </PagingDiv>
    </>
  );
};

export default SpaceEnrollReq;
