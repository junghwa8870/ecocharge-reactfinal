import React from 'react';

const SliderItem = ({ props }) => {
  const { dataId, imgUrl } = props;
  return (
    <div className='imgbox'>
      <img className='mainCarImg' src={imgUrl} alt={`Slide ${dataId}`} />
    </div>
  );
};

export default SliderItem;
