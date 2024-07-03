import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import { API_BASE_URL } from '../../../config/host-config';
import axiosInstance from '../../../config/axios-config';

const Success = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const paymentKey = urlParams.get('paymentKey');
  const orderId = urlParams.get('orderId');
  const amount = urlParams.get('amount');

  useEffect(() => {
    async function confirm() {
      const requestData = {
        paymentKey,
        orderId,
        amount,
      };

      const response = await axiosInstance.post(
        `${API_BASE_URL}/confirm`,
        requestData,
      );

      const json = response.data;

      if (!response.ok) {
        console.log(json);
        window.location.href = `/fail?message=${json.message}&code=${json.code}`;
      }

      console.log(json);
    }

    confirm();
  }, []);

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
