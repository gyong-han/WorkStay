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
  position: fixe;
`;

const MenuDiv = styled.div`
  color: ${(props) => (props.selected ? "#F20530" : "black")};
  font-size: 20px;
  font-weight: 400;
  cursor: pointer;
  &:hover {
    color: #f20530;
  }
`;

const AdminLayOut = ({ children }) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("");

  function movePath(e) {
    setSelectedMenu(e.target.id);
    navigate(`/adminMenu/${e.target.id}`);
  }

  return (
    <>
      <HomeDiv>
        <div>
          <HeaderDiv size="40px" color="#F20530" margin="70px" weight="400">
            ADMIN
          </HeaderDiv>
          <HeaderDiv
            size="50px"
            color="black"
            weight="600"
            margin="10px"
            marginBot="70px"
          >
            관리자님 반가워요!
          </HeaderDiv>
          <Hr />
        </div>
        <MainDiv>
          <MenuAreaDiv>
            <MenuDiv id="" onClick={movePath} selected={selectedMenu === ""}>
              호스트 조회
            </MenuDiv>
            <MenuDiv
              id="stayEnrollReq"
              onClick={movePath}
              selected={selectedMenu === "stayEnrollReq"}
            >
              숙소 입점 요청
            </MenuDiv>
            <MenuDiv
              id="spaceEnrollReq"
              onClick={movePath}
              selected={selectedMenu === "spaceEnrollReq"}
            >
              공간 입점 요청
            </MenuDiv>
            <MenuDiv
              id="stayEditReq"
              onClick={movePath}
              selected={selectedMenu === "stayEditReq"}
            >
              숙소 수정 요청
            </MenuDiv>
            <MenuDiv
              id="spaceEditReq"
              onClick={movePath}
              selected={selectedMenu === "spaceEditReq"}
            >
              숙소 수정 요청
            </MenuDiv>
            <MenuDiv
              id="stayDelReq"
              onClick={movePath}
              selected={selectedMenu === "stayDelReq"}
            >
              숙소 취소 요청
            </MenuDiv>
            <MenuDiv
              id="spaceDelReq"
              onClick={movePath}
              selected={selectedMenu === "spaceDelReq"}
            >
              공간 취소 요청
            </MenuDiv>
          </MenuAreaDiv>
          <div>{children}</div>
        </MainDiv>
      </HomeDiv>
    </>
  );
};

export default AdminLayOut;
