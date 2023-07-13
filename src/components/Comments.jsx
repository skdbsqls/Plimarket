import React, { useState } from "react";
import shortid from "shortid";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from "../axios/comments";
import { useParams } from "react-router-dom";

const Comments = () => {
  const { id } = useParams();
  const [commentName, setCommentName] = useState("");
  const [commentTitle, setCommentTitle] = useState("");
  const [editId, setEditId] = useState(null);
  const [editedCommentName, setEditedCommentName] = useState("");
  const [editedCommentTitle, setEditedCommentTitle] = useState("");

  const onChangeCommentNameHandler = (event) => {
    setCommentName(event.target.value);
  };
  const onChangeCommentTitleHandler = (event) => {
    setCommentTitle(event.target.value);
  };
  const onChangeEditCommentNameHandler = (event) => {
    setEditedCommentName(event.target.value);
  };
  const onChangeEditCommentTitleHandler = (event) => {
    setEditedCommentTitle(event.target.value);
  };

  // Comments 조회
  const { data: comments } = useQuery("comments", getComments);
  const filterdComments = comments?.filter(
    (comment) => comment.playlistId === id
  );

  // Comment 추가
  const queryClient = useQueryClient();
  const addMutation = useMutation(addComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
  const addButtonHandler = () => {
    // 입력값 검사
    const newComment = {
      id: shortid(),
      playlistId: id,
      name: commentName,
      title: commentTitle,
    };
    addMutation.mutate(newComment);
    // 입력값 초기화
  };

  // Comment 삭제
  const deleteMutation = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
  const deleteButtonHandler = (id) => {
    alert("진짜 삭제할거얌?");
    deleteMutation.mutate(id);
  };

  // Comment 수정
  const editMutation = useMutation(editComment, {
    onSuccess: () => {
      queryClient.invalidateQueries("comments");
    },
  });
  const editButtonHandler = (comment) => {
    setEditId(comment.id);
    if (!editId) {
      setEditedCommentName(comment.name);
      setEditedCommentTitle(comment.title);
    } else {
      const editedComment = {
        id: comment.id,
        name: editedCommentName,
        title: editedCommentTitle,
      };
      editMutation.mutate(editedComment);
      setEditId(null);
    }
  };

  return (
    <>
      <button></button>
      <div>Playlist를 채워주세요</div>
      <div>
        <input
          placeholder={"가수 이름"}
          value={commentName}
          onChange={onChangeCommentNameHandler}
        />
        <input
          placeholder={"노래 제목"}
          value={commentTitle}
          onChange={onChangeCommentTitleHandler}
        />
        <button onClick={addButtonHandler}>노래 추가</button>
      </div>
      {filterdComments?.map((comment) => (
        <div key={comment.id}>
          {comment.id === editId ? (
            <input
              value={editedCommentName}
              onChange={onChangeEditCommentNameHandler}
            />
          ) : (
            <span>{comment.name}</span>
          )}
          {comment.id === editId ? (
            <input
              value={editedCommentTitle}
              onChange={onChangeEditCommentTitleHandler}
            />
          ) : (
            <span>{comment.title}</span>
          )}
          <button onClick={() => deleteButtonHandler(comment.id)}>삭제</button>
          <button onClick={() => editButtonHandler(comment)}>
            {comment.id === editId ? "저장" : "수정"}
          </button>
        </div>
      ))}
    </>
  );
};

export default Comments;
