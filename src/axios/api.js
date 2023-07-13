import axios from "axios";

const base = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 전체 조회
const getPlaylists = async () => {
  const response = await base.get(`/playlists`);
  return response.data;
};

// 상세 조회
const getPlaylist = async (id) => {
  const response = await base.get(`/playlists/${id}`);
  return response.data;
};

// 추가
const addPlaylist = async (newPlaylist) => {
  await base.post(`/playlists`, newPlaylist);
};

// 삭제
const deletePlaylist = async (id) => {
  await base.delete(`/playlists/${id}`);
};

// 수정
const editPlaylist = async (editedPlaylist) => {
  await base.patch(`/playlists/${editedPlaylist.id}`, editedPlaylist);
};

export { getPlaylists, getPlaylist, addPlaylist, deletePlaylist, editPlaylist };
