import React from 'react';
import '../chargespace/Chargespace.scss';

const Chargespace = () => {
  return (
    <div className='chargeSpaceContainer'>
      <div className='chargeSpaceItem'>
        <div className='chargeSpaceTitle'>충전소 1</div>
        <div className='chargeSpaceInfo'>주소 1</div>
      </div>
      <div className='chargeSpaceItem'>
        <div className='chargeSpaceTitle'>충전소 2</div>
        <div className='chargeSpaceInfo'>주소 2</div>
      </div>
      <div className='chargeSpaceItem'>
        <div className='chargeSpaceTitle'>충전소 3</div>
        <div className='chargeSpaceInfo'>주소 3</div>
      </div>
      <div className='chargeSpaceItem'>
        <div className='chargeSpaceTitle'>충전소 4</div>
        <div className='chargeSpaceInfo'>주소 4</div>
      </div>
      <div className='chargeSpaceItem'>
        <div className='chargeSpaceTitle'>충전소 5</div>
        <div className='chargeSpaceInfo'>주소 5</div>
      </div>
      <div className='chargeSpaceItem'>
        <div className='chargeSpaceTitle'>충전소 6</div>
        <div className='chargeSpaceInfo'>주소 6</div>
      </div>
    </div>
  );
};

export default Chargespace;
