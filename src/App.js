import React from 'react';
import Header from './components/layout/Header.js';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CarList from './components/pages/carlist/CarList.js';
import FindCharge from './components/pages/findcharge/FindCharge.js';
import NewInfo from './components/pages/newinfo/NewInfo.js';
import MyPage from './components/pages/mypage/MyPage.js';
import QnA from './components/pages/qna/QnA.js';
import Login from './components/pages/Login.js';
import Footer from './components/layout/Footer.js';
import Main from './components/pages/main/Main.js';
import ScrollToTopButton from './components/layout/ScrollToTopButton.js';

function App() {
  return (
    <>
      <div className='app' style={{ display: 'flex', flexDirection: 'column' }}>
        <Header />
        {/* <Main /> */}
        <Routes>
          <Route path='/carList' element={<CarList />} />
          <Route path='/findCharge' element={<FindCharge />} />
          <Route path='/newInfo' element={<NewInfo />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/qna' element={<QnA />} />
          <Route path='/login' element={<Login />} />
          {/* 필요한 다른 라우트 추가 */}
          <Route
            path='/'
            element={
              <div className='main'>
                {/* SearchComponent를 이곳에 추가 */}
                {/* <SimpleSlider />
              <MainInfo /> */}
                <Main />
              </div>
            }
          />
        </Routes>
        <ScrollToTopButton />
        <Footer />
      </div>
    </>
  );
}

export default App;
