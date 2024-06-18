import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './NewInfoWrite.scss';

const NewInfoWrite = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const infoFormData = {
      title,
      content,
      writer,
      writeDate: new Date().toISOString().split('T')[0], // 현재 날짜를 yyyy-mm-dd 형식으로 저장
    };
    console.log(infoFormData);
    navigate('/newInfo');
  };

  const handleBack = () => {
    navigate('/newInfo');
  };

  return (
    <div className='newInfoWriteContainer' style={{ padding: '2rem' }}>
      <h2 className='wWriteTitle'>새 글 작성</h2>
      <Button
        className='newInfoBackBtn'
        color='secondary'
        onClick={handleBack}
        style={{ marginBottom: '1rem' }}
      >
        되돌아가기
      </Button>
      <div className='infoFormBox'>
        <Form onSubmit={handleSubmit}>
          <FormGroup className='infoWriteForm'>
            <Label for='wtitle'>제목</Label>
            <Input
              className='wTitleBox'
              type='text'
              name='wtitle'
              id='wtitle'
              placeholder='제목을 입력하세요'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup className='infoWriteForm'>
            <Label for='wcontent'>내용</Label>
            <Input
              type='textarea'
              name='wcontent'
              id='wcontent'
              placeholder='내용을 입력하세요'
              className='wcontentbox'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
          <FormGroup className='infoWriteForm'>
            <Label for='writer'>작성자</Label>
            <Input
              className='wWriterBox'
              type='text'
              name='writer'
              id='writer'
              placeholder='작성자 이름을 입력하세요'
              value={writer}
              onChange={(e) => setWriter(e.target.value)}
            />
          </FormGroup>
          <Button type='submit' color='primary' className='wirteCompleteBtn'>
            작성 완료
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default NewInfoWrite;
