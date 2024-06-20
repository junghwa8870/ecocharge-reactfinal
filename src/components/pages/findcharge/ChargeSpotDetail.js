import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';
import '../../../scss/ChargeSpotDetail.scss';

function ChargeSpotDetail() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleReservation = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlePayment = () => {
    // 여기에 카카오페이 결제 요청 로직을 추가
    console.log('결제 요청 진행');
    // 결제 API 호출 예제
    // fetch('/api/payment/kakao', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ /* 결제 정보 */ }),
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     if (data.success) {
    //       window.location.href = data.next_redirect_pc_url;
    //     } else {
    //       alert('결제 요청에 실패했습니다.');
    //     }
    //   });
    setOpen(false);
  };
  const handleBackToList = () => {
    navigate('/findCharge');
  };

  return (
    <div className='charge-spot-detail-container'>
      <div className='GoFindCharge' onClick={() => navigate('/FindCharge')}>
        <FontAwesomeIcon icon={faChevronLeft} /> &nbsp;Back
      </div>
      <div className='page-title'>
        {/* <Button
          variant='contained'
          onClick={handleBackToList}
          style={{ cursor: 'pointer', fontSize: '20px;' }}
        >
          Back
        </Button> */}
        <h2 style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'blue', marginRight: '10px' }}>⚡</span> 충전소
          상세정보
        </h2>
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>예약</DialogTitle>
        <DialogContent>
          <Typography>카카오페이로 예약을 진행하시겠습니까?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePayment} color='primary'>
            예약하기
          </Button>
          <Button onClick={handleClose} color='primary'>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ChargeSpotDetail;
