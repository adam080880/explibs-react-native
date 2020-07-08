import BookModel from '../../services/book';

export const reset = () => ({
  type: 'RESET',
  payload: null,
});

export const resetData = () => ({
  type: 'RESET_BOOK',
  payload: [],
});

export const getBook = (param) => ({
  type: 'GET_BOOK',
  payload: BookModel.get(param),
});

export const findBook = (id) => ({
  type: 'FIND_BOOK',
  payload: BookModel.find(id),
});

export const setPage = (page) => ({
  type: 'SET_PAGE',
  payload: page,
});
