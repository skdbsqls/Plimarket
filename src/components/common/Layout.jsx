import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import background from "../../assets/background.jpg";

const Layout = () => {
  return (
    <Background>
      <Header />
      <Outlet />
      {/* <div>Footer</div> */}
    </Background>
  );
};

export default Layout;

const Background = styled.div`
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100vw;
  height: 100vh;
`;
