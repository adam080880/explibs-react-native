import BookModel from '../../services/book';

export const reset = (loading = null) => ({
  type: 'RESET',
  payload: loading,
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

export const popular = () => ({
  type: 'POPULAR_BOOK',
  payload: BookModel.popular(),
});

export const review = (data, bookId, token) => ({
  type: 'REVIEW',
  payload: BookModel.review(data, bookId, token),
});
