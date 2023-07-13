import React, { useState } from "react";
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
  };

  // 추가에 성공하면 바로 List 페이지로 이동하기
  // 모든 입력값 입력하지 않으면 버튼 비활성화

  return (
    <div>
      <div>
        <label>made by</label>
        <input
          value={name}
          onChange={onChangeNameHandler}
          placeholder="작성자의 이름을 입력해주세요.(5자 이내)"
        />
      </div>
      <div>
        <label>playlist 제목</label>
        <input
          value={title}
          onChange={onChangeTitleHandler}
          placeholder="플레이리스트 제목을 입력해주세요.(20자 이내)"
        />
      </div>
      <div>
        <label>playlist 소개</label>
        <textarea
          value={contents}
          onChange={onChangeContentsHandler}
          placeholder="플레이리스트에 대한 간략한 소개를 입력해주세요.(50자 이내)"
        />
      </div>
      <div>
        <label>비밀번호</label>
        <input
          type="password"
          value={password}
          onChange={onChangePasswordHandler}
          placeholder="숫자 4자리"
        />
      </div>
      <button onClick={addButtonHandler}>추가하기</button>
    </div>
  );
};

export default Form;
