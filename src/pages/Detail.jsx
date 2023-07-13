import React, { useState } from "react";
import { styled } from "styled-components";
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
      <LayOut>
        <FormContainer>
          <div>
            <ButtonConainer>
              <div>
                <Link to="/list">
                  <div>🔙</div>
                </Link>
              </div>
              <div>
                <StButton onClick={deleteButtonHandler}>❌</StButton>
                <StButton onClick={() => editButtonHandler(playlist?.password)}>
                  {edit ? "✔️" : "✏️"}
                </StButton>
              </div>
            </ButtonConainer>
            {edit ? (
              <ContentBox>
                <div>
                  <input
                    value={editedTitle}
                    onChange={onChangeEditedTitleHandler}
                  />
                </div>
                {/* <div>
                  <input
                    value={editedName}
                    onChange={onChangeEditedNameHandler}
                  />
                </div> */}
                <textarea
                  value={editedContents}
                  onChange={onChangeEditedContentsHandler}
                />
              </ContentBox>
            ) : (
              <ContentBox>
                <div style={{ marginBottom: "10px", fontSize: "20px" }}>
                  📀&nbsp;{playlist?.title}
                </div>
                {/* <div style={{ marginBottom: "5px" }}>{playlist?.name}</div> */}
                <div style={{ marginLeft: "30px" }}>{playlist?.contents}</div>
              </ContentBox>
            )}
          </div>
        </FormContainer>
      </LayOut>
      <Comments />
    </>
  );
};

export default Detail;

const LayOut = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
  width: 800px;
  height: 200px;
  padding-bottom: 20px;
  background-color: #06014d;
  border-radius: 10px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ButtonConainer = styled.div`
  width: 750px;
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`;

const StButton = styled.button`
  background-color: transparent;
  border: none;
`;

const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 660px;
  height: 120px;
  /* background-color: #fff; */
  margin: 10px 30px 30px 30px;
  padding-left: 30px;
  border-radius: 20px;
  font-weight: bold;
  color: #fff;
  border: 2px solid #fff;
`;
