import React, { useState } from 'react';
import './UserBoard.scss';
import { useNavigate } from 'react-router-dom';
import { BOARD, BOARD_REPLY } from '../../../config/host_config';
import axiosInstance from '../../../config/axios-config';
import { dark } from '@mui/material/styles/createPalette';
import { Grid } from '@mui/material';
import { Button, Table } from 'reactstrap';
import Paging from '../../layout/Paging';

const UserBoard = () => {
  const navigate = useNavigate();

  const data = [
    {
      no: '글번호',
      title: '제목',
      writer: '작성자',
      date: '작성일',
      view: '조회수',
    },
    {
      no: 1,
      title: 'First Post',
      writer: 'Alice',
      date: '2023-06-24',
      view: '1',
    },
    {
      no: 2,
      title: 'Second Post',
      writer: 'Bob',
      date: '2023-06-23',
      view: '1',
    },
    {
      no: 3,
      title: 'Third Post',
      writer: 'Charlie',
      date: '2023-06-22',
      view: '1',
    },
    {
      no: 4,
      title: 'Forth Post',
      writer: 'Charlie',
      date: '2023-06-23',
      view: '1',
    },
    {
      no: 5,
      title: 'Fifth Post',
      writer: 'Younghee',
      date: '2023-06-24',
      view: '2',
    },
    // {
    //   no: 6,
    //   title: 'Sixth Post',
    //   writer: 'Junhee',
    //   date: '2023-06-25',
    //   view: '2',
    // },
  ];

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
          <Button
            className='goBwriteForm'
            onClick={() => navigate('/writeBoardForm')}
          >
            작성하기
          </Button>
        </div>
      </div>

      <Table className='user-board-table'>
        {/* <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Author</th>
            <th>Date</th>
            <th>View</th>
          </tr>
        </thead> */}
        <div className='boardInnerBox'>
          {data.map((post) => (
            <div
              key={post.no}
              className='bRow'
              onClick={() => navigate('/userBoardDetail')}
            >
              <div className='Bno'>{post.no}</div>
              <div className='Btitle'>{post.title}</div>
              <div className='Bwriter'>{post.writer}</div>
              <div className='Bdate'>{post.date}</div>
              <div className='Bview'>{post.view}</div>
            </div>
          ))}
        </div>
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
