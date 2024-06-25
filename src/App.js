import React from 'react';
import Header from './components/layout/Header.js';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import CarList from './components/pages/carlist/CarList.js';
import FindCharge from './components/pages/findcharge/FindCharge.js';
import NewInfo from './components/pages/newinfo/NewInfo.js';
import MyPage from './components/pages/mypage/MyPage.js';
import QnA from './components/pages/qna/QnA.js';
import Login from './components/user/Login.js';
import Footer from './components/layout/Footer.js';
import Main from './components/pages/main/Main.js';
import ScrollToTopButton from './components/layout/ScrollToTopButton.js';
import ChargeSpotDetail from './components/pages/findcharge/ChargeSpotDetail.js';
import NewInfoWrite from './components/pages/newinfo/newInfoWrite/NewInfoWrite.js';
import WriteQnA from './components/pages/qna/writeqna/WriteQnA.js';
import SmsVerification from './components/user/SmsVerification.js';
import KakaoLoginHandler from './components/user/KakaoLoginHandler.js';
import NaverLoginHandler from './components/user/NaverLoginHandler.js';
import GoogleLoginHandler from './components/user/GoogleLoginHandler.js';
import QnAList from './components/pages/qna/qnalist/QnAList.js';
import QuestionForm from './components/pages/qna/qnalist/questionform/QuestionForm.js';
import MyQuestionList from './components/pages/qna/qnalist/myquestionlist/MyQuestionList.js';
import { AuthContextProvider } from './utils/AuthContext.js';
import UserBoard from './components/pages/userBoard/UserBoard.js';
import WriteBoardForm from './components/pages/userBoard/writeBoardForm/WriteBoardForm.js';
import UserBoardDetail from './components/pages/userBoard/userBoardDetail/UserBoardDetail.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthContextProvider>
      {/* <Favicon url='/favicon-32x32.png' /> */}

      <div className='app' style={{ display: 'flex', flexDirection: 'column' }}>
        <Header />
        {/* <Main /> */}
        <Routes>
          <Route path='/carList' element={<CarList />} />
          <Route path='/findCharge' element={<FindCharge />} />
          {/* <Route path='/newInfo' element={<NewInfo />} />
          <Route path='/newInfoWrite' element={<NewInfoWrite />} /> */}
          <Route path='/userBoard' element={<UserBoard />} />
          <Route path='/userBoardDetail' element={<UserBoardDetail />} />
          <Route path='/writeBoardForm' element={<WriteBoardForm />} />
          <Route path='/myPage' element={<MyPage />} />
          <Route path='/qna' element={<QnA />} />
          <Route path='/writeqna' element={<WriteQnA />} />
          <Route path='/qnalist' element={<QnAList />} />
          <Route path='/questionform' element={<QuestionForm />} />
          <Route path='/myquestionlist' element={<MyQuestionList />} />
          <Route path='/login' element={<Login />} />
          <Route path='/ChargeSpotDetail' element={<ChargeSpotDetail />} />
          <Route path='/oauth/kakao' element={<KakaoLoginHandler />} />
          <Route path='/oauth/naver' element={<NaverLoginHandler />} />
          <Route path='/oauth/google' element={<GoogleLoginHandler />} />
          <Route path='/sms' element={<SmsVerification />} />

          {/* 필요한 다른 라우트 추가 */}
          <Route
            path='/'
            element={
              <div className='main'>
                {/* <SearchBar /> */}
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
    </AuthContextProvider>
  );
}

export default App;
