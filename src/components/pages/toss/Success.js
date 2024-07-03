import { loadPaymentWidget } from '@tosspayments/payment-widget-sdk';
import { nanoid } from 'nanoid';
import React, { useEffect } from 'react';
import { API_BASE_URL } from '../../../config/host-config';
import axiosInstance from '../../../config/axios-config';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // 쿼리 파라미터 값이 결제 요청할 때 보낸 데이터와 동일한지 반드시 확인하세요.
    // 클라이언트에서 결제 금액을 조작하는 행위를 방지할 수 있습니다.
    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    };

    async function confirm() {
      try {
        const response = await fetch(`${API_BASE_URL}` + '/confirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestData),
        });

        const json = await response.json();

        if (!json.ok) {
          // 결제 실패 비즈니스 로직을 구현하세요.
          navigate(`/fail?message=${json.message}&code=${json.code}`);
        }

        // 결제 성공 비즈니스 로직을 구현하세요.

        setTimeout(() => {
          navigate('/findCharge');
        }, 1000); // 1초 후에 메인 페이지로 이동
      } catch (error) {
        console.error('결제 확인 중 오류 발생:', error);
      }
    }
    confirm();
  }, []);

  return (
    <>
      <h2>결제 성공</h2>
      <p id='paymentKey'>{}</p>
      <p id='orderId'></p>
      <p id='amount'></p>
    </>
  );
};

export default Success;
