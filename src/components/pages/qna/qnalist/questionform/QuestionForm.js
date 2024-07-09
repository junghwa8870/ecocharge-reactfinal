import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './QuestionForm.scss';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Grid } from '@mui/material';
import { API_BASE_URL, QNA } from '../../../../../config/host-config';
import axios from 'axios';
import axiosInstance from '../../../../../config/axios-config';

const QuestionForm = () => {
  const navigate = useNavigate();

  const REQUEST_URL = API_BASE_URL + QNA;

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value);
  };

  const fetchQna = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(REQUEST_URL, formData);
      console.log(res.data);
      navigate('/qna');
    } catch (error) {
      console.log(error);
    }
  };

  // const handleBack = () => {
  //   navigate('/qnalist');
  // };

  return (
    <div className='QquestionWriteContainer' style={{ padding: '2rem' }}>
      <div className='gomyquestionlistBtnBox'>
        <div
          className='gomyquestionlistBtn'
          onClick={() => navigate('/qnalist')}
        >
          <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
        </div>
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
        <Form onSubmit={fetchQna}>
          <FormGroup className='questionWriteForm'>
            <Label for='qcategory'>카테고리</Label>
            <Input
              className='qnaSelect'
              type='select'
              name='qCategory'
              id='qcategory'
              value={formData.qCategory}
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
              name='qTitle'
              id='qtitle'
              placeholder='제목을 입력하세요'
              value={formData.qTitle}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className='questionWriteForm'>
            <Label for='qcontent'>내용</Label>
            <Input
              type='textarea'
              name='qContent'
              id='qcontent'
              placeholder='내용을 입력하세요'
              className='qcontentbox'
              value={formData.qContent}
              onChange={handleChange}
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
