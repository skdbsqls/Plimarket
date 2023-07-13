import React from "react";
import { styled } from "styled-components";
import { useQuery } from "react-query";
import { getPlaylists } from "../axios/api";
import { Link } from "react-router-dom";

const List = () => {
  // Playlist 조회
  const {
    isLoading,
    isError,
    data: playlists,
  } = useQuery("playlists", getPlaylists);

  // Playlist 조회
  if (isLoading) {
    return <h1>로딩중입니다...🎵</h1>;
  }
  if (isError) {
    return <h1>오류 발생🎶</h1>;
  }
  return (
    <LayOut>
      <FormContainer>
        {playlists?.map((playlist) => (
          <div key={playlist.id}>
            <LinkBox to={`/list/${playlist.id}`}>
              <div>📀 &nbsp; {playlist.title}</div>
            </LinkBox>
          </div>
        ))}
      </FormContainer>
    </LayOut>
  );
};

export default List;

const LayOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 800px;
  height: 450px;
  background-color: #06014d;
  border-radius: 20px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  overflow: auto;
`;

const LinkBox = styled(Link)`
  width: 600px;
  height: 45px;
  color: #06014d;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  text-decoration: none;
  margin: 10px;
  border-radius: 20px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;
