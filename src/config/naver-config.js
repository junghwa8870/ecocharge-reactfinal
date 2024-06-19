const CLIENT_ID = process.env.REACT_APP_NAVER_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_NAVER_CALLBACK_URI;
const STATE = process.env.REACT_APP_NAVER_RAMDOM_STATE;

export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;
