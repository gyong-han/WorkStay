import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import GuestDropdown from "./listcomponents/GuestDropdown";
import HostDropdown from "./listcomponents/HostDropdown";
import AdminDropdown from "./listcomponents/AdminDropdown";
import { jwtDecode } from "jwt-decode";
import { BASE_URL } from "./service/config";

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 2fr 10fr 1fr;
  align-items: center;
  height: 80px;
  padding: 20px;
  background-color: #fafafa;
  border-bottom: 1px solid #ccc;
  position: sticky;
  top: 0px;
  z-index: 1000;
`;

const Logo = styled.div`
  img {
    text-decoration: none;
    color: black;
    width: 150px;
    height: 80px;
  }
`;

const NavMenu = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-self: end;
  gap: 40px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 500;
  text-decoration: ${(props) => (props.selected ? "line-through" : "")};
  text-decoration-color: ${(props) => (props.selected ? "#049dd9" : "")};

  &:hover {
    text-decoration: line-through;
    text-decoration-color: #049dd9;
  }
`;

const UserSection = styled.div`
  justify-self: end;
  position: relative;
`;

const GuestButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #049dd9;
  font-weight: 600;
  cursor: pointer;
`;

const HostButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #2b8c44;
  font-weight: 600;
  cursor: pointer;
`;

const AdminButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  color: #f20530;
  font-weight: 600;
  cursor: pointer;
`;

const DropdownWrapper = styled.div`
  position: absolute;
  top: 25px;
  left: -70%;
  transform: translateX(-50%);
  min-width: 180px;
`;

const Header = () => {
  // const pageNick = useSelector((state) => {
  //   return state.member.pageNick;
  // });

  const [selectedMenu, setSelectedMenu] = useState("");
  const [pageNick, setPageNick] = useState("");
  const token = localStorage.getItem("token");
  const [url, setUrl] = useState("");
  const { pathname } = useLocation();
  const lastPath = pathname.split("/").pop();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const kakaoToken = localStorage.getItem(
    "kakao_a6735a34948b72ea00b68392d6281037"
  );

  useEffect(() => {
    setUrl(lastPath);
  }, [lastPath]);

  useEffect(() => {
    setSelectedMenu(url);
    setIsDropdownOpen(false);
  }, [url]);

  useEffect(() => {
    setIsDropdownOpen(false);
    if (location.pathname) {
      if (kakaoToken) {
        setPageNick("GUEST");
        return;
      }
    }
    if (token) {
      const decodedToken = jwtDecode(token);

      fetch(`${BASE_URL}/api/guest/mypage?email=${decodedToken.email}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPageNick(data.pageNick);
        })
        .catch((err) => console.error("회원 정보 불러오기 실패:", err));
    } else {
      setPageNick("LOGIN");
    }
  }, [token, pageNick, kakaoToken]);

  function changeSelected(e) {
    setSelectedMenu(e.target.id);
  }

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="https://sgh-final-server.s3.ap-northeast-2.amazonaws.com/KakaoTalk_20250305_120529785.png" />
        </Link>
      </Logo>
      <NavMenu>
        <StyledLink
          to="/findstay"
          id="findstay"
          onClick={changeSelected}
          selected={selectedMenu === "findstay"}
        >
          FIND STAY
        </StyledLink>
        <StyledLink
          to="/findspace"
          id="findspace"
          onClick={changeSelected}
          selected={selectedMenu === "findspace"}
        >
          FIND SPACE
        </StyledLink>
        <StyledLink
          to="/traffic"
          id="traffic"
          onClick={changeSelected}
          selected={selectedMenu === "traffic"}
        >
          TRAFFIC
        </StyledLink>
        <StyledLink
          to="/slog"
          id="slog"
          onClick={changeSelected}
          selected={selectedMenu === "slog"}
        >
          S-LOG
        </StyledLink>
      </NavMenu>
      <UserSection>
        {pageNick === "LOGIN" ? (
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "#049dd9" }}
          >
            {pageNick}
          </Link>
        ) : pageNick === "GUEST" ? (
          <>
            <GuestButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {pageNick}
            </GuestButton>
            {isDropdownOpen && (
              <DropdownWrapper>
                <GuestDropdown setIsDropdownOpen={setIsDropdownOpen} />
              </DropdownWrapper>
            )}
          </>
        ) : pageNick === "HOST" ? (
          <>
            <HostButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {pageNick}
            </HostButton>
            {isDropdownOpen && (
              <DropdownWrapper>
                <HostDropdown setIsDropdownOpen={setIsDropdownOpen} />
              </DropdownWrapper>
            )}
          </>
        ) : pageNick === "ADMIN" ? (
          <>
            <AdminButton onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              {pageNick}
            </AdminButton>
            {isDropdownOpen && (
              <DropdownWrapper>
                <AdminDropdown setIsDropdownOpen={setIsDropdownOpen} />
              </DropdownWrapper>
            )}
          </>
        ) : null}
      </UserSection>
    </HeaderContainer>
  );
};

export default Header;
