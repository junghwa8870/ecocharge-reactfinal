import React, { useContext, useEffect } from 'react';
import { API_BASE_URL, USER } from '../../config/host-config';
import AuthContext from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const GoogleLoginHandler = () => {
  console.log('사용자 동의화면에서 동의 후 Google 인증 서버에서 redirect 진행');

  const { onLogin } = useContext(AuthContext);
  const redirection = useNavigate();

  const REQUEST_URL = API_BASE_URL + USER;

  const code = new URL(window.location.href).searchParams.get('code');
  const phoneNumber = localStorage.getItem('phoneNumber');

  useEffect(() => {
    const googleLogin = async () => {
      try {
        const res = await fetch(
          REQUEST_URL +
            '/googlelogin?code=' +
            code +
            '&phoneNumber=' +
            phoneNumber,
        );
        if (!res.ok) {
          throw new Error('Google login failed');
        }

        const { token, userName, role } = await res.json();
        onLogin(token, userName, role);
        redirection('/');
      } catch (error) {
        console.error('Error during Google login:', error);
        // Handle error here
      }
    };

    if (code && phoneNumber) {
      googleLogin();
    } else {
      console.error('Missing code or phoneNumber');
      // Handle missing parameters error here
    }
  }, []);

  return <div>GoogleLoginHandler</div>;
};

export default GoogleLoginHandler;
