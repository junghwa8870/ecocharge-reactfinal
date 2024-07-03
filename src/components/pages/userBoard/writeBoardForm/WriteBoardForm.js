import React, { useState, useEffect, useContext } from 'react';
import './WriteBoardForm.scss';
import { Button, Form, FormGroup, FormText, Input, Label } from 'reactstrap';
import { Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, BOARD } from '../../../../config/host-config';
import axios from 'axios';
import handleRequest from '../../../../utils/handleRequest';
import axiosInstance from '../../../../config/axios-config';
import AuthContext from '../../../../utils/AuthContext';

const WriteBoardForm = () => {
  const navigate = useNavigate();
  const REQUEST_URL = API_BASE_URL + BOARD;
  const { onLogout } = useContext(AuthContext);

  const [board, setBoard] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [formData, setFormData] = useState({
    boardNo: '',
    bWriter: '',
    bTitle: '',
    bContent: '',
    bProfileImage: null,
  });

  useEffect(() => {
    const { bWriter, bTitle, bContent } = formData;
    setIsFormValid(bWriter && bTitle && bContent && isChecked);
  }, [formData, isChecked]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const fetchBoard = async () => {
    const data = new FormData();
    data.append('boardNo', formData.boardNo);
    data.append('bWriter', formData.bWriter);
    data.append('bTitle', formData.bTitle);
    data.append('bContent', formData.bContent);
    if (formData.bProfileImage) {
      data.append('bProfileImage', formData.bProfileImage);
    }

    const onSuccess = (data) => {
      setBoard(data);
      alert('등록되었습니다.');
    };

    handleRequest(
      () => axiosInstance.post(REQUEST_URL, data),
      onSuccess,
      onLogout,
      navigate,
    );

    // try {
    //   const res = await axios.post(REQUEST_URL, data);
    //   setBoard(res.data);
    //   navigate('/board');
    // } catch (error) {
    //   alert(error.response.data);
    // }
  };

  const boardHandler = (e) => {
    e.preventDefault();
    fetchBoard();
  };

  return (
    <Grid className='WboardFormContainer'>
      <Grid className='WboardTop'>
        <div className='WgoWriteBoardBtnBox'>
          <div className='WgoWriteBoardBtn' onClick={() => navigate('/board')}>
            <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
          </div>
        </div>

        <h2 className='wBTitle'>게시글 작성</h2>
      </Grid>
      <Form className='WboardFormBox' onSubmit={boardHandler}>
        <FormGroup>
          <Label for='writeBoardWriter'>작성자</Label>
          <Input
            id='writeBoardWriter'
            name='bWriter'
            placeholder='이름을 입력해주세요.'
            type='text'
            className='wbwBox'
            value={formData.bWriter}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='writeBoardTitle'>제목</Label>
          <Input
            id='writeBoardTitle'
            name='bTitle'
            placeholder='제목을 입력해주세요.'
            type='text'
            className='wbtBox'
            value={formData.bTitle}
            onChange={handleChange}
          />
        </FormGroup>

        <FormGroup>
          <Label for='writeBoardContent'>내용</Label>
          <Input
            id='writeBoardContent'
            name='bContent'
            type='textarea'
            className='wbcBox'
            value={formData.bContent}
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for='writeBoardFile'>첨부파일</Label>
          <Input
            id='writeBoardFile'
            name='bProfileImage'
            type='file'
            className='wbfBox'
            onChange={handleChange}
          />
          <Grid className='fileComment'>
            <FormText>
              여러분의 의견을 더욱 풍부하게 전달할 수 있도록 관련 파일을
              첨부해주시면 감사하겠습니다.
            </FormText>
          </Grid>
        </FormGroup>

        <FormGroup check className='checkOuterBox'>
          <Input
            type='checkbox'
            checked={isChecked}
            onChange={handleCheckboxChange}
          />{' '}
          <Label check>상업적 광고나 홍보 글은 금지되어 있습니다.</Label>
        </FormGroup>
        <Grid className='WBFSbtnBox'>
          <Button type='submit' className='WBFSbtn' disabled={!isFormValid}>
            작성 완료
          </Button>
        </Grid>
      </Form>
    </Grid>
  );
};

export default WriteBoardForm;
