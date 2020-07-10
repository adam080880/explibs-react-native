import axios from 'axios';
import qs from 'querystring';
import apiUrl from '../helpers/apiUrl';

export default {
  login: (data) => axios.post(apiUrl('/auth/login'), qs.stringify(data)),
  register: (data) => axios.post(apiUrl('/auth/register'), qs.stringify(data)),
  confirmRegistration: (data, token) =>
    axios.post(apiUrl('/auth/complete_registration'), qs.stringify(data), {
      headers: {
        Authorization: 'Bearer '.concat(token),
      },
    }),
  profile: (token) =>
    axios.get(apiUrl('/auth/profile'), {
      headers: {
        Authorization: 'Bearer '.concat(token),
      },
    }),
  editProfile: (data, token) =>
    axios.patch(apiUrl('/auth/profile/edit'), data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    }),
};
