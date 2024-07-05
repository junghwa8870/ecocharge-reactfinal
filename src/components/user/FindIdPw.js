import { FormGroup, Form, Input, Label, Button } from 'reactstrap';
import React, { useRef, useState } from 'react';
import '../../scss/FindIdPw.scss';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, USER } from '../../config/host-config';
import axios from 'axios';

const FindIdPw = () => {
  const navigate = useNavigate();
  const [showId, setShowId] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [password, setPassword] = useState(''); // 비밀번호 입력 상태 변수
  const [confirmPassword, setConfirmPassword] = useState(''); // 비밀번호 확인 입력 상태 변수
  const [isPasswordValid, setIsPasswordValid] = useState(true); // 비밀번호 유효성 상태 변수
  const [passwordsMatch, setPasswordsMatch] = useState(true); // 비밀번호 일치 여부 상태 변수
  const [isConfirmPasswordDirty, setIsConfirmPasswordDirty] = useState(false); // 비밀번호 확인 입력 필드가 수정되었는지 여부
  const [phoneNum, setPhoneNum] = useState(''); // 휴대전화번호 상태 변수
  const [chkNum, setChkNum] = useState(''); // 인증번호 상태 변수
  const [showedId, setShowedId] = useState('');
  const inputRef = useRef(null);

  const handleChkButtonClick = (e) => {
    if (!phoneNum) {
      alert('핸드폰번호를 입력해주세요');
      return;
    } else if (!phoneNum.startsWith('010')) {
      alert("'-'을 제외한 번호를 입력해 주세요.");
      return;
    } else if (phoneNum.length !== 11) {
      alert('유효하지 않은 번호입니다.');
      return;
    }
    e.preventDefault();
    try {
      fetch(`${API_BASE_URL}/api/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber: `${phoneNum}` }),
      });

      alert('인증 코드를 발송하였습니다.');
    } catch (error) {
      console.log('phoneNumber:', phoneNum);
      alert('인증 코드 발송에 실패했습니다.');
    }
  };

  const handleChkButtonClick2 = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: `${phoneNum}`,
          verificationCodeInput: `${chkNum}`,
        }),
      });
      const result = await response.json();
      console.log('result:', result);

      if (result) {
        alert('인증되었습니다. 비밀번호 재설정을 진행해주세요.');
        const response = await axios.post(
          `${API_BASE_URL}${USER}/showid`,
          phoneNum,
          {
            headers: {
              'Content-Type': 'text/plain',
            },
          },
        );
        const id = response.data;
        console.log('idChecked:', id);
        setShowedId(id);
        setShowId(true);
        setShowPw(true);
        setShowComplete(true);

        // const { redirectUrl } = location.state;
        // window.location.href = redirectUrl;
      } else {
        alert('인증에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('인증에 실패했습니다.');
    }
  };

  // 휴대전화번호 입력 상태 업데이트
  const handlePhoneNumChange = async (e) => {
    setPhoneNum(e.target.value.trim());
  };

  // 인증번호 입력 상태 업데이트
  const handleChkNumChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 입력되도록 필터링
    if (input.length <= 4) {
      setChkNum(input);
    }
  };

  // 비밀번호 유효성 체크 함수
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-_])(?=.*[0-9]).{8,16}$/;
    setIsPasswordValid(regex.test(password));
  };

  // 비밀번호 일치 여부 체크 함수
  const checkPasswordsMatch = (password, confirmPassword) => {
    setPasswordsMatch(password === confirmPassword);
  };

  // 비밀번호 입력 상태 업데이트
  const handlePasswordChange = (e) => {
    const input = e.target.value;
    setPassword(input);
    validatePassword(input);
    checkPasswordsMatch(input, confirmPassword);
  };

  // 비밀번호 확인 입력 상태 업데이트
  const handleConfirmPasswordChange = (e) => {
    const input = e.target.value;
    setConfirmPassword(input);
    setIsConfirmPasswordDirty(true);
    checkPasswordsMatch(password, input);
  };

  const changePassword = async () => {
    console.log('passwordchecked:', password);
    if (isConfirmPasswordDirty && !passwordsMatch) {
      console.log('비밀번호 틀림');
      alert('비밀번호를 확인해주세요');
      return;
    } else if (password.length < 5) {
      console.log('비밀번호 미 입력');
      alert('비밀번호를 확인해주세요');
      return;
    }
    try {
      const response = await axios.post(
        `${API_BASE_URL}${USER}/pwsearch`,
        { phoneNumber: phoneNum, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      console.log('응답:', response);
      console.log('받아온 값:', response.data); // response.data로 응답 데이터에 접근

      if (response.data) {
        alert('비밀번호가 변경되었습니다.');
        navigate('/login');
      } else {
        alert('비밀번호를 다시 확인해주세요');
      }
    } catch (error) {
      alert('잘못된 요청입니다');
    }
  };

  return (
    <Grid className='findIdPwContainer'>
      <Grid className='findIdPwTitleBox'>
        <h1 className='findIdPwTitle'>계정 찾기</h1>
      </Grid>
      <Form className='findIdPwFormContainer'>
        <FormGroup className='chkForm'>
          <Label for='plzPhoneNum'>휴대전화번호</Label>
          <Grid className='inlineBox'>
            <Input
              className='plzPhoneNum'
              id='plzPhoneNum'
              name='phone'
              placeholder='휴대전화번호 11자리를 입력'
              type='text'
              maxLength='11'
              value={phoneNum}
              onChange={handlePhoneNumChange}
            />
            <Grid className='chkButtonBox1'>
              <Button className='chkButton1' onClick={handleChkButtonClick}>
                인증
              </Button>
            </Grid>
          </Grid>
        </FormGroup>

        <FormGroup className='chkForm'>
          <Label for='chkPhoneNum'>인증번호</Label>
          <Grid className='inlineBox'>
            <Input
              className='chkPhoneNum'
              id='chkPhoneNum'
              name='chkNum'
              placeholder='인증번호 4자리를 입력'
              type='text'
              maxLength='4'
              value={chkNum}
              onChange={handleChkNumChange}
            />
            <Grid className='chkButtonBox2'>
              <Button className='chkButton2' onClick={handleChkButtonClick2}>
                인증
              </Button>
            </Grid>
          </Grid>
        </FormGroup>

        {showId && (
          <FormGroup className='show'>
            <Grid className='showId'>회원님의 아이디는 {showedId}입니다.</Grid>
            <Grid className='showComment'>비밀번호 재설정을 진행해주세요.</Grid>
          </FormGroup>
        )}

        {showPw && (
          <Grid className='pwShow'>
            <FormGroup className='chkForm'>
              <Label for='setPassword'>새 비밀번호</Label>
              <Input
                id='setPassword'
                name='password'
                placeholder='특수문자 포함 8자에서 16자 사이로 입력해주세요.'
                type='password'
                value={password}
                onChange={handlePasswordChange}
              />
              {!isPasswordValid && (
                <span style={{ color: 'red', margin: '10px' }}>
                  조건을 만족하지 않습니다.
                </span>
              )}
            </FormGroup>
            <FormGroup className='chkForm'>
              <Label for='chkSetPassword'>비밀번호 확인</Label>
              <Input
                id='chkSetPassword'
                name='password'
                placeholder='비밀번호를 다시 입력해주세요.'
                type='password'
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {isConfirmPasswordDirty && !passwordsMatch && (
                <span style={{ color: 'red', margin: '10px' }}>
                  비밀번호가 일치하지 않습니다.
                </span>
              )}
            </FormGroup>
          </Grid>
        )}

        <Grid className='FindIdPwCompleteBox'>
          {showComplete && (
            <Button className='FindIdPwComplete' onClick={changePassword}>
              변경완료
            </Button>
          )}
        </Grid>
      </Form>
    </Grid>
  );
};

export default FindIdPw;
