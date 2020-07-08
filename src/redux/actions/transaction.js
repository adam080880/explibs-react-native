import TransactionModel from '../../services/transaction';

export const resetLoading = () => ({
  type: 'RESET_LOADING_TRANSACTION',
  payload: null,
});

export const booking = (id, date, token) => ({
  type: 'BOOKING',
  payload: TransactionModel.booking(id, date, token),
});

export const getMemberTransaction = (param, token) => ({
  type: 'MEMBER_TRANSACTION',
  payload: TransactionModel.memberTransaction(param, token),
});

export const resetData = () => ({
  type: 'MEMBER_TRANSACTION_RESET',
  payload: [],
});

export const setPage = (page) => ({
  type: 'MEMBER_TRANSACTION_PAGE',
  payload: page,
});
