import React, { useContext, useEffect, useState } from 'react';
import { AppBar, Grid, Toolbar, Link as MuiLink, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/Header.scss';
import AuthContext from '../../utils/AuthContext';
import { API_BASE_URL, USER } from '../../config/host-config';
import handleRequest from '../../utils/handleRequest';
import axiosInstance from '../../config/axios-config';

const Header = () => {
  const navigate = useNavigate();

  const { isLoggedIn, onLogout } = useContext(AuthContext);

  const handleLogin = () => {
    navigate('/login');
  };

  // 로그아웃 핸들러
  const logoutHandler = async () => {
    const onSuccess = () => {
      onLogout();
      navigate('/login');
    };

    handleRequest(
      () => axiosInstance.get(`${API_BASE_URL}${USER}/logout`),
      onSuccess,
      onLogout,
      navigate,
    );
  };

  const naviagteHandler = async () => {
    const onSuccess = () => {
      navigate('/myPage');
    };

    handleRequest(
      () => axiosInstance.get(`${API_BASE_URL}${USER}/validate`),
      onSuccess,
      onLogout,
      navigate,
    );
  };

  return (
    <AppBar
      position='fixed'
      style={{
        width: '100%',
        height: 120,
        backgroundColor: '#fff',
      }}
    >
      <Toolbar>
        <Grid
          container
          justifyContent='space-between'
          // style={{ backgroundColor: 'white' }}
        >
          <Grid
            item
            flex={2}
            style={{ alignContent: 'center', display: 'flex' }}
          >
            <Link
              to='/'
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
              }}
            >
              <img
                src='MainLogo.png'
                alt='Logo'
                style={{
                  width: 200,
                  paddingTop: 10,
                  marginLeft: 50,
                  paddingBottom: 10,
                }}
              />
              {/* <div
                className='logo-title'
                style={{
                  color: 'rgb(13, 110, 253)',
                  fontWeight: 700,
                  marginLeft: 20,
                  fontSize: 25,
                  marginTop: 20,
                  textAlign: 'center',
                  fontFamily: 'Jua',
                }}
              >
                E C O
                <br />
                CHARGE
              </div> */}
            </Link>
          </Grid>
          <Grid
            item
            flex={6}
            style={{
              alignContent: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 20,
            }}
          >
            {[
              { to: '/carList', text: '보조금 지원 차종' },
              { to: '/findCharge', text: '충전소 찾기' },
              { to: '/board', text: '게시판' },
              { text: '마이페이지', onClick: naviagteHandler },
              { to: '/qna', text: 'Q & A' },
            ].map((link, index) => (
              <MuiLink
                key={index}
                className='header-link'
                component={Link}
                to={link.to}
                underline='none'
                color='black'
                marginRight='60'
                fontSize='20px'
                fontWeight='700'
                textAlign='center'
                paddingRight='80px'
                onClick={link.onClick}
              >
                {link.text}
              </MuiLink>
            ))}
          </Grid>

          <Grid
            item
            flex={2}
            style={{
              alignContent: 'center',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {isLoggedIn ? (
              <Button
                className='loginBtn'
                onClick={logoutHandler}
                variant='outlined'
                style={{
                  width: '130px',
                  height: '40px',
                  color: 'black',
                  borderColor: 'black',
                  fontFamily: 'Jua',
                  fontSize: '15px',
                  borderWidth: '3px',
                  fontWeight: '600',
                  marginTop: '30px',
                }}
              >
                Logout
              </Button>
            ) : (
              <Button
                className='loginBtn'
                onClick={handleLogin}
                variant='outlined'
                style={{
                  width: '130px',
                  height: '40px',
                  color: 'black',
                  borderColor: 'black',
                  fontFamily: 'Jua',
                  fontSize: '15px',
                  borderWidth: '3px',
                  fontWeight: '600',
                  marginTop: '30px',
                }}
              >
                Login
              </Button>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
