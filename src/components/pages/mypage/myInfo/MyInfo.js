import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import '../myInfo/MyInfo.scss';
import handleRequest from '../../../../utils/handleRequest';
import axiosInstance from '../../../../config/axios-config';
import { API_BASE_URL, USER } from '../../../../config/host-config';
import AuthContext from '../../../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { initialState, myInfoReducer } from './MyInfoReducer';
import { debounce } from 'lodash';

const MyInfo = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('user@example.com');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState('');

  const [originalUserName, setOriginalUserName] = useState(userName);
  const [originalPhone, setOriginalPhone] = useState('');
  const [verificationCodeInput, setVerificationCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [state, dispatch] = useReducer(myInfoReducer, initialState);
  const { userValue, message, correct } = state;

  const { phoneNumber, onLogout } = useContext(AuthContext);
  // const []
  const navigate = useNavigate();

  // 각각의 핸들러에서 호출하는 dispatch 처리를 중앙화 하자.
  const updateState = (key, inputValue, msg, flag) => {
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

  const debouncedUpdateState = useCallback(
    debounce((key, inputValue, msg, flag) => {
      console.log('debounce called! key: ', key);
      updateState(key, inputValue, msg, flag);
    }, 500),
    [],
  );

  const verificationCodeHandler = (e) => {
    const inputValue = e.target.value;
    setVerificationCode(inputValue);
  };

  // 회원 정보 수정 오픈 핸들러
  const handleEditProfile = () => {
    setIsEditing(true);
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

  const nameChangeHandler = (e) => {
    setUserName(e.target.value);
  };

  const passwordHandler = (e) => {
    const inputValue = e.target.value;

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

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  // 핸드폰 인증 요청 핸들러
  const handleSendVerification = () => {
    console.log('phone: ', phone);
    if (!phone) {
      alert('핸드폰번호를 입력해주세요');
      return;
    } else if (!phone.startsWith('010')) {
      alert("'-'을 제외한 번호를 입력해 주세요.");
      return;
    } else if (phone.length !== 11) {
      alert('유효하지 않은 번호입니다');
      return;
    }
    const sendsmsmessage = async () => {
      console.log('문자 인증 요청');
      const message = {
        phoneNumber: phone,
      };
      handleRequest(
        () => axiosInstance.post(`${API_BASE_URL}/api/send-sms`, message),
        (data) => alert('인증 코드를 발송했습니다.'),
        setShowVerificationInput(true),
        onLogout,
        navigate,
      );
    };
    sendsmsmessage();
  };

  const handleVerifyCode = async (e) => {
    // 인증번호 확인 로직 추가 (예: API 호출)
    e.preventDefault();
    let msg;
    let flag = false;

    try {
      const response = await fetch(`${API_BASE_URL}/api/verify-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phone,
          verificationCodeInput,
        }),
      });
      const result = await response.json();

      if (result) {
        alert('인증되었습니다.');
        flag = true;
      } else {
        alert('인증에 실패했습니다');
        msg = '인증실패';
      }
      console.log(`json 파일확인:${phoneNumber},${verificationCodeInput}`);
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('인증에 실패했습니다.');
    }
    debouncedUpdateState('phone', { inputValue: phone }, msg, flag);
  };

  const phonehandler = (e) => {
    const inputValue = e.target.value;
    console.log(inputValue);
    setPhone(inputValue);
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
      // flag = true;
    }

    debouncedUpdateState('phone', inputValue, msg);
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

  // 회원 정보 저장 요청 핸들러
  const handleSaveProfile = () => {
    if (isValid()) {
      // fetch를 사용한 회원 가입 요청.
      handleFormSubmit();
    } else {
      alert('입력란을 다시 확인해 주세요!');
    }
  };

  // 회원 정보 저장 핸들러
  const handleFormSubmit = () => {
    const saveMyInfo = async () => {
      const modifyUserInfo = {
        userName,
        phoneNumber: phone,
        password,
        loginMethod,
        originalPhone,
      };
      handleRequest(
        () =>
          axiosInstance.post(`${API_BASE_URL}${USER}/modify`, modifyUserInfo),
        (data) => {
          setUserName(data.userName);
          setPhone(data.phoneNumber);
          console.log(data.phoneNumber);
          setOriginalPhone(data.phoneNumber);
          setPassword('');
        },
        onLogout,
        navigate,
      );
    };
    saveMyInfo();
    setIsEditing(false);
    console.log('Profile saved');
  };

  const handleCancelEdit = () => {
    // setUserName(originalUserName);
    // setPhone(originalPhone);
    // setPassword('');
    setIsEditing(false);
    console.log('Edit cancelled');
  };

  // 렌더링 핸들러
  useEffect(() => {
    const renderingMyInfo = async () => {
      console.log(phoneNumber);
      await handleRequest(
        () =>
          axiosInstance.post(`${API_BASE_URL}${USER}/myPage`, phoneNumber, {
            headers: {
              'Content-Type': 'text/plain',
            },
          }),
        (data) => {
          setUserName(data.userName);
          setPhone(data.phoneNumber);
          setOriginalPhone(data.phoneNumber);
          console.log(data.phoneNumber);
          setLoginMethod(data.loginMethod);
        },
        onLogout,
        navigate,
      );
    };
    if (phoneNumber !== null) {
      renderingMyInfo();
    }
  }, [userName, phone, password, originalPhone]);

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
              onChange={(e) => {
                nameHandler(e);
                nameChangeHandler(e);
              }}
            />
            <br />
            <span
              style={correct.userName ? { color: 'green' } : { color: 'red' }}
            >
              {message.userName}
            </span>
          </div>
          <div className='inputGroup'>
            <label htmlFor='phone'>전화번호</label>
            <input
              type='tel'
              id='phone'
              value={phone}
              onChange={(e) => {
                phonehandler(e);
              }}
            />
            <br />
          </div>
          <span
            style={{
              color: correct.phone ? 'green' : 'red',
              height: '20px',
              position: 'relative',
              top: '-5px',
            }}
          >
            {message.phone}
          </span>
          <button
            className='phoneNumbereButton'
            onClick={handleSendVerification}
          >
            인증
          </button>
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
          <div className='inputGroup'>
            <label htmlFor='password'>비밀번호 변경</label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => {
                passwordHandler(e);
                passwordChangeHandler(e);
              }}
            />
            <br />
            <span
              style={correct.password ? { color: 'green' } : { color: 'red' }}
            >
              {message.password}
            </span>
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
          <div className='userInfo'>전화번호: {phone}</div>
          <div className='userInfo'>로그인 유형: {loginMethod}</div>
          <button className='editProfileButton' onClick={handleEditProfile}>
            내 정보 수정
          </button>
        </>
      )}
    </div>
  );
};

export default MyInfo;
