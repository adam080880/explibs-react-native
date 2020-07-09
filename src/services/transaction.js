import axios from 'axios';
import qs from 'querystring';
import apiUrl from '../helpers/apiUrl';

export default {
  booking: (id, date, token) =>
    axios.post(
      apiUrl('/member/transaction'),
      qs.stringify({...{book_id: id, promise_returned_at: date}}),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    ),
  memberTransaction: (params, token) => {
    return axios.get(apiUrl(`/member/transaction?${qs.stringify(params)}`), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
  notReturned: (token) => {
    return axios.get(apiUrl('/transaction/not_returned'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
