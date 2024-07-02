import React, { useContext, useEffect } from 'react';
import { API_BASE_URL, USER } from '../../config/host-config';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../utils/AuthContext';
import axios from 'axios';

const NaverLoginHandler = () => {
  console.log('사용자 동의화면에서 동의 후 Naver 인증 서버에서 redirect 진행');

  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  const REQUEST_URL = API_BASE_URL + USER;

  const code = new URL(window.location.href).searchParams.get('code');
  const phoneNumber = localStorage.getItem('phoneNumber');

  useEffect(() => {
    const naverLogin = async () => {
      const res = await axios.get(
        `${REQUEST_URL}/naverlogin?code=${code}&phoneNumber=${phoneNumber}`,
      );

      const { token, userName, role } = await res.data; // 서버에서 온 json 읽기
      onLogin(token, userName, role, phoneNumber);

      redirection('/');
    };
    naverLogin();
  }, []);

  return <div>NaverLoginHandler</div>;
};

export default NaverLoginHandler;
