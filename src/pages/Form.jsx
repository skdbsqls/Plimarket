import React, { useState } from "react";
import { styled } from "styled-components";
import shortid from "shortid";
import { useMutation, useQueryClient } from "react-query";
import { addPlaylist } from "../axios/api";

const Form = () => {
  // 입력값
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const [password, setPassword] = useState("");

  const onChangeNameHandler = (event) => {
    setName(event.target.value);
  };
  const onChangeTitleHandler = (event) => {
    setTitle(event.target.value);
  };
  const onChangeContentsHandler = (event) => {
    setContents(event.target.value);
  };
  const onChangePasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  // Playlist 추가
  const queryClient = useQueryClient();
  const addMutation = useMutation(addPlaylist, {
    onSuccess: () => {
      queryClient.invalidateQueries("playlists");
    },
  });
  const addButtonHandler = () => {
    // 입력값 검사
    const newPlaylist = {
      id: shortid(),
      name,
      title,
      contents,
      password,
    };
    addMutation.mutate(newPlaylist);
    // 입력값 초기화
    setName("");
    setTitle("");
    setContents("");
    setPassword("");
  };

  // 추가에 성공하면 바로 List 페이지로 이동하기
  // 모든 입력값 입력하지 않으면 버튼 비활성화

  return (
    <LayOut>
      <FormContainer>
        <div style={{ display: "flex", margin: "30px 100px 0 0" }}>
          <LabelBox>Made By</LabelBox>
          <InputBox
            style={{ width: "240px", marginLeft: "15px" }}
            value={name}
            onChange={onChangeNameHandler}
            placeholder="작성자의 이름을 입력해주세요.(5자 이내)"
          />
        </div>
        <div style={{ display: "flex", marginRight: "80px" }}>
          <LabelBox>비밀번호</LabelBox>
          <InputBox
            style={{ width: "130px", margin: "0 120px 0 24px" }}
            type="password"
            value={password}
            onChange={onChangePasswordHandler}
            placeholder="숫자 4자리"
          />
        </div>
        <div style={{ display: "flex" }}>
          <LabelBox>Playlist 제목</LabelBox>
          <InputBox
            style={{ width: "350px" }}
            value={title}
            onChange={onChangeTitleHandler}
            placeholder="플레이리스트 제목을 입력해주세요.(20자 이내)"
          />
        </div>
        <div style={{ display: "flex", marginLeft: "50px" }}>
          <LabelBox>Playlist 소개</LabelBox>
          <TextareaBox
            value={contents}
            onChange={onChangeContentsHandler}
            placeholder="플레이리스트에 대한 간략한 소개를 입력해주세요.(50자 이내)"
          />
        </div>
        <StButton onClick={addButtonHandler}>추가하기</StButton>
      </FormContainer>
    </LayOut>
  );
};

export default Form;

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
`;

const LabelBox = styled.div`
  font-size: 20px;
  margin: 10px;
  text-align: center;
  font-weight: bold;
  color: #fff;
`;

const InputBox = styled.input`
  height: 30px;
  border: 2px solid #06014d;
  border-radius: 10px;
  padding-left: 10px;
`;

const TextareaBox = styled.textarea`
  width: 400px;
  height: 100px;
  border: 2px solid #06014d;
  border: 2px solid #06014d;
  border-radius: 10px;
  padding-left: 10px;
`;

const StButton = styled.button`
  margin: 30px;
  width: 100px;
  height: 30px;
  font-size: 15px;
  border-radius: 20px;
`;
