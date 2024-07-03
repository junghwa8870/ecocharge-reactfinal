import { FormGroup, Form, Input, Label, Button } from 'reactstrap';
import React, { useState } from 'react';
import '../../scss/FindIdPw.scss';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태 변수
  const [phoneNum, setPhoneNum] = useState(''); // 휴대전화번호 상태 변수
  const [chkNum, setChkNum] = useState(''); // 인증번호 상태 변수

  const handleChkButtonClick = () => {
    alert('인증번호가 전송되었습니다. 인증번호를 입력해주세요.');
  };

  const handleChkButtonClick2 = () => {
    setShowId(true);
    setShowPw(true);
    setShowComplete(true);
  };

  const handleChkButtonClick3 = () => {
    alert('아이디가 확인되었습니다. 비밀번호 재설정을 진행해주세요.');
    setShowPw(true);
  };

  // 휴대전화번호 입력 상태 업데이트
  const handlePhoneNumChange = (e) => {
    const input = e.target.value.replace(/[^0-9]/g, ''); // 숫자만 입력되도록 필터링
    if (input.length <= 11) {
      setPhoneNum(input);
    }
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

  // 체크박스 상태 업데이트
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
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
              <Button
                className='chkButton1'
                onClick={handleChkButtonClick}
                disabled={phoneNum.length !== 11}
              >
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
              <Button
                className='chkButton2'
                onClick={handleChkButtonClick2}
                disabled={chkNum.length !== 4}
              >
                인증
              </Button>
            </Grid>
          </Grid>
        </FormGroup>

        {showId && (
          <FormGroup className='show'>
            <Grid className='showId'>회원님의 아이디는 `abc1234`입니다.</Grid>
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

        {showComplete && (
          <FormGroup check>
            <Input
              id='exampleCheck'
              name='check'
              type='checkbox'
              onChange={handleCheckboxChange}
            />
            <Label check for='exampleCheck'>
              변경하시겠습니까?
            </Label>
          </FormGroup>
        )}

        <Grid className='FindIdPwCompleteBox'>
          {showComplete && (
            <Button
              className='FindIdPwComplete'
              onClick={() => navigate('/login')}
              disabled={(!isChecked === !isPasswordValid) === !passwordsMatch}
            >
              변경완료
            </Button>
          )}
        </Grid>
      </Form>
    </Grid>
  );
};

export default FindIdPw;
