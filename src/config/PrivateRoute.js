import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AuthContext from '../utils/AuthContext';

// 로그인 유저만 접근 가능
// 비로그인 유저 접근 불가
const PrivateRoute = () => {
  const { isLoggedIn, phoneNumber, userName, role } = useContext(AuthContext);

  console.log(isLoggedIn);
  console.log(phoneNumber);
  console.log(userName);
  console.log(role);

  if (!isLoggedIn) {
    alert('로그인이 필요한 서비스입니다.');
  } else if (role !== 'ADMIN') {
    alert('접근권한이 없습니다.');
  }
  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
