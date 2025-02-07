import React from "react";
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

const HostList = () => {
  const navigate = useNavigate();
  const hostDetail = () => {
    navigate("/adminMenu/hostDetail/1");
  };
  return (
    <>
      <MainDiv>
        <div>
          <StatusSpan left="330px">호스트 목록조회</StatusSpan>
        </div>
        <div>MyStayMgmt</div>
        <button onClick={hostDetail}>호스트 상세조회</button>
      </MainDiv>
    </>
  );
};

export default HostList;
