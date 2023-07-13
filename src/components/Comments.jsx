import React, { useState } from "react";
import { styled } from "styled-components";
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
    setCommentName("");
    setCommentTitle("");
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
    <LayOut>
      <FormContainer>
        <StCommentBox>Playlist를 채워주세요</StCommentBox>
        <InputContainer>
          <InputBox
            style={{ width: "80px" }}
            placeholder={"가수 이름"}
            value={commentName}
            onChange={onChangeCommentNameHandler}
          />
          <InputBox
            style={{ width: "180px" }}
            placeholder={"노래 제목"}
            value={commentTitle}
            onChange={onChangeCommentTitleHandler}
          />
          <StButton onClick={addButtonHandler}>노래 추가</StButton>
        </InputContainer>
        <div style={{ overflow: "auto" }}>
          {filterdComments?.map((comment) => (
            <div key={comment.id}>
              {comment.id === editId ? (
                <input
                  style={{ marginLeft: "50px" }}
                  value={editedCommentName}
                  onChange={onChangeEditCommentNameHandler}
                />
              ) : (
                <span style={{ marginLeft: "50px" }}>{comment.name}</span>
              )}
              {comment.id === editId ? (
                <input
                  value={editedCommentTitle}
                  onChange={onChangeEditCommentTitleHandler}
                />
              ) : (
                <span style={{ margin: "0 20px 0 10px" }}>{comment.title}</span>
              )}
              <Button onClick={() => deleteButtonHandler(comment.id)}>
                ❌
              </Button>
              <Button onClick={() => editButtonHandler(comment)}>
                {comment.id === editId ? "✔️" : "✏️"}
              </Button>
            </div>
          ))}
        </div>
      </FormContainer>
    </LayOut>
  );
};

export default Comments;

const LayOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 800px;
  height: 400px;
  padding-bottom: 20px;
  background-color: #fff;
  border-radius: 10px;
  opacity: 0.8;
  display: flex;
  flex-direction: column;
  margin-top: 25px;
  color: #06014d;
`;

const StCommentBox = styled.div`
  padding-bottom: 10px;
  margin: 30px 50px 0 50px;
  font-weight: bold;
  font-size: 20px;
  border-bottom: 3px solid #06014d;
`;

const InputContainer = styled.div`
  margin: 20px 0 20px 50px;
`;

const InputBox = styled.input`
  height: 20px;
  margin-right: 20px;
  border: 2px solid #06014d;
  border-radius: 10px;
`;

const StButton = styled.button`
  width: 100px;
  height: 30px;
  border-radius: 20px;
  background-color: #06014dd1;
  color: #fff;
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
`;
