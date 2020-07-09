import AuthModel from '../../services/auth';

export const resetMsg = (data = '') => ({
  type: 'RESET_MSG',
  payload: data,
});
export const resetStatus = (data = null) => ({
  type: 'RESET_STATUS',
  payload: data,
});
export const resetLoading = (data = null) => ({
  type: 'RESET_LOADING',
  payload: data,
});
export const profile = (token) => ({
  type: 'PROFILE',
  payload: AuthModel.profile(token),
});
export const login = (data) => ({
  type: 'LOGIN',
  payload: AuthModel.login(data),
});
export const register = (data) => ({
  type: 'REGISTER',
  payload: AuthModel.register(data),
});
export const confirmRegistration = (data, token) => ({
  type: 'CONFIRM_REGISTRATION',
  payload: AuthModel.confirmRegistration(data, token),
});
export const logout = () => ({
  type: 'LOGOUT',
  payload: true,
});
export const editProfile = (data, token) => ({
  type: 'EDIT_PROFILE',
  payload: AuthModel.editProfile(data, token),
});
