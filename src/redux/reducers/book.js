const initState = {
  isLoading: null,
  status: null,
  msg: '',
  book: {},
  data: [],
  popular: [],
  recents: [],
  pageInfo: {
    page: 1,
  },
};

export default (state = initState, action) => {
  switch (action.type) {
    case 'SET_PAGE': {
      return {
        ...state,
        ...{pageInfo: {...state.pageInfo, ...{page: action.payload}}},
      };
    }
    case 'RESET': {
      return {...state, ...{isLoading: null}};
    }
    case 'RESET_BOOK': {
      return {...state, ...{data: [], book: {}}};
    }
    case 'GET_BOOK_PENDING': {
      return {...state, ...{isLoading: true, status: null}};
    }
    case 'GET_BOOK_FULFILLED': {
      return {
        ...state,
        ...{
          isLoading: false,
          status: true,
          data:
            state.pageInfo.page === 1
              ? action.payload.data.data
              : [...state.data, ...action.payload.data.data],
          msg: 'Success',
          pageInfo: {...state.pageInfo, ...action.payload.data.pageInfo},
        },
      };
    }
    case 'GET_BOOK_REJECTED': {
      return {
        ...state,
        ...{
          isLoading: false,
          status: false,
          msg: action.payload.response
            ? action.payload.response.data.msg
            : 'Error server',
        },
      };
    }
    case 'FIND_BOOK_PENDING': {
      return {...state, ...{isLoading: true, status: null}};
    }
    case 'FIND_BOOK_FULFILLED': {
      return {
        ...state,
        ...{
          isLoading: false,
          status: true,
          book: action.payload.data.data,
          msg: 'Success',
          pageInfo: {...state.pageInfo, ...action.payload.data.pageInfo},
        },
      };
    }
    case 'FIND_BOOK_REJECTED': {
      return {
        ...state,
        ...{
          isLoading: false,
          status: false,
          msg: action.payload.response
            ? action.payload.response.data.msg
            : 'Error server',
        },
      };
    }
    default: {
      return state;
    }
  }
};
