import React, { useState } from "react";
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
  height: 2px;
`;

const MenuAreaDiv = styled.div`
  margin-top: 40px;
  display: grid;
  grid-template-rows: repeat(7, 60px);
  place-items: center center;
`;

const MenuDiv = styled.div`
  color: ${(props) => (props.selected ? "#049dd9" : "black")};
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;

  &:hover {
    color: #049dd9;
  }
`;

const HostMainLayout = ({ children }) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("");

  function movePath(e) {
    setSelectedMenu(e.target.id);
    navigate(`/hostMenu/${e.target.id}`);
  }
  return (
    <>
      <HomeDiv>
        <div>
          <HeaderDiv size="40px" color="#049dd9" margin="70px" weight="400">
            Guest
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
            <MenuDiv id="" onClick={movePath} selected={selectedMenu === ""}>
              숙소 예약 정보
            </MenuDiv>
            <MenuDiv
              id="spaceReserv"
              onClick={movePath}
              selected={selectedMenu === "spaceReserv"}
            >
              공간 예약 정보
            </MenuDiv>
            <MenuDiv
              id="editHost"
              onClick={movePath}
              selected={selectedMenu === "editHost"}
            >
              회원 정보 수정
            </MenuDiv>
            <MenuDiv
              id="slogMgmt"
              onClick={movePath}
              selected={selectedMenu === "slogMgmt"}
            >
              S-Log 관리
            </MenuDiv>
            <MenuDiv
              id="bookmark"
              onClick={movePath}
              selected={selectedMenu === "bookmark"}
            >
              북마크
            </MenuDiv>
            <MenuDiv
              id="message"
              onClick={movePath}
              selected={selectedMenu === "message"}
            >
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
