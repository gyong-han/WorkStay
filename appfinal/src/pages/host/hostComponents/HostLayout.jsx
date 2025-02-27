import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  color: ${(props) => (props.selected ? "#2B8C44" : "black")};
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    color: #2b8c44;
  }
`;

const HostLayout = ({ children }) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("");
  const [url, setUrl] = useState("");
  const { pathname } = useLocation();

  useEffect(() => {
    const lastPath = pathname.split("/").pop();
    setUrl(lastPath);
  }, []);

  useEffect(() => {
    setSelectedMenu(url);
  }, [url]);

  function movePath(e) {
    setSelectedMenu(e.target.id);
    navigate(`/hostMenu/hostMgmtMenu/${e.target.id}`);
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
            <MenuDiv
              id=""
              onClick={movePath}
              selected={selectedMenu === "" || selectedMenu === "hostMgmtMenu"}
            >
              숙소 예약 관리
            </MenuDiv>
            <MenuDiv
              id="spaceReservMgmt"
              onClick={movePath}
              selected={selectedMenu === "spaceReservMgmt"}
            >
              공간 예약 관리
            </MenuDiv>
            <MenuDiv
              id="stayApprovalMgmt"
              onClick={movePath}
              selected={selectedMenu === "stayApprovalMgmt"}
            >
              숙소 승인 관리
            </MenuDiv>
            <MenuDiv
              id="spaceApprovalMgmt"
              onClick={movePath}
              selected={selectedMenu === "spaceApprovalMgmt"}
            >
              공간 승인 관리
            </MenuDiv>
            <MenuDiv
              id="myStayMgmt"
              onClick={movePath}
              selected={selectedMenu === "myStayMgmt"}
            >
              내 숙소 관리
            </MenuDiv>
            <MenuDiv
              id="mySpaceMgmt"
              onClick={movePath}
              selected={selectedMenu === "mySpaceMgmt"}
            >
              내 공간 관리
            </MenuDiv>
            <MenuDiv
              id="msgggg"
              onClick={movePath}
              selected={selectedMenu === "msgggg"}
            >
              메세지
            </MenuDiv>
          </MenuAreaDiv>
          <div>{children}</div>
        </MainDiv>
      </HomeDiv>
    </>
  );
};

export default HostLayout;
