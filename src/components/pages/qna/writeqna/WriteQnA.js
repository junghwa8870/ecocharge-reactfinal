import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WriteQnA.scss';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';

const WriteQnA = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [category, setCategory] = useState(''); // New state for category
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const qnaFormData = {
      title,
      content,
      writer,
      category, // Include category in form data
      writeDate: new Date().toISOString().split('T')[0], // 현재 날짜를 yyyy-mm-dd 형식으로 저장
    };
    console.log(qnaFormData);
    navigate('/qna');
  };

  const handleBack = () => {
    navigate('/qna');
  };

  return (
    <div className='qnaWriteContainer' style={{ padding: '2rem' }}>
      <h2 className='qWriteTitle'>새 글 작성</h2>
      <Button
        className='qnaBackBtn'
        color='secondary'
        onClick={handleBack}
        style={{ marginBottom: '1rem' }}
      >
        되돌아가기
      </Button>
      <div className='qnaFormBox'>
        <Form onSubmit={handleSubmit}>
          <FormGroup className='qWriteForm'>
            <Label for='qcategory'>카테고리</Label>
            <Input
              type='select'
              name='qcategory'
              id='qcategory'
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value='' disabled>
                카테고리를 선택하세요
              </option>
              <option value='manyquestion'>자주 묻는 질문</option>
              <option value='category1'>홈페이지</option>
              <option value='category2'>전기차 충전소</option>
              <option value='category3'>기타</option>
            </Input>
          </FormGroup>
          <FormGroup className='qWriteForm'>
            <Label for='qtitle'>질문</Label>
            <Input
              className='qTitleBox'
              type='text'
              name='qtitle'
              id='qtitle'
              placeholder='질문을 입력하세요'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup className='qWriteForm'>
            <Label for='qcontent'>답변</Label>
            <Input
              type='textarea'
              name='qcontent'
              id='qcontent'
              placeholder='답변을 입력하세요'
              className='qcontentbox'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
          <Button type='submit' color='primary' className='qwirteCompleteBtn'>
            작성 완료
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default WriteQnA;
