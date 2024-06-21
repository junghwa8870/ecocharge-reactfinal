import React, { useState } from 'react';
import { AppBar, Grid, Toolbar, Link as MuiLink, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../../scss/Header.scss';
import { NAVER_AUTH_URL } from '../../config/naver-config';
import { GOOGLE_AUTH_URL } from '../../config/google-config';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [showButtons, setShowButtons] = useState(false);

  const { isLoggedIn } = useContext(AuthContext);

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };
  const navigate = useNavigate();
  const handleLogin = (authUrl) => {
    navigate('/sms', { state: { redirectUrl: authUrl } });
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
                paddingRight='80px'
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
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
