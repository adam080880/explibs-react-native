const initState = {
  data: [],
  isLoading: null,
  status: null,
  msg: '',
  pageInfo: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'RESET_LOADING_TRANSACTION': {
      return {...state, ...{isLoading: null, msg: ''}};
    }
    case 'MEMBER_TRANSACTION_PAGE': {
      return {
        ...state,
        ...{pageInfo: {...state.pageInfo, ...{page: action.payload}}},
      };
    }
    case 'MEMBER_TRANSACTION_RESET': {
      return {...state, ...{data: []}};
    }
    case 'BOOKING_PENDING': {
      return {...state, ...{isLoading: true, msg: '', status: null}};
    }
    case 'BOOKING_FULFILLED': {
      return {...state, ...{isLoading: false, msg: 'Success', status: true}};
    }
    case 'BOOKING_REJECTED': {
      return {
        ...state,
        ...{
          status: false,
          isLoading: false,
          msg: action.payload.response
            ? action.payload.response.data.msg
            : 'Error Server',
        },
      };
    }
    case 'MEMBER_TRANSACTION_PENDING': {
      return {...state, ...{isLoading: true, msg: '', status: null}};
    }
    case 'MEMBER_TRANSACTION_FULFILLED': {
      return {
        ...state,
        ...{
          isLoading: false,
          msg: 'Success',
          status: null,
          data:
            state.pageInfo.page === 1
              ? action.payload.data.data
              : [...state.data, ...action.payload.data.data],
          pageInfo: {...state.pageInfo, ...action.payload.data.pageInfo},
        },
      };
    }
    case 'MEMBER_TRANSACTION_REJECTED': {
      return {
        ...state,
        ...{
          isLoading: false,
          msg: action.payload.response
            ? action.payload.response.data.msg
            : 'Error Server',
          status: false,
          data: [],
        },
      };
    }
    default: {
      return state;
    }
  }
};
