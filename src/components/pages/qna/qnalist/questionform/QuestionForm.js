import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionForm.scss';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Grid } from '@mui/material';

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [writer, setWriter] = useState('');
  const [category, setCategory] = useState(''); // New state for category
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionFormData = {
      title,
      content,
      category, // Include category in form data
    };
    console.log(questionFormData);
    navigate('/qnalist');
  };

  // const handleBack = () => {
  //   navigate('/qnalist');
  // };

  return (
    <div className='QquestionWriteContainer' style={{ padding: '2rem' }}>
      <div
        className='gomyquestionlistBtn'
        onClick={() => navigate('/myquestionlist')}
      >
        <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
      </div>

      <h2 className='questionWriteTitle'>1:1 문의</h2>
      {/* <Button
        className='questionListBackBtn'
        color='secondary'
        onClick={handleBack}
        style={{ marginBottom: '1rem' }}
      >
        되돌아가기
      </Button> */}
      <div className='QquestionFormBox'>
        <Form onSubmit={handleSubmit}>
          <FormGroup className='questionWriteForm'>
            <Label for='qcategory'>카테고리</Label>
            <Input
              className='qnaSelect'
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
          <FormGroup className='questionWriteForm'>
            <Label for='qtitle'>제목</Label>
            <Input
              className='qTitleBox'
              type='text'
              name='qtitle'
              id='qtitle'
              placeholder='제목을 입력하세요'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormGroup className='questionWriteForm'>
            <Label for='qcontent'>내용</Label>
            <Input
              type='textarea'
              name='qcontent'
              id='qcontent'
              placeholder='내용을 입력하세요'
              className='qcontentbox'
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
          <Grid className='QquestionWirteCompleteBtnBox'>
            <Button
              type='submit'
              color='primary'
              className='QquestionWirteCompleteBtn'
            >
              작성 완료
            </Button>
          </Grid>
        </Form>
      </div>
    </div>
  );
};

export default QuestionForm;
