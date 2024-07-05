import React, { useContext, useEffect } from 'react';
import { API_BASE_URL, USER } from '../../config/host-config';
import AuthContext from '../../utils/AuthContext';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const KakaoLoginHandler = () => {
  console.log(
    '사용자가 동의화면을 통해 필수 정보 동의 후 Kakao 인증 서버에서 redirect를 진행함!',
  );

  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  const REQUEST_URL = API_BASE_URL + USER;

  // URL에 쿼리스트링으로 전달된 인가 코드를 얻어오는 방법.
  const code = new URL(window.location.href).searchParams.get('code');
  const phoneNumber = localStorage.getItem('phoneNumber');

  useEffect(() => {
    const kakaoLogin = async () => {
      const res = await axios.get(
        `${REQUEST_URL}/kakaologin?code=${code}&phoneNumber=${phoneNumber}`,
      );
      console.log(phoneNumber);
      console.log(await res.data);

      const { token, userName, role, userId } = await res.data; // 서버에서 온 json 읽기
      console.log('token: ', token);
      onLogin(token, userName, role, phoneNumber, userId);

      redirection('/');
    };

    kakaoLogin();
  }, []);

  return <div>KakaoLoginHandler</div>;
};

export default KakaoLoginHandler;
