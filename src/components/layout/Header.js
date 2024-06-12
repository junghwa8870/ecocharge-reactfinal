import React from 'react';
import { AppBar, Grid, Toolbar, Link as MuiLink } from '@mui/material';
import { Link } from 'react-router-dom';
import '../../scss/Header.scss';
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <AppBar
      position='fixed'
      style={{
        width: '100%',
        height: 110,
        backgroundColor: '#fff',
        // boxShadow: 'none',
      }}
    >
      <Toolbar>
        <Grid
          container
          justify='space-between'
          style={{ backgroundColor: 'white' }}
        >
          <Grid
            item
            flex={2}
            style={{ alignContent: 'center', display: 'flex' }}
          >
            <img
              src='ecocharge_pavicon.png'
              alt='Logo'
              style={{ width: 100, paddingTop: 15 }}
            />
            <div
              className='logo-title'
              style={{
                color: '#228b22',
                fontWeight: 700,
                lineHeight: 1.2,
                marginLeft: 40,
                fontSize: 24,
                marginTop: 30,
                textAlign: 'center',
                fontFamily: 'Jua',
              }}
            >
              ECO
              <br />
              CHARGE
            </div>
          </Grid>
          <Grid
            item
            flex={6}
            style={{
              alignContent: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
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
                fontFamily='Jua'
                marginRight='50'
                fontSize='23px'
                textAlign='center'
                paddingRight='60px'
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
              component={Link}
              to='/login'
              variant='outlined'
              style={{
                color: '#228b22',
                borderColor: 'black',
                fontFamily: 'Jua',
                fontSize: '20px',
                borderWidth: '3px',
                borderRadius: '10px',
                fontWeight: '600',
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
