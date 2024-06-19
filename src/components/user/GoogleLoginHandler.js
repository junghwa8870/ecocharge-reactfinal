import React, { useContext, useEffect } from 'react';
import { API_BASE_URL, USER } from '../../config/host_config';
import AuthContext from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleLoginHandler = () => {
  console.log('사용자 동의화면에서 동의 후 Google 인증 서버에서 redirect 진행');

  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  const REQUEST_URL = API_BASE_URL + USER;

  const code = new URL(window.location.href).searchParams.get('code');

  useEffect(() => {
    const googleLogin = async () => {
      const res = await fetch(REQUEST_URL + '/googlelogin?code=' + code);

      const { token, userName, email, role } = await res.json();

      onLogin(token, userName, role);

      redirection('/');
    };
    googleLogin();
  }, []);

  return <div>GoogleLoginHandler</div>;
};

export default GoogleLoginHandler;
