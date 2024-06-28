import React, { useContext, useEffect, useState } from 'react';
import './UserBoard.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  API_BASE_URL,
  BOARD,
  BOARD_REPLY,
  USER,
} from '../../../config/host-config';
import axiosInstance from '../../../config/axios-config';
import { dark } from '@mui/material/styles/createPalette';
import { Grid } from '@mui/material';
import { Button, Table } from 'reactstrap';
import Paging from '../../layout/Paging';
import axios from 'axios';
import handleRequest from '../../../utils/handleRequest';
import AuthContext from '../../../utils/AuthContext';

const UserBoard = () => {
  const navigate = useNavigate();
  const [boardList, setBoardList] = useState([]);
  const { onLogout } = useContext(AuthContext);

  useEffect(() => {
    const getBoardList = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}${BOARD}`);
        const data = response.data; // API에서 반환되는 실제 데이터 위치에 따라 설정
        console.log(data);
        setBoardList(data.boards); // 게시물 목록 설정
      } catch (error) {
        console.error('게시물 목록을 가져오는 중 오류 발생:', error);
        // 오류 처리 로직 추가 가능
      }
    };

    getBoardList(); // 컴포넌트가 마운트될 때 게시물 목록을 가져옴
  }, []); // 빈 배열을 전달하여 한 번만 실행되도록 설정

  const writeBoardFormHandler = async () => {
    const onSuccess = () => {
      navigate('/writeBoardForm');
    };
    handleRequest(
      () => axiosInstance.get(`${API_BASE_URL}${USER}/validate`),
      onSuccess,
      onLogout,
      navigate,
    );
  };

  return (
    <Grid className='user-board-container'>
      <h1 className='user-board-title'>게시판</h1>
      <div className='Bcomentbox'>
        <div className='Bcomment-inner'>
          <div className='Bcoment'>
            ●게시글 작성 및 댓글 달기는{' '}
            <span className='bold'>회원가입 후 가능</span>합니다.
          </div>
          <div className='Bcoment'>
            ●게시글에 대한 피드백은{' '}
            <span className='bold'>예의 바르고 존중하는 태도</span>로
            남겨주세요.
          </div>
          <div className='Bcoment'>
            ●부적절한 글이나 댓글은 <span className='bold'>신고 기능</span>을
            통해 알려주세요.
          </div>
        </div>
        <div className='goBWriteBtnbox'>
          <Button className='goBwriteForm' onClick={writeBoardFormHandler}>
            작성하기
          </Button>
        </div>
      </div>

      <Table className='user-board-table'>
        <tbody className='boardInnerBox'>
          {boardList.map((board) => (
            <tr
              key={board.boardNo}
              className='bRow'
              onClick={() =>
                navigate(`${BOARD}/detail?boardNo=${board.boardNo}`, {
                  state: board.boardNo,
                })
              }
            >
              <td className='Bno'>{board.boardNo}</td>
              <td className='Btitle'>{board.btitle}</td>
              <td className='Bwriter'>{board.bwriter}</td>
              <td className='Bdate'>{board.createDate}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div
        className='paging-container'
        style={{
          display: 'flex',
          justifyContent: 'center',
          // marginTop: '100px',
        }}
      >
        <Paging />
      </div>
    </Grid>
  );
};

export default UserBoard;
