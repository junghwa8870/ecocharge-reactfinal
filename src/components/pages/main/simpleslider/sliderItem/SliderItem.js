import React from 'react';

const SliderItem = ({ props }) => {
  const { dataId, imgUrl, infoUrl } = props;
  return (
    <a className='imgbox' href={infoUrl}>
      <img className='mainCarImg' src={imgUrl} alt={`Slide ${dataId}`} />
    </a>
  );
};

export default SliderItem;
