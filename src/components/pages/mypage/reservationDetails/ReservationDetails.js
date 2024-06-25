import React from 'react';

const ReservationDetails = () => {
  return (
    <div className='reservationListContainer'>
      <div className='reservationItem'>
        <div className='reservationTitle'>충전소 예약 1</div>
        <div className='reservationDate'>날짜: 2023-06-25</div>
      </div>
      <div className='reservationItem'>
        <div className='reservationTitle'>충전소 예약 2</div>
        <div className='reservationDate'>날짜: 2023-06-26</div>
      </div>
      <div className='reservationItem'>
        <div className='reservationTitle'>충전소 예약 3</div>
        <div className='reservationDate'>날짜: 2023-06-27</div>
      </div>
      <div className='reservationItem'>
        <div className='reservationTitle'>충전소 예약 4</div>
        <div className='reservationDate'>날짜: 2023-06-28</div>
      </div>
      <div className='reservationItem'>
        <div className='reservationTitle'>충전소 예약 5</div>
        <div className='reservationDate'>날짜: 2023-06-29</div>
      </div>
      <div className='reservationItem'>
        <div className='reservationTitle'>충전소 예약 6</div>
        <div className='reservationDate'>날짜: 2023-06-30</div>
      </div>

      {/* 추가 예약 내역을 여기에 추가하세요 */}
    </div>
  );
};

export default ReservationDetails;
