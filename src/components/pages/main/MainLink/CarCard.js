import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Carousel from 'react-material-ui-carousel';
import './MainLink.scss';

const CarCard = ({ carData }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrevClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? carData.length - 1 : prevIndex - 1,
    );
  };

  const handleNextClick = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === carData.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <Carousel
      autoPlay={true}
      animation='slide'
      indicators={false}
      navButtonsAlwaysVisible={true}
      navButtonsProps={{
        style: {
          backgroundColor: 'transparent',
          color: '#000',
          outline: 'none',
        },
      }}
      NextIcon={<FontAwesomeIcon icon={faChevronRight} />}
      PrevIcon={<FontAwesomeIcon icon={faChevronLeft} />}
      onNext={() => handleNextClick()}
      onPrevious={() => handlePrevClick()}
    >
      {carData.map((car, index) => (
        <Card key={index} className='card-container' variant='elevation'>
          <div className='img-box'>
            <Typography variant='h5' className='support-car-name'>
              {car.name}
            </Typography>
            {/* 좌우 버튼을 위한 FontAwesome 아이콘 */}
            <FontAwesomeIcon icon={faChevronLeft} className='img-left-btn' />
            <img src={car.imageUrl} alt={car.name} className='img' />
            <FontAwesomeIcon icon={faChevronRight} className='img-right-btn' />
          </div>
          <CardContent>
            <Grid container className='support-text-box'>
              <Grid item xs={12} className='support-text'>
                <div className='sub'>승차인원</div>
                <div>{car.passengerCapacity}</div>
              </Grid>
              <Grid item xs={12} className='support-text'>
                <div className='sub'>지원금</div>
                <div>{car.supportAmount}</div>
              </Grid>
              <Grid item xs={12} className='support-text'>
                <div className='sub'>추천 트림</div>
                <div>
                  {car.recommendedTrim} <br />
                  &nbsp; &nbsp; &nbsp; &nbsp; ({car.recommendedWheelSize})
                </div>
              </Grid>
              <Grid className='gosupportCarListBtn'>
                <Button className='gosupportCarList'>더보기</Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Carousel>
  );
};

export default CarCard;
