import React, { useState } from 'react';
import { API_BASE_URL } from '../../config/host_config';
import '../../scss/SmsVerification.scss';
import '../../scss/Header.scss';

const SmsVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [showInput, setShowInput] = useState(false);

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
      const response = await fetch(`${API_BASE_URL}/api/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      const result = await response.json();
      setMessage(result.message); // assuming your response has a message field
      setShowInput(true);
    } catch (error) {
      console.log('phoneNumber:', phoneNumber);
      setMessage('인증 코드 발송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          verificationCode,
        }),
      });
      const result = await response.json();
      if (result) {
        setMessage('인증에 성공했습니다.');
      } else {
        setMessage('인증에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setMessage('인증에 실패했습니다.');
    }
  };
  return (
    <>
      <div className='containner'>
        <image />
        <h2>
          서비스 이용을 위해 소셜 로그인 전에 휴대전화 인증이 필요합니다.
          <br />
        </h2>
        <div>
          <form onSubmit={handleSendCode}>
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
              type='submut'
            >
              인증 코드 발송
            </button>
          </form>
        </div>

        <div>
          {showInput && (
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
                name='verificationCode'
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
          )}
        </div>
        <p>{message}</p>
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
          <form onSubmit={handleVerifyCode}>
            <button
              className='submit'
              name=''
              style={{
                fontFamily: 'Jua',
                cursor: 'pointer',
                marginLeft: '-12px',
              }}
              type='submit'
            >
              인증 확인
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default SmsVerification;
