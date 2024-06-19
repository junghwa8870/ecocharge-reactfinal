import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SimpleSlider.scss';
import axios from 'axios';
import SliderItem from './sliderItem/SliderItem';

function SimpleSlider() {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [sliderItems, setSliderItems] = useState([]);

  useEffect(() => {
    const fetchSlider = async () => {
      try {
        const res = await axios.get('http://localhost:8181/main/slider');
        setSliderItems(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSlider();
  }, []);
  return (
    <Slider {...settings}>
      {sliderItems.map((sliderItem) => (
        <SliderItem key={sliderItem.dataId} props={sliderItem} />
      ))}
    </Slider>
  );
}

export default SimpleSlider;
