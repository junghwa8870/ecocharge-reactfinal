import React, { useContext, useEffect } from 'react';
import AuthContext from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, USER } from '../../config/host_config';

const LogoutHandler = () => {
  const { onLogout } = useContext(AuthContext);
  const redirection = useNavigate();

  const REQUEST_URL = API_BASE_URL + USER;

  useEffect(() => {
    const logout = async () => {
      await fetch(REQUEST_URL + '/logout');
      onLogout();
    };
    logout();
    redirection('/');
  }, []);

  return <div></div>;
};

export default LogoutHandler;
