import React from "react";
import { Link } from "react-router-dom";
import { styled } from "styled-components";

const Header = () => {
  return (
    <HeaderContainer>
      <Logo to="/">🎵 PLIMARKET</Logo>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  width: 100vw;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 40px;
  font-weight: bold;
  text-decoration: none;
`;
