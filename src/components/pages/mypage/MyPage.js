import React from 'react';
import '../mypage/MyPage.scss';
import Chargespace from './chargespace/Chargespace';
import MyInfo from './myInfo/MyInfo';
import ReservationDetails from './reservationDetails/ReservationDetails';
import InquiryList from './myInfo/inquiry/InquiryList';

const MyPage = () => {
  return (
    <div className='mainContainer'>
      <div className='myInfoContainer'>
        <MyInfo />
      </div>
      <div className='contentContainer'>
        <div className='subContainer'>
          <h2 className='titles'>충전소 예약내역</h2>
          <ReservationDetails />
        </div>
        <div className='subContainer'>
          <h2 className='titles'>나의 문의사항</h2>
          <InquiryList />
        </div>
        <div className='bookmarkChargeSpaceContainer'>
          <h2 className='bookmarkChargeSpaceTitle'>즐겨찾는 충전소</h2>
          <Chargespace />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
