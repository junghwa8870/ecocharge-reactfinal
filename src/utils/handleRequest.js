const handleError = (error, onLogout, redirection) => {
  console.log('handleError 호출됨!');
  if (error.response && error.response.status === 401) {
    if (error.response.data.message === 'INVALID_AUTH') {
      alert('로그인이 필요한 서비스 입니다.');
      redirection('/login');
    } else if (error.response.data.message === 'EXPIRED_TOKEN') {
      console.log('onLogout: ', onLogout);
      console.log('redirection: ', redirection);
      alert('로그인 시간이 만료되었습니다. 다시 로그인 해 주세요.');
      onLogout();
      redirection('/login');
    } else if (error.response.data.message === 'INVALID_TOKEN') {
      alert('유효하지 않은 접근입니다.');
      onLogout();
      redirection('/');
    }
  } else if (error.response && error.response.status === 400) {
    // 400 에러에 대한 내용...
    alert('잘못된 요청입니다.');
    redirection('/');
  } else if (error.response && error.response.status === 403) {
    // 403 에러에 대한 내용...
    alert('요청하신 정보를 찾을 수 없습니다.');
    redirection('/');
  }
};

const handleRequest = async (requestFunc, onSuccess, onLogout, redirection) => {
  try {
    const res = await requestFunc();
    if (res.status === 200) {
      onSuccess(res.data);
    }
  } catch (error) {
    console.log(error);
    handleError(error, onLogout, redirection);
  }
};

export default handleRequest;
