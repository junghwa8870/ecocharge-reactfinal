import React, { useState } from 'react';
import { loadTossPayments } from '@tosspayments/payment-sdk';

const Checkout = () => {
  const [reserv, setReserv] = useState({
    amount: 1000, // 결제 예시 금액
  });

  const clientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;

  const handlePayment = (subject) => {
    const random = new Date().getTime() + Math.random();
    const randomId = btoa(random.toString()); // 무작위 ID 생성

    if (subject === '카드') {
      loadTossPayments(clientKey).then((tossPayments) => {
        tossPayments.requestPayment(subject, {
          amount: reserv.amount,
          orderId: randomId,
          orderName: '결제 주문명', // 실제 주문명으로 교체
          customerName: '테스트', // 실제 고객명으로 교체
          // successUrl: process.env.REACT_APP_TOSS_SUCCESS,
          // failUrl: process.env.REACT_APP_TOSS_FAIL,
        });
      });
    }
  };

  return (
    <>
      <div>
        <button style={{ width: '90px' }} onClick={() => handlePayment('카드')}>
          예약 하기
        </button>
      </div>
    </>
  );
};

export default Checkout;
