import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/host-config';
import '../../scss/SmsVerification.scss';
import { useLocation } from 'react-router-dom';

const SmsVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCodeInput, setVerificationCode] = useState('');
  const [showInput, setShowInput] = useState(false);
  const location = useLocation();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (name === 'verificationCodeInput') {
      setVerificationCode(value);
    }
  };

  const handleSendCode = async (e) => {
    if (!phoneNumber) {
      alert('핸드폰번호를 입력해주세요');
      return;
    } else if (!phoneNumber.startsWith('010')) {
      alert("'-'을 제외한 번호를 입력해 주세요.");
      return;
    } else if (phoneNumber.length !== 11) {
      alert('유효하지 않은 번호입니다.');
      return;
    }
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      alert('인증 코드를 발송하였습니다.');
      setShowInput(true);
    } catch (error) {
      console.log('phoneNumber:', phoneNumber);
      alert('인증 코드 발송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/Sverify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          verificationCodeInput,
        }),
      });
      console.log(`json 파일확인:${phoneNumber},${verificationCodeInput}`);
      const result = await response.json();
      if (result) {
        alert('인증에 성공했습니다.');
        localStorage.setItem('phoneNumber', phoneNumber);

        const { redirectUrl } = location.state;
        window.location.href = redirectUrl;
      } else {
        alert('서버 오류');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('인증에 실패했습니다.');
    }
  };

  return (
    <div className='container'>
      <h2>휴대전화 인증</h2>
      <p>서비스 이용을 위해 소셜 로그인 전에 휴대전화 인증이 필요합니다.</p>
      <form onSubmit={handleSendCode} className='form'>
        <label className='inputLabel'>
          핸드폰 번호:
          <input
            type='text'
            name='phoneNumber'
            value={phoneNumber}
            onChange={handleChange}
          />
        </label>
        <button className='sendCodeBtn' type='submit'>
          인증 코드 발송
        </button>
      </form>
      {showInput && (
        <form onSubmit={handleVerifyCode} className='form'>
          <label className='inputLabel'>
            인증 코드:
            <input
              type='text'
              name='verificationCodeInput'
              value={verificationCodeInput}
              onChange={handleChange}
            />
          </label>
          <button className='verifyCodeBtn' type='submit'>
            인증 확인
          </button>
        </form>
      )}
    </div>
  );
};

export default SmsVerification;
