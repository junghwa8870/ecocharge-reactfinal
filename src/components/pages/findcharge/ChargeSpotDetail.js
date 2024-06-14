import React from 'react';
import { Button } from 'react-bootstrap'; // 예시로 React Bootstrap의 Button을 사용합니다.
import '../../../scss/ChargeSpotDetail.scss';

function ChargeSpotDetail() {
  const handleReservation = () => {
    // 예약 처리 로직 추가
    console.log('예약 버튼 클릭');
  };

  return (
    <div className='charge-spot-detail-container'>
      <div className='page-title'>
        <h2>충전소 상세정보</h2>
        <Button variant='primary' onClick={handleReservation}>
          예약하기
        </Button>
      </div>
      <div className='charge-spot-detail-content'>
        {/* 주차장명 */}
        <div className='section'>
          <h2>주차장명</h2>
          <p>여기에 주차장명 정보 표시</p>
        </div>

        {/* 충전정보 */}
        <div className='section'>
          <h2>충전정보</h2>
          <p>여기에 충전정보 표시</p>
        </div>

        {/* OO시 충전소 목록 */}
        <div className='section'>
          <h2>OO시 충전소 목록</h2>
          <p>여기에 충전소 목록 표시</p>
        </div>

        {/* 이용후기 */}
        <div className='section'>
          <h2>이용후기</h2>
          <p>여기에 이용후기 표시</p>
        </div>
      </div>
    </div>
  );
}

export default ChargeSpotDetail;
