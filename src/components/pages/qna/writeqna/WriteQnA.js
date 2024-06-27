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

  const [formData, setFormData] = useState({
    qnaNo: '',
    qTitle: '',
    qContent: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log(value);
  };

  const fetchQna = async () => {
    const data = new FormData();
    data.append('qnaNo', formData.qnaNo);
    data.append('qTitle', formData.qTitle);
    data.append('qContent', formData.qContent);

    console.log(data);

    try {
      const res = await axios.post(REQUEST_URL, data);
      setQna(res.data);
      navigate('/qna');
    } catch (error) {
      console.log(error);
    }
  };

  const qnaHandler = (e) => {
    e.preventDefault();
    fetchQna();
    alert('등록 되었습니다.');
  };

  return (
    <div className='qnaWriteContainer' style={{ padding: '2rem' }}>
      <div className='goQnatBtn' onClick={() => navigate('/qna')}>
        <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
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
              <option onChange={formData.qTitle}>자주 묻는 질문</option>
              <option onChange={formData.qTitle}>홈페이지</option>
              <option onChange={formData.qTitle}>전기차 충전소</option>
              <option onChange={formData.qTitle}>기타</option>
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
