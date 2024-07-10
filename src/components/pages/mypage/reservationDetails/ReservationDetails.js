import { Grid } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ReservationItem from './reservationItem/ReservationItem';
import handleRequest from '../../../../utils/handleRequest';
import axiosInstance from '../../../../config/axios-config';
import { API_BASE_URL } from '../../../../config/host-config';
import AuthContext from '../../../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const ReservationDetails = () => {
  const [reservationList, setReservationList] = useState([]);
  const { onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  const reservationListRendering = async () => {
    handleRequest(
      () =>
        axiosInstance.post(`${API_BASE_URL}/reservation/list`, {
          userId: localStorage.getItem('USER_ID'),
        }),
      (data) => {
        if (data) {
          setReservationList(data);
        } else {
          setReservationList([]);
        }
      },
      onLogout,
      navigate,
    );
  };

  useEffect(() => {
    reservationListRendering();
  }, []);

  return (
    <Grid container className='reservationListContainer'>
      {reservationList.length > 0 ? (
        reservationList.map((reservation) => (
          <ReservationItem key={reservation.reservationNo} info={reservation} />
        ))
      ) : (
        <div>예약이 없습니다.</div>
      )}
    </Grid>
    // <div className='reservationListContainer'>
    //   <div className='reservationItem'>
    //     <div className='reservationTitle'>충전소 예약 1</div>
    //     <div className='reservationDate'>날짜: 2023-06-25</div>
    //   </div>
    //   <div className='reservationItem'>
    //     <div className='reservationTitle'>충전소 예약 2</div>
    //     <div className='reservationDate'>날짜: 2023-06-26</div>
    //   </div>
    //   <div className='reservationItem'>
    //     <div className='reservationTitle'>충전소 예약 3</div>
    //     <div className='reservationDate'>날짜: 2023-06-27</div>
    //   </div>
    //   <div className='reservationItem'>
    //     <div className='reservationTitle'>충전소 예약 4</div>
    //     <div className='reservationDate'>날짜: 2023-06-28</div>
    //   </div>
    //   <div className='reservationItem'>
    //     <div className='reservationTitle'>충전소 예약 5</div>
    //     <div className='reservationDate'>날짜: 2023-06-29</div>
    //   </div>
    //   <div className='reservationItem'>
    //     <div className='reservationTitle'>충전소 예약 6</div>
    //     <div className='reservationDate'>날짜: 2023-06-30</div>
    //   </div>

    //   {/* 추가 예약 내역을 여기에 추가하세요 */}
    // </div>
  );
};

export default ReservationDetails;
