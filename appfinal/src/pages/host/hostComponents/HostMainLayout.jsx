import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const HomeDiv = styled.div`
  display: grid;
  grid-template-rows: 280px 1fr;
`;

const MainDiv = styled.div`
  display: grid;
  grid-template-columns: 2fr 6fr;
`;

const HeaderDiv = styled.div`
  text-align: center;
  font-weight: ${(props) => {
    return props.weight;
  }};
  color: ${(props) => {
    return props.color;
  }};
  font-size: ${(props) => {
    return props.size;
  }};
  margin-top: ${(props) => {
    return props.margin;
  }};
  margin-bottom: ${(props) => {
    return props.marginBot;
  }};
  padding: 0px;
`;

const Hr = styled.hr`
  margin-top: 40px;
  background-color: #202020;
  width: 85%;
`;

const MenuAreaDiv = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-rows: repeat(7, 60px);
  place-items: center center;
`;

const MenuDiv = styled.div`
  color: black;
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    color: #2b8c44;
    font-weight: 600;
  }
`;

const HostMainLayout = ({ children }) => {
  const navigate = useNavigate();

  function movePath(e) {
    navigate(`/hostMenu/${e.target.id}`);
  }
  return (
    <>
      <HomeDiv>
        <div>
          <HeaderDiv size="40px" color="#2B8C44" margin="70px" weight="400">
            HOST
          </HeaderDiv>
          <HeaderDiv
            size="50px"
            color="black"
            weight="600"
            margin="10px"
            marginBot="70px"
          >
            이예은님 반가워요!
          </HeaderDiv>
          <Hr />
        </div>
        <MainDiv>
          <MenuAreaDiv>
            <MenuDiv name="" onClick={movePath}>
              숙소 예약 정보
            </MenuDiv>
            <MenuDiv id="spaceReserv" onClick={movePath}>
              공간 예약 정보
            </MenuDiv>
            <MenuDiv id="editHost" onClick={movePath}>
              회원 정보 수정
            </MenuDiv>
            <MenuDiv id="slogMgmt" onClick={movePath}>
              S-Log 관리
            </MenuDiv>
            <MenuDiv id="bookmark" onClick={movePath}>
              북마크
            </MenuDiv>
            <MenuDiv id="message" onClick={movePath}>
              메세지
            </MenuDiv>
            <MenuDiv id="hostMgmtMenu" onClick={movePath}>
              호스트 관리
            </MenuDiv>
          </MenuAreaDiv>
          <div>{children}</div>
        </MainDiv>
      </HomeDiv>
    </>
  );
};

export default HostMainLayout;
