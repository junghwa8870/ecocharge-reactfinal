import { Grid } from '@mui/material';
import React from 'react';

const ReservationItem = ({ info }) => {
  const { statNm, reservationDate } = info;
  return (
    <Grid item>
      <div className='reservationItem'>
        <div className='reservationTitle'>{statNm}</div>
        <div className='reservationDate'>날짜: {reservationDate}</div>
      </div>
    </Grid>
  );
};

export default ReservationItem;
