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
        <div className='mainCarImgName'>2025 코란도 EV</div>
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='carB.png' alt='Slide 2' />
        <div className='mainCarImgName'>2025 EV3</div>
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='carC.png' alt='Slide 3' />
        <div className='mainCarImgName'>2024 캐딜락 리릭</div>
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='carD.png' alt='Slide 4' />
        <div className='mainCarImgName'>2024 지프 랭글러 4XE</div>
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='carE.png' alt='Slide 5' />
        <div className='mainCarImgName'>2024 아우디 SQ8 e-트론 스포트백</div>
      </div>
      <div className='imgbox'>
        <img className='mainCarImg' src='carF.png' alt='Slide 6' />
        <div className='mainCarImgName'>아우디 Q8 e-트론 스포트백</div>
      </div>
    </Slider>
  );
}

export default SimpleSlider;
