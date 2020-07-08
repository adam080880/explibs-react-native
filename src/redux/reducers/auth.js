const initState = {
  session: {},
  isLoading: null,
  msg: '',
  status: null,
  data: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'RESET_MSG': {
      return {...state, ...{msg: action.payload}};
    }
    case 'RESET_STATUS': {
      return {...state, ...{status: action.payload}};
    }
    case 'RESET_LOADING': {
      return {...state, ...{isLoading: action.payload}};
    }
    case 'LOGOUT': {
      return {
        ...state,
        ...{status: null, session: {}, isLoading: null, msg: ''},
      };
    }
    case 'LOGIN_PENDING': {
      return {
        ...state,
        ...{session: {}, msg: '', isLoading: true, status: null},
      };
    }
    case 'LOGIN_FULFILLED': {
      const {data: session} = action.payload.data;
      return {
        ...state,
        ...{session, msg: 'Success', isLoading: false, status: true},
      };
    }
    case 'LOGIN_REJECTED': {
      const msg = action.payload.response
        ? action.payload.response.data.msg
        : 'Error Server';
      return {
        ...state,
        ...{session: {}, msg, isLoading: false, status: false},
      };
    }
    case 'REGISTER_PENDING': {
      return {
        ...state,
        ...{session: {}, msg: '', isLoading: true, status: null},
      };
    }
    case 'REGISTER_FULFILLED': {
      return {
        ...state,
        ...{session: {}, msg: 'Success', isLoading: false, status: true},
      };
    }
    case 'REGISTER_REJECTED': {
      const msg = action.payload.response
        ? action.payload.response.data.msg
        : 'Error Server';
      return {
        ...state,
        ...{session: {}, msg, isLoading: false, status: false},
      };
    }
    default:
      return state;
  }
};
