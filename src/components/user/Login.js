import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // react-router-dom에서 useNavigate 가져오기
import { NAVER_AUTH_URL } from '../../config/naver-config';
import { GOOGLE_AUTH_URL } from '../../config/google-config';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import '../../scss/Login.scss';

const Login = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [showModal, setShowModal] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);

  const handleSocialLogin = (authUrl) => {
    navigate('/sms', { state: { redirectUrl: authUrl } }); // 페이지 이동 처리
  };

  const handleRegularLogin = (e) => {
    e.preventDefault();
    // 일반 로그인 로직
  };

  const handleSignup = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // 회원가입 폼 제출 로직 추가
  };

  const handleSendVerification = () => {
    setShowVerificationInput(true);
    // 인증번호 전송 로직 추가 (예: API 호출)
  };

  const handleVerifyCode = () => {
    // 인증번호 확인 로직 추가 (예: API 호출)
  };

  return (
    <div className='login-container'>
      <h2>LOGIN</h2>

      <div className='regular-login-section'>
        <form onSubmit={handleRegularLogin}>
          <label>
            <input type='text' placeholder='Id' />
          </label>
          <label>
            <input type='password' placeholder='Password' />
          </label>
          <button type='submit'>SIGN IN</button>
        </form>
      </div>

      <div className='signup-section'>
        <p>Forgot your password?</p>
        <button className='signup-button' onClick={handleSignup}>
          SIGN UP
        </button>
      </div>

      <div className='social-login-images'>
        <button
          className='social-login-button'
          onClick={() => handleSocialLogin(KAKAO_AUTH_URL)}
        >
          <img src={'kakaoLogo.png'} className='social-icon' alt='kakao' />
        </button>
        <button
          className='social-login-button'
          onClick={() => handleSocialLogin(NAVER_AUTH_URL)}
        >
          <img src={'naverLogo.png'} className='social-icon' alt='naver' />
        </button>
        <button
          className='social-login-button google-login-button'
          onClick={() => handleSocialLogin(GOOGLE_AUTH_URL)}
        >
          <img
            src={'googleLogo.png'}
            className='social-icon google-icon'
            alt='google'
          />
          구글 로그인
        </button>
      </div>

      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={handleCloseModal}>
              &times;
            </span>
            <h2>SIGN UP</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                <input type='text' placeholder='Name' />
              </label>
              <label>
                <input type='text' placeholder='User Id' />
              </label>
              <label>
                <input type='password' placeholder='Password' />
              </label>
              <label>
                <input type='password' placeholder='Password Check' />
              </label>
              <label className='phone-verification'>
                <input type='phone' placeholder='PhoneNum' />
                <button type='button' onClick={handleSendVerification}>
                  인증번호 전송
                </button>
              </label>
              {showVerificationInput && (
                <label className='verification-code'>
                  <input type='text' placeholder='4자리' />
                  <button type='button' onClick={handleVerifyCode}>
                    인증번호 확인
                  </button>
                </label>
              )}
              <button type='submit'>SIGN UP</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
