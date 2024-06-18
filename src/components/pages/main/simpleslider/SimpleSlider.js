import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SimpleSlider.scss';

function SimpleSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <Slider {...settings}>
      <div className='imgbox'>
        <img className='mainCarImg' src='carA.png' alt='Slide 1' />
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='car2.jpg' alt='Slide 2' />
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='car3.jpg' alt='Slide 3' />
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='car4.jpg' alt='Slide 4' />
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='car5.jpg' alt='Slide 5' />
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='car6.jpg' alt='Slide 6' />
      </div>
    </Slider>
  );
}

export default SimpleSlider;
