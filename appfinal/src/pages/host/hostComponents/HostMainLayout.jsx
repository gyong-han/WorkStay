import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { BASE_URL } from "../../../components/service/config";

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
  const [memberVo, setMemberVo] = useState({});
  const [url, setUrl] = useState("");
  const { pathname } = useLocation();
  const lastPath = pathname.split("/").pop();

  useEffect(() => {
    setUrl(lastPath);
  }, [lastPath]);

  useEffect(() => {
    setSelectedMenu(url);
  }, [url]);

  function movePath(e) {
    setSelectedMenu(e.target.id);
    navigate(`/hostMenu/${e.target.id}`);
  }
  const token = localStorage.getItem("token");

  //토큰 정보 있으면 화면에 보여주기
  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setMemberVo((prev) => ({
        ...prev,
        email: decodedToken.email,
        pageNick: decodedToken.pageNick,
      }));

      //  2. 회원 정보 가져오기 (프론트에서 직접 이메일 보냄)
      fetch(`${BASE_URL}/api/guest/mypage?email=${decodedToken.email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setMemberVo(data);
        })
        .catch((err) => console.error("회원 정보 불러오기 실패:", err));
    }
  }, [token]);

  const pageNick = useSelector((state) => {
    return state.member.pageNick;
  });

  return (
    <>
      <HomeDiv>
        <div>
          <HeaderDiv size="40px" color="#049dd9" margin="70px" weight="400">
            {memberVo.pageNick}
          </HeaderDiv>
          <HeaderDiv
            size="50px"
            color="black"
            weight="600"
            margin="10px"
            marginBot="70px"
          >
            {memberVo.name}님 반가워요!
          </HeaderDiv>
          <Hr />
        </div>
        <MainDiv>
          <MenuAreaDiv>
            <MenuDiv
              id=""
              onClick={movePath}
              selected={selectedMenu === "" || selectedMenu === "hostMenu"}
            >
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
            {/* <MenuDiv
              id="message"
              onClick={movePath}
              selected={selectedMenu === "message"}
            >
              메세지
            </MenuDiv> */}
            {pageNick === "LOGIN" ? (
              <></>
            ) : pageNick === "GUEST" ? (
              <></>
            ) : pageNick === "HOST" ? (
              <MenuDiv id="hostMgmtMenu" onClick={movePath}>
                호스트 관리
              </MenuDiv>
            ) : pageNick === "ADMIN" ? (
              <></>
            ) : null}
          </MenuAreaDiv>
          <div>{children}</div>
        </MainDiv>
      </HomeDiv>
    </>
  );
};

export default HostMainLayout;
