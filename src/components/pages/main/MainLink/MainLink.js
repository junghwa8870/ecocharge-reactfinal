import React, { useEffect, useState } from 'react';
import './MainLink.scss';
import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAddressCard,
  faChevronRight,
  faClipboardQuestion,
  faPenToSquare,
  faSquareCaretLeft,
  faSquareCaretRight,
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap';

const MainLink = () => {
  const navigate = useNavigate();

  // 카드 캐러셀에 들어갈 카드 데이터
  const carouselItems = [
    {
      title: 'EV6',
      imageUrl:
        'https://ev.or.kr/nportal/file/viewImage.do?atch_id=U0OJ54IUGR8V',
      passengerCapacity: '5인승',
      supportAmount: '684만원',
      recommendedTrim: '롱레인지 2WD (19인치)',
    },
    // 다른 카드 데이터 추가 가능
    {
      title: '니로',
      imageUrl:
        'https://ev.or.kr/nportal/file/viewImage.do?atch_id=X5N7XZQ4UZ1E',
      passengerCapacity: '5인승',
      supportAmount: '592만원',
      recommendedTrim: '플러스 (DP)',
    },
    {
      title: 'EV9',
      imageUrl:
        'https://ev.or.kr/nportal/file/viewImage.do?atch_id=5TY84IWSXEA9',
      passengerCapacity: '6, 7인승',
      supportAmount: '301만원',
      recommendedTrim: '2WD (19인치)',
    },
    {
      title: '레이 EV',
      imageUrl:
        'https://ev.or.kr/nportal/file/viewImage.do?atch_id=3E85S8PN2CHQ',
      passengerCapacity: '4인승',
      supportAmount: '452만원',
      recommendedTrim: '2WD (14인치)',
    },
    {
      title: 'EQB300',
      imageUrl:
        'https://ev.or.kr/nportal/file/viewImage.do?atch_id=A860EXDNMPFL',
      passengerCapacity: '5인승',
      supportAmount: '217만원',
      recommendedTrim: '4MATIC',
    },
  ];

  return (
    <Grid className='main-link-container'>
      <Grid className='eTitleBox'>
        <Typography variant='h4' className='etitle'>
          전기차
        </Typography>
        <div className='eComment'>
          전기차, 우리의 미래를 위한 스마트한 선택입니다.
        </div>
      </Grid>

      <Grid className='links-box'>
        <Grid className='main-link-first-container'>
          <Grid className='first-container-img'>
            <img className='link-img' src='charging2.jpg'></img>
            <Grid className='go-spot-box'>
              <Typography variant='h5' className='go-spot-title'>
                충전소 찾기
              </Typography>
              <Typography variant='h7' className='go-spot-comment'>
                고객님이 계신 곳 근처의 충전소를 안내해드립니다.
              </Typography>
              <div className='goCBtn' onClick={() => navigate('/findCharge')}>
                바로가기&nbsp;
                <FontAwesomeIcon icon={faChevronRight} />
              </div>
            </Grid>
          </Grid>
        </Grid>

        {/* 카드 캐러셀 */}
        <Grid className='CarouselContainer' style={{ width: '35%' }}>
          <Carousel>
            {carouselItems.map((item, index) => (
              <Carousel.Item key={index}>
                <Card className='card-container' variant='elevation'>
                  <div className='img-box'>
                    <Typography variant='h5' className='support-car-name'>
                      {item.title}
                    </Typography>
                    <FontAwesomeIcon
                      icon={faSquareCaretLeft}
                      className='img-left-btn'
                    />
                    <img src={item.imageUrl} alt={item.title} className='img' />
                    <FontAwesomeIcon
                      icon={faSquareCaretRight}
                      className='img-right-btn'
                    />
                  </div>
                  <CardContent>
                    <Grid container className='support-text-box'>
                      <Grid item xs={12} className='support-text'>
                        <div className='sub'>승차인원</div>
                        <div>{item.passengerCapacity}</div>
                      </Grid>
                      <Grid item xs={12} className='support-text'>
                        <div className='sub'>지원금</div>
                        <div>{item.supportAmount}</div>
                      </Grid>
                      <Grid item xs={12} className='support-text'>
                        <div className='sub'>추천 트림</div>
                        <div>{item.recommendedTrim}</div>
                      </Grid>
                      <Grid className='gosupportCarListBtn'>
                        <Button
                          className='gosupportCarList'
                          onClick={() => navigate('/carList')}
                        >
                          More
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Carousel.Item>
            ))}
          </Carousel>
        </Grid>
      </Grid>
      <Grid className='simple-go-container'>
        <Box className='goBoxes'>
          <Box
            className='goUserWrite'
            //   게시판 페이지가 없어서 막아놓음
            onClick={() => navigate('/board')}
          >
            <div>
              <FontAwesomeIcon icon={faPenToSquare} />
            </div>
            <div>게시판</div>
            <div className='goWBtn'>
              <div className='hoverEF'>바로가기&nbsp;</div>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Box>
          <Box className='goMyPage' onClick={() => navigate('/myPage')}>
            <div>
              <FontAwesomeIcon icon={faAddressCard} />
            </div>
            <div>마이페이지</div>
            <div className='goMBtn'>
              <div className='hoverEF'>바로가기&nbsp;</div>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Box>
          <Box className='goQnA' onClick={() => navigate('/qna')}>
            <div>
              <FontAwesomeIcon icon={faClipboardQuestion} />
            </div>
            <div>Q & A</div>
            <div className='goFBtn'>
              <div className='hoverEF'>바로가기&nbsp;</div>
              <FontAwesomeIcon icon={faChevronRight} />
            </div>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default MainLink;
