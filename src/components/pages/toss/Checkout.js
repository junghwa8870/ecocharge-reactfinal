import React, { useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { API_BASE_URL, CONFIRM } from '../../../config/host-config';

const Checkout = () => {
  const [reserv, setReserv] = useState({
    amount: 1000, // 결제 예시 금액
  });

  const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;

  console.log(clientKey);

  const handlePayment = (paymentType) => {
    const random = new Date().getTime() + Math.random();
    const randomId = btoa(random.toString()); // 무작위 ID 생성

    if (paymentType === '카드') {
      loadTossPayments(clientKey).then((tossPayments) => {
        console.log(clientKey);
        tossPayments.requestPayment(paymentType, {
          amount: reserv.amount,
          orderId: randomId,
          orderName: '결제 주문명', // 실제 주문명으로 교체
          customerName: '테스트', // 실제 고객명으로 교체
          successUrl: API_BASE_URL + CONFIRM,
          failUrl: 'http://localhost:3000',
        });
      });
    }
  };

  return (
    <>
      <button style={{ width: '90px' }} onClick={() => handlePayment('카드')}>
        예약 하기
      </button>
    </>
  );
};

export default Checkout;
