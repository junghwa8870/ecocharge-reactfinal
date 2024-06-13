import React from 'react';
import './MainQnA.scss';
import { Grid, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const MainQnA = () => {
  return (
    <div className='main-qna-container'>
      <Typography variant='h4' className='qtitle'>
        Q & A
      </Typography>
      <Grid
        container
        className='qcontainer'
        style={{ width: '80%', height: '450px', marginTop: '20px' }}
      >
        <Grid item className='qbox' flex={2}>
          <Link to='/qna1' className='qbox-link'>
            <div className='qtitle'>
              완속, 급속 충전시설 보조사업 신제품 수요조사 알림
            </div>
            <div className='qcontent'>
              우리는 소셜 미디어 기능의 제공과 데이터 분석 및 본 사이트가 올바로
              동작하고 개인화된 콘텐츠와 광고를 제공하기 위해 쿠키를 사용하고
              있습니다. 회사 사이트에 대한 귀하의 사용 정보를 회사의 소셜
              미디어, 광고 및 분석 협력사와 공유합니다.
            </div>
          </Link>
        </Grid>
        <Grid item className='qbox' flex={2}>
          <Link to='/qna2' className='qbox-link'>
            <div className='qtitle'>
              완속, 급속 충전시설 보조사업 신제품 수요조사 알림
            </div>
            <div className='qcontent'>
              우리는 소셜 미디어 기능의 제공과 데이터 분석 및 본 사이트가 올바로
              동작하고 개인화된 콘텐츠와 광고를 제공하기 위해 쿠키를 사용하고
              있습니다. 회사 사이트에 대한 귀하의 사용 정보를 회사의 소셜
              미디어, 광고 및 분석 협력사와 공유합니다.
            </div>
          </Link>
        </Grid>
        <Grid item className='qbox' flex={2}>
          <Link to='/qna3' className='qbox-link'>
            <div className='qtitle'>
              완속, 급속 충전시설 보조사업 신제품 수요조사 알림
            </div>
            <div className='qcontent'>
              우리는 소셜 미디어 기능의 제공과 데이터 분석 및 본 사이트가 올바로
              동작하고 개인화된 콘텐츠와 광고를 제공하기 위해 쿠키를 사용하고
              있습니다. 회사 사이트에 대한 귀하의 사용 정보를 회사의 소셜
              미디어, 광고 및 분석 협력사와 공유합니다.
            </div>
          </Link>
        </Grid>
        <Grid item className='qbox' flex={2}>
          <Link to='/qna4' className='qbox-link'>
            <div className='qtitle'>
              완속, 급속 충전시설 보조사업 신제품 수요조사 알림
            </div>
            <div className='qcontent'>
              우리는 소셜 미디어 기능의 제공과 데이터 분석 및 본 사이트가 올바로
              동작하고 개인화된 콘텐츠와 광고를 제공하기 위해 쿠키를 사용하고
              있습니다. 회사 사이트에 대한 귀하의 사용 정보를 회사의 소셜
              미디어, 광고 및 분석 협력사와 공유합니다.
            </div>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            textAlign: 'center',
            marginTop: '-30px',
            marginBottom: '-20px',
          }}
        >
          <Button
            className='qnaBtn'
            component={Link}
            to='/qna'
            variant='contained'
            style={{
              backgroundColor: '#228b22',
              // backgroundColor: 'white',
              color: 'white',
              fontWeight: 'bold',
              textTransform: 'none',
              borderRadius: '10px',
              padding: '12px 24px',
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)',
              transition: 'background-color 0.3s, color 0.3s, transform 0.2s',
              '&:hover': {
                backgroundColor: '#1a751d',
                transform: 'scale(1.05)',
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
              },
            }}
          >
            더보기
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainQnA;
