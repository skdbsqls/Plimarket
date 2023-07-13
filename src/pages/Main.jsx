import React from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <LayOut>
      <MainContainer>
        <LinkBox to="/form">
          플레이리스트 <br />
          만들기
        </LinkBox>
        <LinkBox to="/list">
          플레이리스트 <br />
          채우기
        </LinkBox>
      </MainContainer>
    </LayOut>
  );
};

export default Main;

const LayOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainContainer = styled.div`
  width: 1000px;
  height: 550px;
  background-color: #ffffff27;
  border-radius: 20px;
  opacity: 0.8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LinkBox = styled(Link)`
  width: 250px;
  height: 250px;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  margin: 50px;
  border-radius: 10px;
  background-color: #06014dd8;
  display: flex;
  justify-content: center;
  align-items: center;
`;
