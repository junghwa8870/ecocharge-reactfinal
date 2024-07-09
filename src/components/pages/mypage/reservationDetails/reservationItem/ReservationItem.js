import { Grid } from '@mui/material';
import React from 'react';

const ReservationItem = ({ info }) => {
  const { statNm, reservationDate, rstatus } = info;
  return (
    <Grid item>
      <div className='reservationItem'>
        <div className='reservationTitle'>{statNm}</div>
        <div className='reservationDate'>날짜: {reservationDate}</div>
        <div className='reservationStatus'>상태: {rstatus}</div>
      </div>
    </Grid>
  );
};

export default ReservationItem;
