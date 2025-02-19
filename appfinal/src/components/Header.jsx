import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

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
`;

const Login = styled(Link)`
  text-align: right;
  color: #049dd9;
  text-decoration: none;
`;

const Header = () => {
  const pageNick = useSelector((state) => {
    return state.member.pageNick;
  });
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
      <Login to="/login">{pageNick}</Login>
    </HeaderContainer>
  );
};

export default Header;
