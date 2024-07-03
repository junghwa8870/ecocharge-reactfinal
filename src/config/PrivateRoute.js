import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const PrivateRoute = () => {
  const { isLoggedIn } = useContext(AuthContext);

  console.log(isLoggedIn);

  if (!isLoggedIn) {
    alert('로그인이 필요한 기능입니다.');
  }

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
