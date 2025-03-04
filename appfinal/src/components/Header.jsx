import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
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

  &:active {
    text-decoration: line-through;
    text-decoration-color: lightblue;
  }

  &:hover {
    text-decoration: line-through;
    text-decoration-color: lightblue;
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
  const [pageNick, setPageNick] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
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
  }, [token, pageNick]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <HeaderContainer>
      <Logo>
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="./img/logo.png" />
        </Link>
      </Logo>
      <NavMenu>
        <StyledLink to="/findstay">FIND STAY</StyledLink>
        <StyledLink to="/findspace">FIND SPACE</StyledLink>
        <StyledLink to="/traffic">TRAFFIC</StyledLink>
        <StyledLink to="/slog">S-LOG</StyledLink>
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
