import React, { useState } from 'react';
import '../myInfo/MyInfo.scss';

const MyInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('사용자 이름');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('010-1234-5678');
  const [password, setPassword] = useState('');

  const [originalUserName, setOriginalUserName] = useState(userName);
  const [originalPhone, setOriginalPhone] = useState(phone);

  const handleEditProfile = () => {
    setOriginalUserName(userName);
    setOriginalPhone(phone);
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    console.log('Profile saved');
  };

  const handleCancelEdit = () => {
    setUserName(originalUserName);
    setPhone(originalPhone);
    setPassword('');
    setIsEditing(false);
    console.log('Edit cancelled');
  };

  return (
    <div className='infoContainer'>
      {isEditing ? (
        <>
          <div className='inputGroup'>
            <label htmlFor='userName'>사용자 이름</label>
            <input
              type='text'
              id='userName'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className='inputGroup'>
            <label htmlFor='phone'>전화번호</label>
            <input
              type='tel'
              id='phone'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className='inputGroup'>
            <label htmlFor='password'>비밀번호 변경</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='buttonGroup'>
            <button className='saveProfileButton' onClick={handleSaveProfile}>
              저장
            </button>
            <button className='cancelEditButton' onClick={handleCancelEdit}>
              취소
            </button>
          </div>
        </>
      ) : (
        <>
          <div className='userName'>{userName}</div>
          <div className='userInfo'>이메일: {email}</div>
          <div className='userInfo'>전화번호: {phone}</div>
          <button className='editProfileButton' onClick={handleEditProfile}>
            내 정보 수정
          </button>
        </>
      )}
    </div>
  );
};

export default MyInfo;
