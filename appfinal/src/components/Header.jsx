import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderContainer = styled.header`
  display: grid;
  grid-template-columns: 2fr 10fr 1fr;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  position: sticky;
  top: 0px;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  text-align: left;
  color: black;

  a {
    text-decoration: none;
    color: black;

    &:hover {
      color: lightblue;
    }
  }
`;

const NavMenu = styled.nav`
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-self: end;
  gap: 30px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: 500;

  &:hover {
    text-decoration: line-through;
    text-decoration-color: lightblue;
  }
`;

const Login = styled(Link)`
  text-align: right;
  color: lightblue;
  font-weight: 500;
  text-decoration: none;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <Link to="/" style={{ textDecoration: "none" }}>
          work stay
        </Link>
      </Logo>
      <NavMenu>
        <StyledLink to="/findstay">FIND STAY</StyledLink>
        <StyledLink to="/findspace">FIND SPACE</StyledLink>
        <StyledLink to="/traffic">TRAFFIC</StyledLink>
        <StyledLink to="/slog">S-LOG</StyledLink>
      </NavMenu>
      <Login to="/login">LOGIN</Login>
    </HeaderContainer>
  );
};

export default Header;
