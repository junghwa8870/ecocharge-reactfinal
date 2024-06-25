import React from 'react';
import '../myInfo/MyInfo.scss';

const MyInfo = () => {
  const handleEditProfile = () => {
    // 이 함수는 수정 버튼 클릭 시 호출될 로직을 정의합니다.
    // 예를 들어, 정보 수정 모달을 열거나 다른 작업을 수행할 수 있습니다.
    console.log('Edit profile clicked');
  };

  return (
    <div className='infoContainer'>
      <div className='userName'>사용자 이름</div>
      <div className='userInfo'>이메일: user@example.com</div>
      <div className='userInfo'>전화번호: 010-1234-5678</div>
      <button className='editProfileButton' onClick={handleEditProfile}>
        내 정보 수정
      </button>
    </div>
  );
};

export default MyInfo;
