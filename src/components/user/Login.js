import React, {
  useCallback,
  useContext,
  useReducer,
  useRef,
  useState,
} from 'react';
import { useNavigate } from 'react-router-dom'; // useLocation 추가
import { NAVER_AUTH_URL } from '../../config/naver-config';
import { GOOGLE_AUTH_URL } from '../../config/google-config';
import { KAKAO_AUTH_URL } from '../../config/kakao-config';
import '../../scss/Login.scss';
import { API_BASE_URL, USER } from '../../config/host-config';
import { debounce } from 'lodash'; // lodash.debounce 사용
import { initialState, joinReducer } from './JoinReducer';
import AuthContext from '../../utils/AuthContext';
import axios from 'axios';

import { Label } from 'reactstrap';
const Login = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [showModal, setShowModal] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [state, dispatch] = useReducer(joinReducer, initialState);
  const { onLogin } = useContext(AuthContext);
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
    key !== 'phoneNumberCheck' &&
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

  const IdFunction = () => {
    debouncedUpdateState('id', 'pass', '새로운 메시지', true);
  };
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
    const nameRegex = /^[a-zA-Z0-9]{5,20}$/;

    // 입력값 검증
    let msg; // 검증 메세지를 저장할 변수
    let flag = false; // 입력값 검증 여부 체크 변수

    if (!inputValue) {
      msg = 'ID입력은 필수입니다.';
    } else if (!nameRegex.test(inputValue)) {
      msg = '영문자를 포함한 5글자 이상의 ID를 입력해주세요';
    } else {
      msg = '';
      flag = true;
    }

    debouncedUpdateState('id', inputValue, msg, flag);
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
    console.log('로그인로직 수행');
    fetchLogin();
  };

  const fetchLogin = async () => {
    // 이메일, 비밀번호 입력 태그 취득하기
    const $id = document.getElementById('id').value.trim();
    const $password = document.getElementById('password').value.trim();

    // await는 async로 선언된 함수에서만 사용이 가능합니다.
    // await는 프로미스 객체가 처리될 때까지 기다립니다.
    // 프로미스 객체의 반환값을 바로 활용할 수 있도록 도와줍니다.
    // then()을 활용하는 것보다 가독성이 좋고, 쓰기도 쉽습니다.
    /*
    const res = await fetch(REQUEST_URL, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        email: $email.value,
        password: $password.value,
      }),
    });
    */
    if ($password === '') {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    try {
      const data = JSON.stringify({
        id: $id,
        password: $password,
      });
      console.log($id);
      console.log($password);

      const res = await axios.post(`${API_BASE_URL}${USER}/signin`, data, {
        headers: { 'content-type': 'application/json' },
        // url, 넣을 데이터
      });

      console.log(res.data);

      const { token, userName, role, phoneNumber, userId } = await res.data;
      console.log('role체크:', role);

      // Context API를 사용하여 로그인 상태를 업데이트 합니다.
      onLogin(token, userName, role, phoneNumber, userId);

      if (res.status === 400) {
        console.log('400에러표시');
        const { error } = res.data;
        alert(error); // 백엔드에서 반환한 예외 메시지를 표시
        return;
      } else if (res.status === 401) {
        alert('Invalid credentials'); // 인증 예외 처리
        return;
      }

      // 홈으로 리다이렉트
      navigate('/');
    } catch (error) {
      console.log('Login error:', error);
      alert('잘못된 비밀번호 입니다.');
    }
  };

  const handleSignup = () => {
    console.log('모달 작동');
    setShowModal(true);
  };

  const handleFind = () => {
    navigate('/findIdPw');
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const idCheckHandler = async (e) => {
    const id = document.getElementById('checkid').value.trim();
    const nameRegex = /^[a-zA-Z0-9]{5,20}$/;

    if (id === '') {
      alert('아이디를 입력해주세요');
      return;
    } else if (!nameRegex.test(id)) {
      alert('영문자를 포함한 5글자 이상의 ID를 입력해주세요');
      return;
    }
    e.preventDefault();
    let flag = false;
    let msg = '';
    const idValue = document.getElementById('checkid').value.trim();
    console.log('idValue: ', idValue);
    try {
      const response = await fetch(`${API_BASE_URL}${USER}/check`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(idValue), // idHandler에서 검증한 id 값을 포함
      });

      const result = await response.json(); // JSON 파싱을 기다립니다.

      console.log('불린값 확인:', result);
      if (result) {
        alert('아이디가 중복되었습니다.');
      } else {
        alert('사용할 수 있는 아이디입니다.');
        flag = true;
      }
      debouncedUpdateState('idCheck', idValue, msg, flag);
    } catch (error) {
      console.error('Error:', error);
      // 에러 처리
    }
  };
  const handleSendVerification = async (e) => {
    if (!phoneNumber) {
      alert('핸드폰번호를 입력해주세요');
      return;
    } else if (!phoneNumber.startsWith('010')) {
      alert("'-'을 제외한 번호를 입력해 주세요.");
      return;
    } else if (phoneNumber.length !== 11) {
      alert('유효하지 않은 번호입니다.');
      return;
    }
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
      setShowVerificationInput(true);
    } catch (error) {
      console.log('phoneNumber:', phoneNumber);
      alert('인증 코드 발송에 실패했습니다.');
    }
  };

  const handleVerifyCode = async (e) => {
    // 인증번호 확인 로직 추가 (예: API 호출)
    e.preventDefault();
    let flag = false;
    let msg = '';

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
        flag = true;
      } else {
        alert('인증에 실패했습니다');
      }
      console.log(`json 파일확인:${phoneNumber},${verificationCodeInput}`);
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('인증에 실패했습니다.');
    }
    debouncedUpdateState('phoneNumberCheck', 'check', msg, flag);
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

    debouncedUpdateState('phoneNumber', inputValue, msg, flag);
  };

  const verificationCodeHandler = (e) => {
    const inputValue = e.target.value;
    setVerificationCode(inputValue);
  };

  const isValid = () => {
    for (let key in correct) {
      const flag = correct[key];
      console.log(key);
      console.log(flag);
      if (!flag) return false;
    }
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

    // FormData 객체를 활용해서.
    const userFormData = new FormData();
    userFormData.append('user', userJsonBlob);

    try {
      const res = await fetch(API_BASE_URL + USER, {
        method: 'POST',
        body: userFormData,
      });

      if (res.status === 200) {
        const data = await res.json();
        alert(`${data.userName}(${data.id})님 회원가입에 성공했습니다.`);
        // 로그인 페이지로 리다이렉트
        setShowModal(false);
      } else {
        alert('이미 가입 된 계정입니다.');
      }
    } catch {
      alert('서버 오류');
    }
  };

  return (
    <div className='login-container'>
      <h2>로그인</h2>

      <div className='regular-login-section'>
        <form onSubmit={handleRegularLogin}>
          <label>
            <input type='text' name='id' id='id' placeholder='아이디 입력' />
          </label>
          <label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='비밀번호 입력'
            />
          </label>
          <button
            type='submit'
            style={{ backgroundColor: '#0d1245', fontWeight: 'bold' }}
          >
            로그인
          </button>
        </form>
      </div>

      <div className='social-login-images'>
        <button
          className='social-login-button1'
          onClick={() => handleSocialLogin(KAKAO_AUTH_URL)}
        >
          <img src={'kakaoLogo.png'} className='social-icon1' alt='kakao' />
        </button>
        <button
          className='social-login-button2'
          onClick={() => handleSocialLogin(NAVER_AUTH_URL)}
        >
          <img src={'naverLogo.png'} className='social-icon2' alt='naver' />
        </button>
        <button
          className='social-login-button1 google-login-button'
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

      <div className='signup-section'>
        <p>⊙ 신규회원자라면 회원가입 후 이용해 주세요.</p>
        <a className='signup-button' onClick={handleSignup}>
          회원가입하기
        </a>
      </div>
      <div className='find-section'>
        <p>⊙ 로그인 정보를 분실하셨나요?</p>
        <a className='find-button' onClick={handleFind}>
          아이디/비밀번호 찾기
        </a>
      </div>

      {!showModal || (
        <div className='modal'>
          <div className='modal-content'>
            <span className='close' onClick={handleCloseModal}>
              &times;
            </span>
            <h2 style={{ margin: '20px auto' }}>회원가입</h2>
            <form onSubmit={joinButtonClickHandler}>
              <div
                className='thumbnail-box'
                onClick={() => $fileTag.current.click()}
              ></div>

              <label>
                <Label for='Uname'>이름</Label>
                <input
                  type='text'
                  placeholder='2~5자 이내'
                  onChange={nameHandler}
                />
                <br />
                <span
                  style={
                    correct.userName ? { color: 'green' } : { color: 'red' }
                  }
                >
                  {message.userName}
                </span>
              </label>

              <label>
                <Label for='Uid' style={{ marginBottom: '0' }}>
                  아이디
                </Label>
                <input
                  type='text'
                  id='checkid'
                  placeholder='16자 이내'
                  style={{
                    width: '300px',
                  }}
                  onChange={idHandler}
                />
                <button
                  className='UidIn'
                  type='button'
                  onClick={idCheckHandler}
                  style={{
                    width: '135px',
                    height: '40px',
                    marginLeft: '10px',
                    backgroundColor: '#0d1245ab',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontWeight: 'bold',
                  }}
                >
                  중복 확인
                </button>
                <br />
                <span
                  style={correct.id ? { color: 'green' } : { color: 'red' }}
                >
                  {message.id}
                </span>
              </label>
              <label>
                <Label for='Upw'>비밀번호</Label>
                <input
                  type='password'
                  placeholder='특수문자를 포함하여 8~16자 이내'
                  onChange={passwordHandler}
                />
                <br />
                <span
                  style={
                    correct.password ? { color: 'green' } : { color: 'red' }
                  }
                >
                  {message.password}
                </span>
              </label>
              <label>
                <Label for='Upw2'>비밀번호 확인</Label>
                <input
                  type='password'
                  id='password-check'
                  placeholder='다시 입력'
                  onChange={pwCheckHandler}
                />
                <br />
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
                <Label
                  for='UphoneNum'
                  style={{
                    width: '100%',
                    display: 'flex',
                    marginBottom: '0',
                  }}
                >
                  휴대전화번호
                </Label>
                <input
                  type='phoneNumber'
                  placeholder='11자로 입력'
                  onChange={phonehandler}
                  id='phoneinput'
                  style={{ width: '300px' }}
                />
                <button
                  type='button'
                  onClick={handleSendVerification}
                  style={{
                    width: '135px',
                    marginLeft: '10px',
                    fontWeight: 'bold',
                  }}
                >
                  인증번호 전송
                </button>
              </label>
              <br />
              <span
                style={{
                  color: correct.phoneNumber ? 'green' : 'red',
                  height: '20px',
                  position: 'relative',
                  top: '-40px',
                }}
              >
                {message.phoneNumber}
              </span>
              {showVerificationInput && (
                <label
                  className='verification-code'
                  style={{ marginTop: '-25px' }}
                >
                  <Label
                    for='confirmNum'
                    style={{
                      width: '100%',
                      marginBottom: '0',
                    }}
                  >
                    인증번호
                  </Label>
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
              <button
                type='submit'
                style={{
                  fontWeight: 'bold',
                  marginTop: '-10px',
                  backgroundColor: '#0d1245',
                }}
              >
                회원가입
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
