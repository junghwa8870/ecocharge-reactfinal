import React, { useContext, useEffect } from 'react';
import { API_BASE_URL, USER } from '../../config/host_config';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../../utils/AuthContext';

const NaverLoginHandler = () => {
  console.log('사용자 동의화면에서 동의 후 Naver 인증 서버에서 redirect 진행');

  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  const REQUEST_URL = API_BASE_URL + USER;

  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const naverLogin = async () => {
      const res = await fetch(REQUEST_URL + '/naverlogin?code=' + code);

      const { token, userName, email, role } = await res.json(); // 서버에서 온 json 읽기

      // Context API를 사용하여 로그인 상태를 업데이트 합니다.
      onLogin(token, userName, role);

      redirection('/');
    };
    naverLogin();
  }, []);

  return <div>NaverLoginHandler</div>;
};

export default NaverLoginHandler;
