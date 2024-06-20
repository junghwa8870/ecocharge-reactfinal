import React, { useState } from 'react';
import { AppBar, Grid, Toolbar, Link as MuiLink, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../scss/Header.scss';
import { Translate } from '@mui/icons-material';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import { NAVER_AUTH_URL } from '../../config/naver-config';
import { GOOGLE_AUTH_URL } from '../../config/google-config';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showButtons, setShowButtons] = useState(false);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
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
          style={{ backgroundColor: 'white' }}
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
                src='ecologo.png'
                alt='Logo'
                style={{ width: 100, paddingTop: 10, marginLeft: 50 }}
              />
              <div
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
              </div>
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
              { to: '/newInfo', text: '새소식' },
              { to: '/myPage', text: '마이페이지' },
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
                paddingRight='65px'
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
            <Button
              className='loginBtn'
              onClick={toggleButtons}
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
            {showButtons && (
              <div
                className={`additional-buttons-container`}
                style={{
                  position: 'absolute',
                  top: '80%',
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  width: '170px', // 가로 넓이 설정
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  zIndex: 1,
                  marginTop: '10px',
                }}
              >
                <Button
                  className='kakaoLoginBtn'
                  style={{
                    color: 'gray',
                    backgroundColor: 'white',
                    fontWeight: '600',
                    width: '120px',
                    height: '33px',
                    marginTop: '5px',
                    marginLeft: '20px',
                    marginRight: '10px',
                    fontSize: '12px',
                    lineHeight: 'unset',
                  }}
                >
                  <img
                    src={'kakaoLogo.png'}
                    className='kakao'
                    alt='kakao'
                    style={{
                      width: '120px',
                      marginLeft: '5px',
                    }}
                  />
                  {/* 카카오 로그인 */}
                </Button>
                <Button
                  className='naverLoginBtn'
                  onClick={() => (window.location.href = NAVER_AUTH_URL)}
                  style={{
                    color: 'gray',
                    backgroundColor: 'white',
                    fontWeight: '600',
                    width: '120px',
                    height: '33px',
                    marginTop: '5px',
                    marginLeft: '20px',
                    marginRight: '10px',
                    fontSize: '12px',
                    lineHeight: 'unset',
                  }}
                >
                  <img
                    className='naver'
                    src={'naverLogo.png'}
                    alt='naver'
                    style={{
                      width: '120px',
                      marginLeft: '5px',
                    }}
                  />
                  {/* 네이버 로그인 */}
                </Button>
                <Button
                  className='googleLoginBtn'
                  onClick={() => (window.location.href = GOOGLE_AUTH_URL)}
                  variant='contained'
                  style={{
                    marginBottom: '10px',
                    color: 'gray',
                    backgroundColor: 'white',
                    fontWeight: '600',
                    width: '120px',
                    height: '33px',
                    marginTop: '10px',
                    marginLeft: '25px',
                    marginRight: '10px',
                    fontSize: '12px',
                    lineHeight: 'unset',
                  }}
                  fullWidth
                >
                  <img
                    className='google'
                    src={'googleLogo.png'}
                    alt='Google'
                    style={{
                      width: '25px',
                      marginLeft: '-20px',
                      paddingRight: '5px',
                    }}
                  />
                  구글 로그인
                </Button>
              </div>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
