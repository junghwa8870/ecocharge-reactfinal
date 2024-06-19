import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SimpleSlider.scss';

function SimpleSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: '25%', // 양쪽 이미지의 보이는 부분 설정
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: '0',
        },
      },
    ],
  };

  return (
    <Slider {...settings} className='simple-slider'>
      <div className='imgbox'>
        <img className='mainCarImg' src='carA.png' alt='Slide 1' />
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='carB.png' alt='Slide 2' />
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='carC.png' alt='Slide 3' />
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='carD.png' alt='Slide 4' />
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='carE.png' alt='Slide 5' />
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='carF.png' alt='Slide 6' />
      </div>
    </Slider>
  );
}

export default SimpleSlider;
