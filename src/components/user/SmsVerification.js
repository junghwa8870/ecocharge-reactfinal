import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../../config/host_config';
import '../../scss/SmsVerification.scss';
import '../../scss/Header.scss';

const SmsVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationCodeInput, setverificationCodeInput] = useState('');
  const [isReadOnly, setIsReadOnly] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'phoneNumber') {
      setPhoneNumber(value);
    } else if (name === 'verificationCode') {
      setVerificationCode(value);
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      alert('인증 코드가 발송되었습니다.');
    } catch (error) {
      console.log('phonenumber: ', phoneNumber);
      alert('인증 코드 발송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_BASE_URL}/api/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber, verificationCodeInput }),
      });
      const result = await res.json();
      if (result) {
        alert('인증이 완료되었습니다.');
      } else {
        alert('인증에 실패했습니다.');
      }
    } catch (error) {
      alert('인증에 실패했습니다.');
    }
  };

  return (
    <div className='containner'>
      <image />
      <h2>
        서비스 이용을 위해 소셜 로그인 전에 휴대전화 인증이 필요합니다.
        <br />
        <p
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          인증번호를 입력해주세요.
        </p>
      </h2>
      <div>
        <label
          className='inputlabel'
          style={{
            fontFamily: 'Jua',
            marginTop: '5%',
          }}
        >
          핸드폰번호:
          <input
            type='text'
            name='phoneNumber'
            value={phoneNumber}
            onChange={handleChange}
            style={{
              marginLeft: '10px',
            }}
          />
        </label>
        <button
          className='codeBtn'
          style={{
            marginLeft: '5px',
            borderRadius: '5px',
            width: '120px',
            height: '30px',
            fontSize: '15px',
            cursor: 'pointer',
          }}
          onClick={handleSendCode}
        >
          인증 코드 발송
        </button>
      </div>

      <div>
        <label
          className='inputlabel'
          style={{
            fontFamily: 'Jua',
            position: 'absolute',
            top: '50%',
            left: '30%',
          }}
        >
          인증 코드:
          <input
            type='text'
            name='verificationCodeInput'
            value={verificationCode}
            onChange={handleChange}
            style={{
              position: 'relative',
              bottom: '2px',
              marginLeft: '10px',
            }}
            // readOnly={isReadOnly}
          />
        </label>
      </div>
      <div
        style={{
          display: 'flex',
          right: '300px',
          width: '20%',
          height: '50px',
          alignItems: 'center',
          flexDirection: 'column',
          marginTop: '200px',
        }}
      >
        <button
          className='submit'
          name=''
          style={{
            fontFamily: 'Jua',
            cursor: 'pointer',
            marginLeft: '-12px',
          }}
          onClick={handleVerifyCode}
        >
          인증 확인
        </button>
      </div>
    </div>
  );
};

export default SmsVerification;
