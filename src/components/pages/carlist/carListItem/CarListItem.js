import { faExpand } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography } from '@mui/material';
import React from 'react';
import { Badge } from 'reactstrap';

const CarListItem = ({ info }) => {
  const handleCarInfoBoxClick = () => {
    window.location.href = 'https://www.kia.com';
  };

  const {
    carName,
    imgUrl,
    ridingCapacity,
    battery,
    fullChargeRange,
    subsidy,
    topSpeed,
    callNumber,
    company,
    country,
  } = info;

  return (
    <Grid
      item
      className='carInfo'
      onClick={handleCarInfoBoxClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '25%',
      }}
    >
      <Typography variant='h6' className='carName'>
        {carName}
      </Typography>
      <Badge color='dark' pill style={{ width: '100px', margin: '0 10px' }}>
        {company}
      </Badge>
      <div className='imageContainer'>
        <img
          src={`https://ev.or.kr${imgUrl}`}
          alt='CarA'
          style={{ width: '100%' }}
        />
      </div>
      <Typography variant='body2' className='carStat'>
        승차인원: {ridingCapacity}
      </Typography>
      <Typography variant='body2' className='carStat'>
        배터리: {battery}
      </Typography>
      <Typography variant='body2' className='carStat'>
        1회충전 주행거리: {fullChargeRange}
      </Typography>
      <Typography variant='body2' className='carStat'>
        지원금: {subsidy}
      </Typography>
      <Typography variant='body2' className='carStat'>
        최고속도: {topSpeed}
      </Typography>
      <Typography variant='body2' className='carStat'>
        제조국: {country}
      </Typography>
      <Typography variant='body2' className='carStat'>
        판매사 연락처: {callNumber}
      </Typography>
      <FontAwesomeIcon icon={faExpand} className='expandIcon' />
    </Grid>
  );
};

export default CarListItem;
