import React from 'react';
import './UserBoard.scss';
import { Grid } from '@mui/material';
import { Button, Table } from 'reactstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import Paging from '../../layout/Paging';

const UserBoard = () => {
  const navigate = useNavigate();

  const data = [
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
    {
      no: 6,
      title: 'Sixth Post',
      writer: 'Junhee',
      date: '2023-06-25',
      view: '2',
    },
  ];

  return (
    <Grid className='user-board-container'>
      <h1 className='user-board-title'>게시판</h1>
      <div className='Bcomentbox'>
        <div className='Bcomment-inner'>
          <div className='Bcoment'>
            ●자주 발생하는 질문에 대하여서는 FAQ에 등록된 질문 및 답변내용을
            참조하여 주십시오.
          </div>
          <div className='Bcoment'>●업무시간 : 9:00 ~ 18:00</div>
        </div>
        <div className='goBWriteBtnbox'>
          <Button
            className='goBwriteForm'
            onClick={() => Navigate('/writeBoardForm')}
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
            <div key={post.no} className='bRow'>
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
          marginTop: '100px',
        }}
      >
        <Paging />
      </div>
    </Grid>
  );
};

export default UserBoard;
