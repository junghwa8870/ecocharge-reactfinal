import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './WriteQnA.scss';
import { Button, Form, FormGroup, Input, Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { API_BASE_URL, QNA } from '../../../../config/host-config';

const WriteQnA = () => {
  const [content, setContent] = useState('');

  const navigate = useNavigate();

  const REQUEST_URL = API_BASE_URL + QNA;

  const [qna, setQna] = useState(false);

  const [formData, setFormData] = useState({});

  const handleChange = (e) => {};

  const fetchQna = async () => {};

  const qnaHandler = (e) => {};

  return (
    <div className='qnaWriteContainer' style={{ padding: '2rem' }}>
      <div className='goQnatBtnBox'>
        <div className='goQnatBtn' onClick={() => navigate('/qna')}>
          <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
        </div>
      </div>
      <h2 className='qWriteTitle'>새 글 작성</h2>
      {/* <Button
        className='qnaBackBtn'
        color='secondary'
        onClick={handleBack}
        style={{ marginBottom: '1rem' }}
      >
        되돌아가기
      </Button> */}
      <div className='qnaFormBox'>
        <Form onSubmit={qnaHandler}>
          <FormGroup className='qWriteForm'>
            <Label for='qcategory'>카테고리</Label>
            <Input
              className='qnaSelect'
              type='select'
              name='qTitle'
              id='qcategory'
              value={formData.qTitle}
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
          <FormGroup className='qWriteForm'>
            <Label for='qtitle'>질문</Label>
            <Input
              className='qTitleBox'
              type='text'
              name='qContent'
              id='qtitle'
              placeholder='질문을 입력하세요'
              value={formData.qContent}
              onChange={handleChange}
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
