import React, { useCallback, useReducer, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import { NAVER_AUTH_URL } from '../../config/naver-config';
import { GOOGLE_AUTH_URL } from '../../config/google-config';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import '../../scss/Login.scss';
import { API_BASE_URL, USER } from '../../config/host_config';
import { debounce } from 'lodash'; // lodash.debounce 사용
import { initialState, joinReducer } from './JoinReducer';

const Login = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const location = useLocation(); // useLocation 훅 사용
  const [showModal, setShowModal] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [state, dispatch] = useReducer(joinReducer, initialState);

  const handleSocialLogin = (authUrl) => {
    navigate('/sms', { state: { redirectUrl: authUrl } }); // 페이지 이동 처리
  };
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCodeInput, setVerificationCode] = useState('');

  const { userValue, message, correct } = state;

  // useRef를 사용해서 태그 참조하기
  const $fileTag = useRef();

  // 각각의 핸들러에서 호출하는 dispatch 처리를 중앙화 하자.
  const updateState = (key, inputValue, msg, flag) => {
    key !== 'passwordCheck' &&
      dispatch({
        type: 'SET_USER_VALUE',
        key,
        value: inputValue,
      });
    dispatch({
      type: 'SET_MESSAGE',
      key,
      value: msg,
    });
    dispatch({
      type: 'SET_CORRECT',
      key,
      value: flag,
    });
  };

  // 각각의 핸들러에 붙어 있는 디바운스 함수를 일괄적 처리
  // useCallback: 함수의 메모이제이션을 위한 훅. (함수의 선언을 기억했다가 재사용하기 위한 훅)
  // 상태값 변경에 의해 화면의 재 렌더링이 발생할 때, 컴포넌트의 함수들도 재 선언이 됩니다.
  // useCallback으로 함수를 감싸 주시면 이전에 생성된 함수를 기억했다가 재 사용하도록 하기 때문에
  // 불필요한 함수 선언을 방지할 수 있습니다. (성능 최적화에 도움이 됩니다.)
  const debouncedUpdateState = useCallback(
    debounce((key, inputValue, msg, flag) => {
      console.log('debounce called! key: ', key);
      updateState(key, inputValue, msg, flag);
    }, 500),
    [],
  ); // 의존성 배열을 비워놓으면, 첫 렌더링 때 함수가 선언되고 다시는 재선언되지 않습니다.
  // 만약 함수의 선언이 특정 상태가 변할 때 재선언 되어야 한다면, 의존성 배열에 상태 변수를 선언하시면 됩니다.

  // 이름 입력창 체인지 이벤트 핸들러
  const nameHandler = (e) => {
    console.log('nameHandler가 동작함!');
    const inputValue = e.target.value;
    const nameRegex = /^[가-힣]{2,5}$/;

    // 입력값 검증
    let msg; // 검증 메세지를 저장할 변수
    let flag = false; // 입력값 검증 여부 체크 변수

    if (!inputValue) {
      msg = '유저 이름은 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '2~5글자 사이의 한글로 작성하세요!';
    } else {
      msg = '사용 가능한 이름입니다.';
      flag = true;
    }

    debouncedUpdateState('userName', inputValue, msg, flag);
  };

  const idHandler = (e) => {
    console.log('idHandler가 동작함!');
    const inputValue = e.target.value;
    const nameRegex = /^[가-힣a-zA-Z]{2,5}$/;

    // 입력값 검증
    let msg; // 검증 메세지를 저장할 변수
    let flag = false; // 입력값 검증 여부 체크 변수

    if (!inputValue) {
      msg = 'ID입력은 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '특수문자를 제외한 2~5글자 사이의 닉네임을 입력해주세요!';
    } else {
      msg = '사용 가능한 ID입니다.';
      flag = true;
    }

    debouncedUpdateState('userId', inputValue, msg, flag);
  };

  const passwordHandler = (e) => {
    const inputValue = e.target.value;
    // 패스워드가 변경됐다? -> 패스워드 확인란도 초기화 시킨다.
    document.getElementById('password-check').value = '';
    updateState('passwordCheck', '', '', false);

    const pwRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,20}$/;

    let msg;
    let flag = false;

    if (!inputValue) {
      msg = '비밀번호는 필수입니다.';
    } else if (!pwRegex.test(inputValue)) {
      msg = '8글자 이상의 영문, 숫자, 특수문자를 포함해 주세요.';
    } else {
      msg = '사용 가능한 비밀번호 입니다.';
      flag = true;
    }

    debouncedUpdateState('password', inputValue, msg, flag);
  };

  // 비밀번호 확인란 체인지 이벤트 핸들러
  const pwCheckHandler = (e) => {
    const inputValue = e.target.value;
    let msg;
    let flag = false;
    if (!inputValue) {
      msg = '비밀번호 확인란은 필수입니다.';
    } else if (userValue.password !== inputValue) {
      msg = '비밀번호가 일치하지 않습니다.';
    } else {
      msg = '비밀번호가 일치합니다.';
      flag = true;
    }

    debouncedUpdateState('passwordCheck', 'pass', msg, flag);
  };

  const handleRegularLogin = (e) => {
    e.preventDefault();
    // 일반 로그인 로직
  };

  const handleSignup = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSendVerification = async (e) => {
    setShowVerificationInput(true);
    // 인증번호 전송 로직 추가 (예: API 호출)
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ phoneNumber }),
      });
      alert('인증 코드를 발송하였습니다.');
    } catch (error) {
      console.log('phoneNumber:', phoneNumber);
      alert('인증 코드 발송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async (e) => {
    // 인증번호 확인 로직 추가 (예: API 호출)
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          verificationCodeInput,
        }),
      });
      const result = await response.json();
      if (result) {
        alert('인증되었습니다.');
      }
      console.log(`json 파일확인:${phoneNumber},${verificationCodeInput}`);
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('인증에 실패했습니다.');
    }
  };

  const phonehandler = (e) => {
    const inputValue = e.target.value;
    setPhoneNumber(inputValue);
    console.log('phoneHandler가 동작함!');
    const phoneRegex = /^01[0|1|6|7|8|9][0-9]{7,8}$/;

    // 입력값 검증
    let msg; // 검증 메세지를 저장할 변수
    let flag = false; // 입력값 검증 여부 체크 변수

    if (!inputValue) {
      msg = '핸드폰 인증은 필수입니다.';
    } else if (!phoneRegex.test(inputValue)) {
      msg = "'-'을 제외한 핸드폰번호를 입력해 주세요.";
    } else {
      msg = '';
      flag = true;
    }

    debouncedUpdateState('phonenumber', inputValue, msg, flag);
  };

  const verificationCodeHandler = (e) => {
    const inputValue = e.target.value;
    setVerificationCode(inputValue);
  };

  const isValid = () => {
    // for (let key in correct) {
    //   const flag = correct[key];
    //   console.log(key);
    //   if (!flag) return false;
    // }
    return true;
  };

  const joinButtonClickHandler = (e) => {
    e.preventDefault();

    if (isValid()) {
      // fetch를 사용한 회원 가입 요청.
      handleFormSubmit();
    } else {
      alert('입력란을 다시 확인해 주세요!');
    }
  };

  const handleFormSubmit = async () => {
    /*
      기존 회원가입은 단순히 텍스트를 객체로 모은 후 JSON으로 변환해서 요청 보내주면 끝.
      이제는 프로필 이미지가 추가됨. -> 파일 첨부 요청은 multipart/form-data로 전송해야 함.
      FormData 객체를 활용해서 Content-type을 multipart/form-data로 지정한 후 전송하려 함.
      그럼 JSON 데이터는? Content-type이 application/json이다. 
      Content-type이 서로 다른 데이터를 한번에 FormData에 감싸서 보내면 
      415(unsupported Media Type) 에러가 발생함.
      그렇다면 -> JSON을 Blob으로 바꿔서 함께 보내자. 
      Blob은 이미지, 사운드, 비디오 같은 멀티미디어 파일을 바이트 단위로 쪼개어 파일 손상을 방지하게 
      해 주는 타입. -> multipart/form-data에도 허용됨.
    */

    // JSON을 Blob 타입으로 변경.
    const userJsonBlob = new Blob([JSON.stringify(userValue)], {
      type: 'application/json',
    });

    // 이미지 파일과 회원정보 JSON을 하나로 묶어서 보낼 예정.
    // FormData 객체를 활용해서.
    const userFormData = new FormData();
    userFormData.append('user', userJsonBlob);

    const res = await fetch(API_BASE_URL + USER, {
      method: 'POST',
      body: userFormData,
    });

    if (res.status === 200) {
      const data = await res.json();
      alert(`${data.userName}(${data.email})님 회원가입에 성공했습니다.`);
      // 로그인 페이지로 리다이렉트
      navigate('/login');
    } else {
      alert('서버와의 통신이 원활하지 않습니다.');
    }
  };

  // 이미지 파일 상태 변수
  const [imgFile, setImgFile] = useState(null);

  // 이미지 파일을 선택했을 때 썸네일 뿌리는 핸들러
  const showThumbnailHandler = (e) => {
    // 첨부된 파일 정보
    const file = $fileTag.current.files[0];

    // 첨부한 파일 이름을 얻은 후 확장자만 추출. (소문자로 일괄 변경)
    const fileExt = file.name.slice(file.name.indexOf('.') + 1).toLowerCase();

    if (
      fileExt !== 'jpg' &&
      fileExt !== 'png' &&
      fileExt !== 'jpeg' &&
      fileExt !== 'gif'
    ) {
      alert('이미지 파일(jpg, png, jpeg, gif)만 등록이 가능합니다!');
      // 형식에 맞지 않는 파일을 첨부한 것이 파악됐다면, input의 상태도 원래대로 돌려놓아야 한다.
      // 그렇지 않으면 잘못된 파일을 input 태그가 여전히 기억하게 됨 -> 서버 요청 시 에러 유발!
      $fileTag.current.value = '';
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  };

  return (
    <div className='login-container'>
      <h2>LOGIN</h2>

      <div className='regular-login-section'>
        <form onSubmit={handleRegularLogin}>
          <label>
            <input type='text' placeholder='Id' />
          </label>
          <label>
            <input type='password' placeholder='Password' />
          </label>
          <button type='submit'>SIGN IN</button>
        </form>
      </div>

      <div className='signup-section'>
        <p>Forgot your password?</p>
        <button className='signup-button' onClick={handleSignup}>
          SIGN UP
        </button>
      </div>

      <div className='social-login-images'>
        <button
          className='social-login-button'
          onClick={() => handleSocialLogin(KAKAO_AUTH_URL)}
        >
          <img src={'kakaoLogo.png'} className='social-icon' alt='kakao' />
        </button>
        <button
          className='social-login-button'
          onClick={() => handleSocialLogin(NAVER_AUTH_URL)}
        >
          <img src={'naverLogo.png'} className='social-icon' alt='naver' />
        </button>
        <button
          className='social-login-button google-login-button'
          onClick={() => handleSocialLogin(GOOGLE_AUTH_URL)}
        >
          <img
            src={'googleLogo.png'}
            className='social-icon google-icon'
            alt='google'
          />
          구글 로그인
        </button>
      </div>

      {showModal && (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={handleCloseModal}>
              &times;
            </span>
            <h2>SIGN UP</h2>
            <form onSubmit={joinButtonClickHandler}>
              <div
                className='thumbnail-box'
                onClick={() => $fileTag.current.click()}
              >
                <img
                  // src={imgFile || require('../../assets/img/image-add.png')}
                  alt='profile'
                />
              </div>
              <label className='signup-img-label' htmlFor='profile-img'>
                프로필 이미지 추가
              </label>
              <input
                id='profile-img'
                type='file'
                style={{ display: 'none' }}
                accept='image/*'
                ref={$fileTag}
                onChange={showThumbnailHandler}
              />
              <label>
                <input type='text' placeholder='Name' onChange={nameHandler} />
                <span
                  style={
                    correct.userName ? { color: 'green' } : { color: 'red' }
                  }
                >
                  {message.userName}
                </span>
              </label>

              <label>
                <input type='text' placeholder='User Id' onChange={idHandler} />
                <span
                  style={correct.userId ? { color: 'green' } : { color: 'red' }}
                >
                  {message.userId}
                </span>
              </label>
              <label>
                <input
                  type='password'
                  placeholder='Password'
                  onChange={passwordHandler}
                />
                <span
                  style={
                    correct.password ? { color: 'green' } : { color: 'red' }
                  }
                >
                  {message.password}
                </span>
              </label>
              <label>
                <input
                  type='password'
                  id='password-check'
                  placeholder='Password Check'
                  onChange={pwCheckHandler}
                />
                <span
                  style={
                    correct.passwordCheck
                      ? { color: 'green' }
                      : { color: 'red' }
                  }
                >
                  {message.passwordCheck}
                </span>
              </label>
              <label className='phone-verification'>
                <input
                  type='phone'
                  placeholder='PhoneNum'
                  onChange={phonehandler}
                />
                <span
                  style={
                    correct.phoneNumber ? { color: 'green' } : { color: 'red' }
                  }
                >
                  {message.phoneNumber}
                </span>
                <button type='button' onClick={handleSendVerification}>
                  인증번호 전송
                </button>
              </label>
              {showVerificationInput && (
                <label className='verification-code'>
                  <input
                    type='text'
                    placeholder='4자리'
                    onChange={verificationCodeHandler}
                  />
                  <button type='button' onClick={handleVerifyCode}>
                    인증번호 확인
                  </button>
                </label>
              )}
              <button type='submit'>SIGN UP</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
