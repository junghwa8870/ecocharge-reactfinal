import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import React from 'react';
import { API_BASE_URL } from '../../../config/host-config';

const Success = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentKey = urlParams.get('paymentKey');
  const orderId = urlParams.get('orderId');
  const amount = urlParams.get('amount');

  async function confirm() {
    const requestData = {
      paymentKey,
      orderId,
      amount,
    };

    const response = await fetch(`/confirm`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const json = await response.json();

    if (!response.ok) {
      // 결제 실패 비즈니스 로직을 구현하세요.
      console.log(json);
      window.location.href = `/fail?message=${json.message}&code=${json.code}`;
    }

    // 결제 성공 비즈니스 로직을 구현하세요.
    console.log(json);
  }
  confirm();

  const paymentKeyElement = document.getElementById('paymentKey');
  const orderIdElement = document.getElementById('orderId');
  const amountElement = document.getElementById('amount');

  orderIdElement.textContent = '주문번호: ' + orderId;
  amountElement.textContent = '결제 금액: ' + amount;
  paymentKeyElement.textContent = 'paymentKey: ' + paymentKey;

  return (
    <>
      <h2>결제 성공</h2>
      <p id='paymentKey'></p>
      <p id='orderId'></p>
      <p id='amount'></p>
    </>
  );
};

export default Success;
