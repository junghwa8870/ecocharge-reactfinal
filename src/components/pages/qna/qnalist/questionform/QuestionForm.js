import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionForm.scss';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Grid } from '@mui/material';
import { API_BASE_URL, QNA } from '../../../../../config/host-config';
import axios from 'axios';

const QuestionForm = () => {
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [category, setCategory] = useState(''); // New state for category
  const navigate = useNavigate();

  const [content, setContent] = useState('');

  const REQUEST_URL = API_BASE_URL + QNA;

  const [qna, setQna] = useState(false);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value);
  };

  const fetchQna = async () => {
    const data = formData;
    console.log(formData);
    const body = JSON.stringify(data);

    const headers = { 'Content-Type': 'application/json' };
    try {
      const res = await axios.post(REQUEST_URL, body, { headers });
      console.log(res);
      setQna(res.data);
      navigate('/qna');
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionFormData = {
      title,
      content,
      category, // Include category in form data
    };
    console.log(questionFormData);
    navigate('/myquestionlist');
  };

  // const handleBack = () => {
  //   navigate('/qnalist');
  // };

  return (
    <div className='QquestionWriteContainer' style={{ padding: '2rem' }}>
      <div className='gomyquestionlistBtn' onClick={() => navigate('/qnalist')}>
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
              value={formData.qcategory}
              onChange={handleChange}
            >
              <option value='' disabled>
                카테고리를 선택하세요
              </option>
              <option>자주 묻는 질문</option>
              <option>홈페이지</option>
              <option>전기차 충전소</option>
              <option>기타</option>
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
              value={formData.qtitle}
              onChange={handleChange}
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
              value={formData.qcontent}
              onChange={handleChange}
            />
          </FormGroup>
          <Grid className='QquestionWirteCompleteBtnBox'>
            <Button
              type='submit'
              color='primary'
              className='QquestionWirteCompleteBtn'
              onClick={fetchQna}
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
