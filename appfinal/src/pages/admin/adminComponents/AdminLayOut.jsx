import { jwtDecode } from "jwt-decode";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Alert from "../../../components/Alert";

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
  grid-template-rows: repeat(9, 60px);
  place-items: center center;
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

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const AdminLayOut = ({ children }) => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState("");
  const [url, setUrl] = useState("");
  const { pathname } = useLocation();
  const token = localStorage.getItem("token");
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [pageNick, setPageNick] = useState("");

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const pageNick = decodedToken.pageNick;
      setPageNick(pageNick);
      if (pageNick != "ADMIN") {
        setIsAlertOpen(true);
      }
    } else {
      navigate("/login");
    }
  }, [token]);

  useEffect(() => {
    const lastPath = pathname.split("/").pop();
    setUrl(lastPath);
  }, []);

  useEffect(() => {
    setSelectedMenu(url);
  }, [url]);

  function movePath(e) {
    setSelectedMenu(e.target.id);
    navigate(`/adminMenu/${e.target.id}`);
  }

  const handleAlertClose = () => {
    setIsAlertOpen(false);
    navigate("/");
  };

  return (
    <>
      {pageNick === "ADMIN" ? (
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
              <MenuDiv
                id=""
                onClick={movePath}
                selected={selectedMenu === "" || selectedMenu === "adminMenu"}
              >
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
                id="roomEditReq"
                onClick={movePath}
                selected={selectedMenu === "roomEditReq"}
              >
                독채 수정 요청
              </MenuDiv>
              <MenuDiv
                id="spaceEditReq"
                onClick={movePath}
                selected={selectedMenu === "spaceEditReq"}
              >
                공간 수정 요청
              </MenuDiv>
              <MenuDiv
                id="stayDelReq"
                onClick={movePath}
                selected={selectedMenu === "stayDelReq"}
              >
                숙소 삭제 목록
              </MenuDiv>
              <MenuDiv
                id="spaceDelReq"
                onClick={movePath}
                selected={selectedMenu === "spaceDelReq"}
              >
                공간 삭제 목록
              </MenuDiv>
              <MenuDiv
                id="faq"
                onClick={movePath}
                selected={selectedMenu === "faq"}
              >
                FAQ
              </MenuDiv>
            </MenuAreaDiv>
            <div>{children}</div>
          </MainDiv>
        </HomeDiv>
      ) : (
        <></>
      )}

      {isAlertOpen && (
        <Backdrop>
          <Alert
            title="권한 오류"
            titleColor="red"
            message="관리자만 접근 가능합니다."
            buttonText="확인"
            buttonColor="#049dd9"
            onClose={handleAlertClose}
          />
        </Backdrop>
      )}
    </>
  );
};

export default AdminLayOut;
