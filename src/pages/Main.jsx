import React from "react";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <Link to="/form">
        <div>플레이리스트 만들기</div>
      </Link>
      <Link to="/list">
        <div>플레이리스트 채우기</div>
      </Link>
    </>
  );
};

export default Main;
