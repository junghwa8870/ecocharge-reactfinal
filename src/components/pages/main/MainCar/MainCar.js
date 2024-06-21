import React from 'react';
import './MainCar.scss';
import { Grid, Typography } from '@mui/material';

const MainCar = () => {
  return (
    <div className='main-car-container'>
      <Typography variant='h4' className='main-car-title'>
        Model
      </Typography>
      <div className='main-car-comment'>
        최근 출시 예정인 전기차 모델입니다.
      </div>
      <Grid className='main-car-box'>
        <div className='main-car-innerbox'>
          <img
            className='feature1'
            src='https://imgauto-phinf.pstatic.net/20240604_202/auto_1717462420817qXuJu_JPEG/20240604095339_nfLuxCyY.jpg'
          ></img>

          <div className='mini-car-box'>
            <div className='carname'>2025 코란도 EV</div>
            <div
              className='minimini-box'
              style={{ display: 'flex', marginTop: '55px' }}
            >
              <img
                className='feature2'
                src='https://imgauto-phinf.pstatic.net/20240604_199/auto_1717462347890jUFiG_JPEG/20240604095223_ffvC49Gj.jpg'
              ></img>

              <img
                className='feature3'
                src='https://imgauto-phinf.pstatic.net/20240523_126/auto_1716449529764rhzN9_JPEG/20240523163205_JldyKVTc.jpg'
              ></img>
            </div>
            <div
              className='carnames'
              style={{
                display: 'flex',
                width: '100%',
                fontWeight: 'bold',
                paddingLeft: '10px',
                fontSize: '20px',
                paddingTop: '15px',
              }}
            >
              <div style={{ marginRight: '310px' }}>2025 EV3</div>
              <div>2024 캐딜락 리릭</div>
            </div>
          </div>
        </div>
      </Grid>
    </div>
  );
};

export default MainCar;
