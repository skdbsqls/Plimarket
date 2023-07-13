import React from "react";
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
    <div>
      {playlists?.map((playlist) => (
        <div key={playlist.id}>
          <Link to={`/list/${playlist.id}`}>
            <div>📀{playlist.title}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default List;
