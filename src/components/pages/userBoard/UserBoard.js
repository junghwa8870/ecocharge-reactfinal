import React, { useState } from 'react';
import './UserBoard.scss';
import { useNavigate } from 'react-router-dom';
import { BOARD, BOARD_REPLY } from '../../../config/host_config';
import axiosInstance from '../../../config/axios-config';
import { dark } from '@mui/material/styles/createPalette';

const UserBoard = () => {
  const redirection = useNavigate();

  // 요소 취득 예정
  // const data = JSON.stringify({
  //   bWriter: $bWriter,
  //   bContent: $bContent,
  //   bAddress: $bAddress,
  //   bTitle: $bTitle,
  //   bProfileImage: $bProfileImage,
  // });

  // 게시판
  const API_BASE_URL = BOARD;

  const [board, setBoard] = useState([]);

  // const [token, setToken] = useState('');

  // 게시판 등록 추가 함수
  const addBoard = async (
    bWriter,
    bContent,
    bAddress,
    bTitle,
    bProfileImage,
  ) => {
    const newBoard = {
      bWriter: bWriter,
      bContent: bContent,
      bAddress: bAddress,
      bTitle: bTitle,
      bProfileImage: bProfileImage,
    };
    handleRequest(
      () => axiosInstance.post(API_BASE_URL, newBoard),
      (data) => setBoard(dark.board),
    );
  };

  // 할 일 삭제 처리 함수
  const removeBoard = async (id) => {
    handleRequest(
      () => axiosInstance.delete(`${API_BASE_URL}/${id}`),
      (data) => setBoard(data.todos),
    );
  };

  return <div>userBoard</div>;
};

export default UserBoard;
