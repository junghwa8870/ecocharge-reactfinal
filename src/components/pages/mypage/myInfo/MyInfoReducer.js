export const initialState = {
  userValue: {
    userName: '',
    phone: '',
    password: '',
  },
  message: {
    userName: '',
    phone: '',
    password: '',
  },
  correct: {
    userName: false,
    phone: false,
    password: false,
  },
};

// 회원 정보 수정 쪽에서 여러 상태값을 중앙 집중화 해서 처리할 리듀서 함수.
// state: 최신의 상태값이 전달.
// action.type: 어떠한 상태값을 변경하는지에 대한 값.
// action.key: 입력창이 어디인지.
// action.value: 입력값이 무엇인지.
export const myInfoReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_VALUE':
      return {
        ...state,
        userValue: {
          ...state.userValue,
          [action.key]: action.value,
        },
      };
    case 'SET_MESSAGE':
      return {
        ...state,
        message: {
          ...state.message,
          [action.key]: action.value,
        },
      };
    case 'SET_CORRECT':
      return {
        ...state,
        correct: {
          ...state.correct,
          [action.key]: action.value,
        },
      };
    default:
      return state;
  }
};
