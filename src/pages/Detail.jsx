import React, { useState } from "react";
import Comments from "../components/Comments";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { Link, useParams } from "react-router-dom";
import { deletePlaylist, editPlaylist, getPlaylist } from "../axios/api";

const Detail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: playlist } = useQuery("playlist", () => getPlaylist(id));
  const [edit, setEdit] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContents, setEditedContents] = useState("");

  const onChangeEditedNameHandler = (event) => {
    setEditedName(event.target.value);
  };
  const onChangeEditedTitleHandler = (event) => {
    setEditedTitle(event.target.value);
  };
  const onChangeEditedContentsHandler = (event) => {
    setEditedContents(event.target.value);
  };

  // Playlist 삭제
  const deleteMutation = useMutation(deletePlaylist, {
    // 삭제하면 조회할 필요 없잖아...
    // onSuccess: () => {
    //   queryClient.invalidateQueries("playlists");
    // },
  });
  const deleteButtonHandler = () => {
    alert("진짜 삭제할거얌?");
    deleteMutation.mutate(id);
    // 삭제하면 이전페이지(List)로 이동하기
  };

  // Playlist 수정
  const editMutation = useMutation(editPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries("playlist");
    },
  });
  const editButtonHandler = (password) => {
    const checkpassword = prompt("비밀번호를 입력하세요");
    if (checkpassword !== password) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      setEdit(!edit);
      if (!edit) {
        setEditedName(playlist?.name);
        setEditedTitle(playlist?.title);
        setEditedContents(playlist?.contents);
      } else {
        const editedPlaylist = {
          id,
          name: editedName,
          title: editedTitle,
          contents: editedContents,
        };
        editMutation.mutate(editedPlaylist);
      }
    }
  };

  return (
    <>
      <Link to="/list">
        <div>↩️</div>
      </Link>
      <div>
        <div>
          <button onClick={deleteButtonHandler}>삭제</button>
          <button onClick={() => editButtonHandler(playlist?.password)}>
            {edit ? "저장" : "수정"}
          </button>
        </div>
        {edit ? (
          <div>
            <div>
              <input
                value={editedTitle}
                onChange={onChangeEditedTitleHandler}
              />
            </div>
            <div>
              <input value={editedName} onChange={onChangeEditedNameHandler} />
            </div>
            <textarea
              value={editedContents}
              onChange={onChangeEditedContentsHandler}
            />
          </div>
        ) : (
          <div>
            <div>📀{playlist?.title}</div>
            <div>{playlist?.name}</div>
            <div>{playlist?.contents}</div>
          </div>
        )}
      </div>
      <Comments />
    </>
  );
};

export default Detail;
