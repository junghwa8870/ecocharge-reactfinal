import { Grid, Typography } from '@mui/material';
import React from 'react';
import Chargespace from './chargespace/Chargespace';
import '../../../scss/MyPage.scss';
import MyInfo from './myInfo/MyInfo';
import ReservationDetails from './reservationDetails/ReservationDetails';
import InqauiryList from './inquiry/InqauiryList';

const MyPage = () => {
  return (
    <div className='mainContainer'>
      <Grid container className='myInfoContainer'>
        <Grid item className='myInfoWrapper'>
          <MyInfo />
        </Grid>
        <Grid item className='bookmarkChargeSpaceWrapper'>
          <Typography className='bookmarkChargeSpaceTitle'>
            즐겨찾는 충전소
          </Typography>
          <Chargespace />
        </Grid>
      </Grid>
      <Grid container className='subContainer'>
        <Typography className='titles'>충전소 예약 내역</Typography>
        <Typography className='titles'>나의 문의사항</Typography>
        <ReservationDetails />
        <InqauiryList />
      </Grid>
    </div>
  );
};

export default MyPage;
